# Healthy Eating Advisor — Knowledge Pack

Corpus from Heidi Boudro's July 29 2026 RAG materials, organized by advisor persona.

## Layout

| Folder | Advisor | Topics |
|--------|---------|--------|
| `kitchen_coach/` | Kitchen Coach | Clean eating, whole vs processed foods, sugar, salt, fats, lunch packing |
| `veggie_chef/` | Veggie Chef | Vegetable benefits, recipes, brassicas, nightshades, prep methods |
| `fruit_maven/` | Fruit Maven | Fruits, juices, blueberries, pomegranate, plantains |
| `superfoods_superman/` | Superfoods Superman | Ginger, turmeric, coconut, whey, fish oil, wheatgrass, tart cherries |
| `enzyme_explorer/` | Enzyme Explorer | Enzyme science, digestive enzymes, enzyme diet, related book reviews |
| `book_advisor/` | Book Advisor | Healthy-eating book list and book reviews |

## How RAG is loaded

1. These markdown files ship in the repo (and Docker image under `knowledge/`).
2. In the UI, **upload** relevant `.md` files into a chat when you want citeable grounding — the CCAI document pipeline (`documents` routes + `rag_manager.py` / ChromaDB) embeds chunks for retrieval.
3. Persona system prompts (from Heidi's materials) also tell each advisor to treat reference materials as perspective-setting educational content, not medical authority.
4. Chroma collection + embedding model are configured in `healthyeating_config.yaml` → `rag:` (`healthy_eating_documents`, `all-MiniLM-L6-v2`).
5. When `DATA_DIR` is set (HF Spaces `/data`), Chroma persistence survives rebuilds.

## Source

- Zip: `RAG July 29 2026` (author materials)
- Also archived under `docs/source-materials/rag/`
