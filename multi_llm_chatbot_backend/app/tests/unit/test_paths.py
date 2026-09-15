import os
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from app.core.paths import DB_FILENAME, JWT_SECRET_FILENAME, migrate_data_dir, resolve_data_dir


class TestResolveDataDir(unittest.TestCase):
    def test_uses_explicit_data_dir(self):
        with tempfile.TemporaryDirectory() as tmp:
            with patch.dict(os.environ, {"DATA_DIR": tmp}, clear=False):
                self.assertEqual(resolve_data_dir(), Path(tmp))

    def test_migrates_legacy_home_db_when_data_dir_is_slash_data(self):
        with tempfile.TemporaryDirectory() as tmp:
            home = Path(tmp) / "homeuser"
            legacy = home / "data"
            legacy.mkdir(parents=True)
            (legacy / DB_FILENAME).write_text("db", encoding="utf-8")
            (legacy / JWT_SECRET_FILENAME).write_text("secret", encoding="utf-8")
            dest = Path("/data")
            with patch.dict(os.environ, {"DATA_DIR": "/data"}, clear=False):
                with patch("app.core.paths.Path.home", return_value=home):
                    with patch("app.core.paths._writable", return_value=True):
                        with patch("app.core.paths.migrate_data_dir") as mocked:
                            result = resolve_data_dir()
            mocked.assert_called_once_with(legacy, dest)
            self.assertEqual(result, dest)


class TestMigrateDataDir(unittest.TestCase):
    def test_copies_db_and_jwt_secret(self):
        with tempfile.TemporaryDirectory() as tmp:
            src = Path(tmp) / "src"
            dest = Path(tmp) / "dest"
            src.mkdir()
            (src / DB_FILENAME).write_text("db", encoding="utf-8")
            (src / JWT_SECRET_FILENAME).write_text("secret", encoding="utf-8")
            migrate_data_dir(src, dest)
            self.assertEqual((dest / DB_FILENAME).read_text(encoding="utf-8"), "db")
            self.assertEqual((dest / JWT_SECRET_FILENAME).read_text(encoding="utf-8"), "secret")

    def test_keeps_existing_destination_files(self):
        with tempfile.TemporaryDirectory() as tmp:
            src = Path(tmp) / "src"
            dest = Path(tmp) / "dest"
            src.mkdir()
            dest.mkdir()
            (src / DB_FILENAME).write_text("old", encoding="utf-8")
            (dest / DB_FILENAME).write_text("new", encoding="utf-8")
            migrate_data_dir(src, dest)
            self.assertEqual((dest / DB_FILENAME).read_text(encoding="utf-8"), "new")
