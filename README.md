---
title: HealthyEatingAdvisor
emoji: 🥗
colorFrom: purple
colorTo: green
sdk: docker
pinned: false
app_port: 7860
---

# Healthy Eating Advisor Panel

**Healthy Eating Advisor** by **Heidi Boudro** — an AI panel for easy **clean eating** and **real food**. Ask about whole foods, fruits and vegetables, simple prep, superfoods, enzymes, and healthy-eating books. Built on Neon AI's Collaborative Conversational AI (CCAI) framework (multi-advisor FastAPI + React), cloned from the LaunchPad panel pattern.

Local path: `/Users/kennedyjohnson/Projects/HealthyEatingAdvisor-Panel`

## Live links

| Resource | URL |
|----------|-----|
| GitHub | https://github.com/NeonKennedy-005/HealthyEatingAdvisor-Panel |
| Hugging Face Space | https://huggingface.co/spaces/BrainForge/HealthyEatingAdvisor |

> If the Space URL 404s, create `BrainForge/HealthyEatingAdvisor` (Docker SDK) in the HF UI, then push the `hf` remote (see below).

## Advisors (6)

1. **Kitchen Coach** — clean eating expert; sustainable whole-food habits  
2. **Veggie Chef** — vegetable specialist; prep and recipes  
3. **Fruit Maven** — fruit specialist; variety, juices, benefits  
4. **Superfoods Superman** — concentrated nutrition / superfoods  
5. **Enzyme Explorer** — enzymes in food, diet, and education  
6. **Book Advisor** — cookbooks and healthy-eating resources  

## Source materials used

Packaged under [`docs/source-materials/`](docs/source-materials/) from Heidi's July 29 2026 exports:

| Source | Used for |
|--------|----------|
| `System prompts.odt` | Deep persona YAML prompts in `personas/healthy_eating_advisors/` |
| `Jsons July 29 2026` | `advisor-panel-draft.json`, role/tagline metadata |
| `Persona Prompt Testing Chats July 29 2026` | Example topics appended into persona prompts |
| `RAG July 29 2026` | Markdown corpus under `knowledge/<persona_id>/` |

## How RAG is loaded

1. Knowledge files live in [`knowledge/`](knowledge/) (one folder per advisor).  
2. Users **upload** relevant `.md` files in chat for ChromaDB retrieval via the CCAI documents pipeline (`rag_manager.py`).  
3. Persona prompts instruct advisors to use reference material as educational, non-medical guidance.  
4. Config: `healthyeating_config.yaml` → `rag.chroma_collection: healthy_eating_documents`, embedding `all-MiniLM-L6-v2`.  
5. With `DATA_DIR` set (HF `/data`), vector store + SQLite survive rebuilds.

See also [`knowledge/README.md`](knowledge/README.md).

## Guest mode

**Try without an account** creates a disposable guest session with EmailStr-safe addresses like `guest-…@guests.healthyeating.ai` (never reserved `.local` TLDs).

## Hugging Face Spaces deployment

Single Docker image from the root [`Dockerfile`](Dockerfile):

1. Builds CRA with `REACT_APP_API_URL=""` (same-origin API).  
2. Serves SPA from FastAPI on `:7860`.  
3. Persists SQLite at `${DATA_DIR}/healthy_eating_panel.db`.

### Required Space secrets

| Secret | Purpose |
|--------|---------|
| `JWT_SECRET_KEY` | Signs auth tokens (long random string). |
| `OPENAI_API_KEY` | Default OpenAI provider (`gpt-5.4-mini`). |
| `GEMINI_API_KEY` | Optional — only if you switch `llm.provider` to `gemini`. |

## Local deployment

### Option A — Docker

```bash
# .env:
#   JWT_SECRET_KEY=some-long-random-string
#   OPENAI_API_KEY=your-openai-key
docker compose up --build
```

Open <http://localhost:7860>. Override host port with `HEALTHY_EATING_HOST_PORT`.

### Option B — Native

**Backend:**

```bash
cd multi_llm_chatbot_backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
CONFIG_PATH=../healthyeating_config.yaml uvicorn app.main:app --reload --port 8000
```

**Frontend:**

```bash
cd phd-advisor-frontend
npm install
REACT_APP_API_URL=http://localhost:8000 npm start
```

Open <http://localhost:3000>.

## Configuration

- UI + orchestrator + LLM/RAG: [`healthyeating_config.yaml`](healthyeating_config.yaml)  
- Personas: [`personas/healthy_eating_advisors/`](personas/healthy_eating_advisors/)  
- Author draft: [`advisor-panel-draft.json`](advisor-panel-draft.json)

## First-draft known gaps (second pass)

- Canvas widgets still partially carry template scaffolding; soft-renamed only  
- Knowledge is **upload-for-RAG**, not auto-seeded into Chroma at boot  
- Some RAG filenames retain typos from the source export (`how_to_stteam_vegetables`, `what_are_digestsive_enzymes`)  
- Path gate offers two starter focuses; full focus set is in profile/signup  
- No production brand assets / logo beyond Lucide `Leaf`  
- Voice endpoints point at Neon defaults (may need tenant config)

## License / copyright

Panel content and knowledge pack © Heidi Boudro. CCAI app shell follows the Neon multi-advisor panel pattern.
