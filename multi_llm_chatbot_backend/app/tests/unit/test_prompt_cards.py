import unittest
from pathlib import Path

import yaml


ROOT = Path(__file__).resolve().parents[4]
CONFIG = ROOT / "healthyeating_config.yaml"


class TestPromptCards(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        with CONFIG.open(encoding="utf-8") as fh:
            cls.cfg = yaml.safe_load(fh)
        cls.examples = cls.cfg["chat_page"]["examples"]
        cls.titles = [e["title"] for e in cls.examples]
        cls.prompts = [p for e in cls.examples for p in e.get("suggestions") or []]

    def test_where_do_i_start_is_the_only_title(self):
        self.assertIn("Where do I start?", self.titles)
        joined = " ".join(self.titles).lower()
        self.assertNotIn("let's learn about you", joined)
        self.assertNotIn("lets learn about you", joined)

    def test_more_card_has_no_superfood_prefix(self):
        self.assertIn("More", self.titles)
        self.assertFalse(any("superfood" in (t or "").lower() for t in self.titles))

    def test_sugar_prompt_replaces_real_food_benefits(self):
        self.assertIn("How can I eat less sugar?", self.prompts)
        self.assertFalse(
            any("benefits of real food" in (p or "").lower() for p in self.prompts)
        )
        self.assertFalse(
            any(
                "benefits of real food" in (p or "").lower()
                and "eat less sugar" in (p or "").lower()
                for p in self.prompts
            )
        )
