// Single source of truth for every external link on the page.
// If a URL changes (e.g. the frontend gets a public Vercel URL), update it here.

export const LINKS = {
  liveApi: "https://personatwin-api.onrender.com/",
  apiDocs: "https://personatwin-api.onrender.com/api/docs",
  apiHealth: "https://personatwin-api.onrender.com/api/health",
  sourceRepo: "https://github.com/Divyanshi12coder/personatwin-digital-doppelganger",
  caseStudyRepo: "https://github.com/Divyanshi12coder/personatwin-ai-case-study",
  caseStudySite: "https://divyanshi12coder.github.io/personatwin-ai-case-study/",
  author: "https://github.com/Divyanshi12coder",
  /** The frontend is configured for Vercel (frontend/vercel.json) but no public URL is documented yet. */
  frontend: null as string | null,
} as const;

export const NAV = [
  { id: "overview", label: "Overview" },
  { id: "concept", label: "Concept" },
  { id: "architecture", label: "Architecture" },
  { id: "memory", label: "Memory" },
  { id: "ai", label: "AI" },
  { id: "engineering", label: "Engineering" },
  { id: "deployment", label: "Deployment" },
  { id: "roadmap", label: "Roadmap" },
] as const;

/** Response of GET /api/health, captured with curl on 2026-10-01. */
export const HEALTH_SNAPSHOT = {
  capturedOn: "2026-10-01",
  body: {
    status: "ok",
    database: "ok",
    database_engine: "sqlite",
    ai: { mode: "demo", provider: "demo", model: "demo-composer" },
    embeddings: "local-hashing-v1",
    version: "1.0.0",
  },
};

export const SNAPSHOT = [
  { label: "Project", value: "PersonaTwin" },
  { label: "Category", value: "AI · Full Stack · Conversational AI" },
  { label: "Status", value: "Deployed (API on Render)" },
  { label: "Backend", value: "Render · Docker web service" },
  { label: "API", value: "FastAPI · REST · OpenAPI" },
  { label: "Core concept", value: "Digital doppelganger mentor" },
  { label: "Retrieval", value: "Hybrid vector + lexical (pgvector)" },
  { label: "License", value: "MIT" },
];
