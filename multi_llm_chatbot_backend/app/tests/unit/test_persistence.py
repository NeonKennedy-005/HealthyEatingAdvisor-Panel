import os
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from app.core.persistence import (
    backup_repo_id,
    maybe_restore_from_hub,
    reset_hub_restore_flag,
    storage_status,
)
from app.core.paths import DB_FILENAME, JWT_SECRET_FILENAME


class TestPersistence(unittest.TestCase):
    def setUp(self):
        reset_hub_restore_flag()
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.addCleanup(reset_hub_restore_flag)

    def test_storage_status_without_mount_or_token_is_not_durable(self):
        dest = Path(self.tmp.name)
        with patch.dict(os.environ, {"DATA_DIR": str(dest), "HF_TOKEN": "", "HUGGING_FACE_HUB_TOKEN": ""}, clear=False):
            with patch("app.core.persistence.inspect_storage", return_value={
                "data_dir": str(dest),
                "data_dir_writable": True,
                "data_dir_is_mount": False,
                "durable_storage": False,
            }):
                report = storage_status()
        self.assertFalse(report["durable_storage"])
        self.assertTrue(report["hint"])

    def test_backup_repo_uses_space_org(self):
        with patch.dict(os.environ, {"SPACE_ID": "BrainForge/HealthyEatingAdvisor", "HF_ACCOUNT_BACKUP_REPO": ""}, clear=False):
            self.assertEqual(backup_repo_id(), "BrainForge/healthyeatingadvisor-accounts")

    def test_restore_is_noop_without_token_when_db_missing(self):
        dest = Path(self.tmp.name)
        with patch.dict(os.environ, {"HF_TOKEN": "", "HUGGING_FACE_HUB_TOKEN": ""}, clear=False):
            self.assertFalse(maybe_restore_from_hub(dest))
        self.assertFalse((dest / DB_FILENAME).exists())

    def test_restore_copies_hub_files_when_local_empty(self):
        dest = Path(self.tmp.name)
        hub = Path(self.tmp.name) / "hub"
        hub.mkdir()
        db_src = hub / DB_FILENAME
        jwt_src = hub / JWT_SECRET_FILENAME
        db_src.write_bytes(b"sqlite")
        jwt_src.write_text("secret", encoding="utf-8")

        def fake_download(repo_id, filename, repo_type, token):
            return str(hub / filename)

        with patch.dict(os.environ, {"HF_TOKEN": "hf_test", "SPACE_ID": "BrainForge/HealthyEatingAdvisor"}, clear=False):
            with patch("huggingface_hub.hf_hub_download", side_effect=fake_download):
                self.assertTrue(maybe_restore_from_hub(dest))
        self.assertEqual((dest / DB_FILENAME).read_bytes(), b"sqlite")
        self.assertEqual((dest / JWT_SECRET_FILENAME).read_text(encoding="utf-8"), "secret")
