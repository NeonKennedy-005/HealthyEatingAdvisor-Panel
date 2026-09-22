"""Durable account storage helpers for Hugging Face Spaces.

HF only keeps ``/data`` across rebuilds when Persistent storage (or a Storage
Bucket mount) is enabled. When that mount is missing we optionally mirror the
SQLite DB + JWT secret to a private Hub dataset if ``HF_TOKEN`` is set.
"""

from __future__ import annotations

import logging
import os
import shutil
import threading
from pathlib import Path
from typing import Any

from app.core.paths import (
    DB_FILENAME,
    JWT_SECRET_FILENAME,
    inspect_storage,
    resolve_data_dir,
)

LOG = logging.getLogger(__name__)

_BACKUP_NAMES = (DB_FILENAME, JWT_SECRET_FILENAME)
_backup_lock = threading.Lock()
_restore_attempted = False


def reset_hub_restore_flag() -> None:
    global _restore_attempted
    _restore_attempted = False


def _hub_token() -> str:
    return (
        os.getenv("HF_TOKEN", "").strip()
        or os.getenv("HUGGING_FACE_HUB_TOKEN", "").strip()
    )


def backup_repo_id() -> str:
    explicit = os.getenv("HF_ACCOUNT_BACKUP_REPO", "").strip()
    if explicit:
        return explicit
    space_id = os.getenv("SPACE_ID", "").strip()
    if "/" in space_id:
        org = space_id.split("/", 1)[0]
        return f"{org}/healthyeatingadvisor-accounts"
    return "BrainForge/healthyeatingadvisor-accounts"


def storage_status() -> dict[str, Any]:
    report = inspect_storage(resolve_data_dir())
    token = bool(_hub_token())
    report["hub_backup_configured"] = token
    report["hub_backup_repo"] = backup_repo_id() if token else None
    report["durable_storage"] = bool(report.get("data_dir_is_mount") or token)
    if report["durable_storage"]:
        report["hint"] = None
    elif token:
        report["hint"] = None
    else:
        report["hint"] = (
            "This Space has no persistent /data mount and no HF_TOKEN Hub backup. "
            "Accounts are lost when the Space sleeps or rebuilds. Enable "
            "Persistent storage in Hugging Face Space Settings, or add an HF_TOKEN "
            "secret with write access."
        )
    return report


def account_missing_detail() -> str:
    base = "No account found for this email. Check for typos, or sign up."
    report = storage_status()
    if report.get("durable_storage"):
        return base
    return (
        f"{base} If you created an account earlier, this Space may have been "
        "rebuilt without persistent storage — please sign up again."
    )


def maybe_restore_from_hub(data_dir: Path | None = None) -> bool:
    """Download the SQLite DB from the Hub when the local file is missing."""
    global _restore_attempted
    if _restore_attempted:
        return False
    _restore_attempted = True

    dest = data_dir or resolve_data_dir()
    dest.mkdir(parents=True, exist_ok=True)
    db_path = dest / DB_FILENAME
    if db_path.is_file() and db_path.stat().st_size > 0:
        return False

    token = _hub_token()
    if not token:
        LOG.warning(
            "No local account DB at %s and HF_TOKEN is unset; accounts cannot "
            "survive a Space rebuild until Persistent storage is enabled.",
            db_path,
        )
        return False

    repo = backup_repo_id()
    try:
        from huggingface_hub import hf_hub_download
    except Exception as exc:  # pragma: no cover - import guard
        LOG.warning("huggingface_hub unavailable for account restore: %s", exc)
        return False

    restored = False
    for name in _BACKUP_NAMES:
        target = dest / name
        if target.is_file() and target.stat().st_size > 0:
            continue
        try:
            downloaded = hf_hub_download(
                repo_id=repo,
                filename=name,
                repo_type="dataset",
                token=token,
            )
            shutil.copy2(downloaded, target)
            LOG.info("Restored %s from Hub dataset %s", name, repo)
            restored = True
        except Exception as exc:
            LOG.info("Hub restore skipped for %s (%s)", name, exc)
    return restored


def backup_to_hub(data_dir: Path | None = None) -> bool:
    """Upload SQLite + JWT secret to the Hub dataset. No-op without a token."""
    token = _hub_token()
    if not token:
        return False
    src = data_dir or resolve_data_dir()
    db_path = src / DB_FILENAME
    if not db_path.is_file():
        return False
    repo = backup_repo_id()
    try:
        from huggingface_hub import HfApi
    except Exception as exc:  # pragma: no cover
        LOG.warning("huggingface_hub unavailable for account backup: %s", exc)
        return False

    with _backup_lock:
        try:
            api = HfApi(token=token)
            api.create_repo(repo_id=repo, repo_type="dataset", private=True, exist_ok=True)
            for name in _BACKUP_NAMES:
                path = src / name
                if not path.is_file():
                    continue
                api.upload_file(
                    path_or_fileobj=str(path),
                    path_in_repo=name,
                    repo_id=repo,
                    repo_type="dataset",
                )
            LOG.info("Backed up account DB to Hub dataset %s", repo)
            return True
        except Exception as exc:
            LOG.warning("Hub account backup failed: %s", exc)
            return False


def schedule_account_backup() -> None:
    """Fire-and-forget Hub mirror so signup is not blocked on the network."""
    if not _hub_token():
        return

    def _run() -> None:
        try:
            backup_to_hub()
        except Exception:
            LOG.exception("Background account backup crashed")

    threading.Thread(target=_run, name="hea-account-backup", daemon=True).start()
