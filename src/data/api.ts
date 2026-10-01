// Endpoints verified against backend/app/api/routes/*.py (all mounted under /api).

export type Endpoint = { method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"; path: string; note: string; auth?: false };
export type EndpointGroup = { key: string; label: string; summary: string; endpoints: Endpoint[] };

export const API_GROUPS: EndpointGroup[] = [
  {
    key: "chat",
    label: "Chat",
    summary: "The conversational pipeline and conversation history. Chat is rate-limited per user.",
    endpoints: [
      { method: "POST", path: "/api/chat", note: "Run the pipeline: {message, conversation_id?, history?}" },
      { method: "POST", path: "/api/chat/messages/{id}/regenerate", note: "Re-run for the previous question; update in place" },
      { method: "PATCH", path: "/api/chat/messages/{id}/feedback", note: "{feedback: up | down | null}" },
      { method: "POST", path: "/api/chat/messages/{id}/remember", note: "Save the exchange as a conversation memory" },
      { method: "GET", path: "/api/conversations", note: "List conversations with last message" },
      { method: "GET", path: "/api/conversations/{id}", note: "Conversation with messages, sources and traces" },
      { method: "PATCH", path: "/api/conversations/{id}", note: "Rename" },
      { method: "DELETE", path: "/api/conversations/{id}", note: "Delete (saved memories are kept)" },
    ],
  },
  {
    key: "memory",
    label: "Memory",
    summary: "Knowledge, experiences and the Memory Inspector — every query scoped to the current user.",
    endpoints: [
      { method: "GET", path: "/api/knowledge", note: "List / filter by q, category, tag" },
      { method: "POST", path: "/api/knowledge", note: "Create a note — chunked and embedded" },
      { method: "POST", path: "/api/knowledge/upload", note: "Multipart .txt / .md / .pdf, ≤ 2 MB" },
      { method: "POST", path: "/api/knowledge/url", note: "Import a public http(s) page (SSRF-checked)" },
      { method: "PATCH", path: "/api/knowledge/{id}", note: "Content edits re-chunk and re-embed" },
      { method: "POST", path: "/api/experiences", note: "Structured episode, importance 1–5" },
      { method: "GET", path: "/api/memories", note: "All memories, or semantic search with relevance" },
      { method: "POST", path: "/api/memories/reindex", note: "Re-embed everything" },
    ],
  },
  {
    key: "persona",
    label: "Persona",
    summary: "Mentor profile, personality model and per-user retrieval settings.",
    endpoints: [
      { method: "GET", path: "/api/profile/options", note: "Allowed persona values (public)", auth: false },
      { method: "GET", path: "/api/profile", note: "{mentor, personality, completeness, missing}" },
      { method: "POST", path: "/api/profile/onboarding", note: "Create mentor + personality" },
      { method: "PUT", path: "/api/profile/personality", note: "Options, sliders, values, philosophy" },
      { method: "GET", path: "/api/settings", note: "Privacy, top-k, min relevance, creativity" },
      { method: "PUT", path: "/api/settings", note: "Update the same" },
    ],
  },
  {
    key: "auth",
    label: "Auth & system",
    summary: "bcrypt + JWT with server-side revocation via token_version. Auth routes are rate-limited per IP.",
    endpoints: [
      { method: "GET", path: "/api/health", note: "Database, AI mode/provider/model, embeddings", auth: false },
      { method: "POST", path: "/api/auth/signup", note: "201 → access token + user", auth: false },
      { method: "POST", path: "/api/auth/login", note: "Same 401 for unknown email or wrong password", auth: false },
      { method: "POST", path: "/api/auth/logout", note: "Increments token_version → revokes all tokens" },
      { method: "GET", path: "/api/auth/export", note: "Everything stored about the account" },
      { method: "DELETE", path: "/api/auth/me", note: "Delete account and all data" },
      { method: "GET", path: "/api/insights/analytics", note: "Topics, trends, grounding distribution" },
    ],
  },
];

export const ENDPOINT_COUNT = 45;

export const CHAT_REQUEST = `POST /api/chat
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "message": "Should I switch careers?",
  "conversation_id": 12
}`;

// Shape from docs/api.md (ChatResponse), abbreviated. Values are illustrative.
export const CHAT_RESPONSE = `{
  "conversation_id": 12,
  "persisted": true,
  "assistant_message": {
    "content": "This connects to something I've actually recorded: … [E1]",
    "topic": "career",
    "grounding": "grounded",
    "provider": "anthropic",
    "model": "claude-opus-5",
    "sources": [
      { "label": "E1", "source_type": "experience",
        "title": "Leaving agency life…", "score": 0.47, "cited": true }
    ],
    "trace": {
      "steps": [{ "step": "understand", "detail": "Career · decision" }, "…"],
      "intent": "decision",
      "unsupported_memory_claim": false,
      "degraded": false
    }
  }
}`;
