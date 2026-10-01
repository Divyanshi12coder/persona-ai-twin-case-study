import {
  siAnthropic,
  siDocker,
  siFastapi,
  siFramer,
  siGithubactions,
  siJsonwebtokens,
  siNginx,
  siPostgresql,
  siPydantic,
  siPytest,
  siPython,
  siReact,
  siReactrouter,
  siRender,
  siSqlalchemy,
  siSqlite,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVite,
} from "simple-icons";

export type Tech = { name: string; version?: string; icon?: { path: string; hex: string }; note?: string };

const i = (s: { path: string; hex: string }) => ({ path: s.path, hex: s.hex });

// Versions come from frontend/package.json, backend/requirements.txt, Dockerfile and docker-compose.yml.
export const TECH_LAYERS: { key: string; layer: string; role: string; items: Tech[] }[] = [
  {
    key: "experience",
    layer: "Experience",
    role: "React SPA · typed API client · never contacts an AI provider",
    items: [
      { name: "React", version: "18", icon: i(siReact) },
      { name: "TypeScript", version: "5.6", icon: i(siTypescript) },
      { name: "Vite", version: "7", icon: i(siVite) },
      { name: "Tailwind CSS", version: "3", icon: i(siTailwindcss) },
      { name: "React Router", version: "7", icon: i(siReactrouter) },
      { name: "Framer Motion", icon: i(siFramer) },
      { name: "Recharts", note: "Insights charts" },
    ],
  },
  {
    key: "api",
    layer: "API layer",
    role: "REST · validation · auth · rate limiting · OpenAPI at /api/docs",
    items: [
      { name: "FastAPI", version: "0.115+", icon: i(siFastapi) },
      { name: "Python", version: "3.12", icon: i(siPython) },
      { name: "Pydantic", version: "2", icon: i(siPydantic) },
      { name: "Uvicorn", note: "ASGI server" },
      { name: "JWT (PyJWT)", icon: i(siJsonwebtokens) },
      { name: "bcrypt", note: "12 rounds" },
    ],
  },
  {
    key: "engine",
    layer: "Persona engine",
    role: "Query understanding · retrieval · context · prompts · generation · validation",
    items: [
      { name: "Anthropic SDK", note: "Claude · default claude-opus-5", icon: i(siAnthropic) },
      { name: "OpenAI-compatible", note: "via httpx" },
      { name: "Demo composer", note: "no key, no network" },
      { name: "Hashing embeddings", note: "local · 384-d" },
      { name: "pypdf", note: "PDF extraction" },
    ],
  },
  {
    key: "data",
    layer: "Data & memory",
    role: "Per-user stores · 384-d vectors · HNSW index · migrations",
    items: [
      { name: "PostgreSQL", version: "16", icon: i(siPostgresql) },
      { name: "pgvector", note: "HNSW" },
      { name: "SQLAlchemy", version: "2", icon: i(siSqlalchemy) },
      { name: "Alembic", note: "migrations" },
      { name: "SQLite", note: "local & tests", icon: i(siSqlite) },
    ],
  },
  {
    key: "delivery",
    layer: "Delivery",
    role: "Containers · CI · hosting",
    items: [
      { name: "Docker", icon: i(siDocker) },
      { name: "Render", note: "API", icon: i(siRender) },
      { name: "Vercel", note: "SPA config", icon: i(siVercel) },
      { name: "GitHub Actions", note: "CI", icon: i(siGithubactions) },
      { name: "pytest", icon: i(siPytest) },
      { name: "nginx", note: "Compose frontend", icon: i(siNginx) },
    ],
  },
];

export const TECH_CATEGORIES: { label: string; items: string[] }[] = [
  { label: "Frontend", items: ["React 18", "TypeScript 5.6", "Vite 7", "Tailwind CSS 3", "React Router 7", "Framer Motion", "Recharts", "lucide-react"] },
  { label: "Backend", items: ["Python 3.12", "FastAPI", "Pydantic v2 + pydantic-settings", "Uvicorn", "httpx", "pypdf"] },
  { label: "AI / LLM", items: ["Anthropic SDK (Claude, adaptive thinking)", "OpenAI-compatible Chat Completions", "Demo composer (offline)", "Local hashing or OpenAI embeddings (384-d)"] },
  { label: "Database / Storage", items: ["PostgreSQL 16 + pgvector (HNSW)", "SQLAlchemy 2", "Alembic", "SQLite for local runs & tests"] },
  { label: "Authentication", items: ["JWT (HS256, PyJWT)", "bcrypt", "token_version revocation", "Per-IP / per-user rate limits"] },
  { label: "Deployment", items: ["Render (Docker web service)", "Vercel config for the SPA", "Docker Compose locally"] },
  { label: "DevOps", items: ["GitHub Actions CI", "pytest on SQLite + PostgreSQL", "Alembic drift check", "Container health checks"] },
];
