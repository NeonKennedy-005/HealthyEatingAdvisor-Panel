"""Resolve the durable data directory (SQLite DB + JWT secret).

Hugging Face Spaces persist a Storage Bucket at ``/data``. Older images
used ``$HOME/data``, so a rebuild could look like “accounts vanished.”
Prefer ``DATA_DIR``, but migrate an existing DB from ``~/data`` when the
new mount is empty.
"""

from __future__ import annotations

import logging
import os
import shutil
from pathlib import Path

LOG = logging.getLogger(__name__)

DB_FILENAME = "healthy_eating_panel.db"
JWT_SECRET_FILENAME = "jwt_secret"
_MIGRATE_NAMES = (
    DB_FILENAME,
    f"{DB_FILENAME}-wal",
    f"{DB_FILENAME}-shm",
    JWT_SECRET_FILENAME,
)


def candidate_data_dirs() -> list[Path]:
    raw = os.environ.get("DATA_DIR") or "/data"
    primary = Path(raw).expanduser()
    extras = [Path.home() / "data"]
    out: list[Path] = []
    for path in (primary, *extras):
        if path not in out:
            out.append(path)
    return out


def _has_db(path: Path) -> bool:
    return (path / DB_FILENAME).is_file()


def _writable(path: Path) -> bool:
    try:
        path.mkdir(parents=True, exist_ok=True)
        return True
    except OSError:
        LOG.warning("Cannot create data dir %s", path)
        return False


def migrate_data_dir(src: Path, dest: Path) -> None:
    dest.mkdir(parents=True, exist_ok=True)
    for name in _MIGRATE_NAMES:
        source = src / name
        target = dest / name
        if source.is_file() and not target.exists():
            shutil.copy2(source, target)
            LOG.info("Migrated %s from %s to %s", name, src, dest)


def resolve_data_dir() -> Path:
    """Return the directory that should hold the SQLite DB and JWT secret."""
    candidates = candidate_data_dirs()
    primary = candidates[0]
    home_data = Path.home() / "data"

    if _has_db(primary):
        return primary

    # Only auto-copy the legacy HF path onto /data — never a test DATA_DIR.
    if (
        primary == Path("/data")
        and home_data != primary
        and _has_db(home_data)
        and _writable(primary)
    ):
        migrate_data_dir(home_data, primary)
        return primary

    if _has_db(home_data) and not _writable(primary):
        return home_data

    if _writable(primary):
        return primary

    for path in candidates[1:]:
        if _writable(path):
            return path

    fallback = Path("/tmp/data")
    fallback.mkdir(parents=True, exist_ok=True)
    return fallback
