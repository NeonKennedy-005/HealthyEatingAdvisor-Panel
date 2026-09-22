import asyncio
import os
import tempfile
import unittest
from unittest.mock import patch

from app.api.routes.auth import login, signup
from app.core.db import reset_connection
from app.models.user import UserCreate, UserLogin


class TestSignupLoginRoundtrip(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.env = patch.dict(
            os.environ,
            {"DATA_DIR": self.tmp.name, "HF_TOKEN": "", "HUGGING_FACE_HUB_TOKEN": ""},
            clear=False,
        )
        self.env.start()
        await reset_connection()

    async def asyncTearDown(self):
        await reset_connection()
        self.env.stop()
        self.tmp.cleanup()

    async def test_signup_then_login_same_email(self):
        created = await signup(UserCreate(
            firstName="Test",
            lastName="User",
            email="  RoundTrip@Example.COM ",
            password="Password1",
            academicStage="curious",
            careerFocus="Foods",
        ))
        self.assertTrue(created.access_token)
        self.assertEqual(created.user.email, "roundtrip@example.com")

        again = await login(UserLogin(
            email="roundtrip@example.com",
            password="Password1",
        ))
        self.assertTrue(again.access_token)
        self.assertEqual(again.user.email, "roundtrip@example.com")

    async def test_login_unknown_email_mentions_signup(self):
        from fastapi import HTTPException

        with self.assertRaises(HTTPException) as ctx:
            await login(UserLogin(email="nobody@example.com", password="Password1"))
        self.assertEqual(ctx.exception.status_code, 401)
        self.assertIn("No account found", ctx.exception.detail)
        self.assertIn("sign up", ctx.exception.detail.lower())

    async def test_wrong_password_is_distinct_from_unknown_email(self):
        from fastapi import HTTPException

        await signup(UserCreate(
            firstName="Test",
            lastName="User",
            email="exists@example.com",
            password="Password1",
            academicStage="curious",
            careerFocus="Foods",
        ))
        with self.assertRaises(HTTPException) as ctx:
            await login(UserLogin(email="exists@example.com", password="Wrongpass1"))
        self.assertEqual(ctx.exception.status_code, 401)
        self.assertIn("Incorrect password", ctx.exception.detail)
