import { useEffect, useState } from "react";
import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useReducedMotion";

type ArchNode = {
  key: string;
  label: string;
  tech: string;
  x: number;
  y: number;
  detail: string;
  file: string;
};

// Verified against backend/app/main.py, api/deps.py, services/chat.py, services/ai.py, db/types.py.
export const ARCH_NODES: ArchNode[] = [
  { key: "user", label: "User", tech: "Browser", x: 110, y: 110, detail: "A person chatting with the mentor built from their own knowledge, experiences and persona.", file: "—" },
  { key: "client", label: "Client", tech: "React · TypeScript · Vite", x: 350, y: 110, detail: "Single-page app with a typed API client. Sends a bearer token to /api/* and never contacts an AI provider directly. Configured for Vercel.", file: "frontend/src/services/api.ts" },
  { key: "api", label: "API", tech: "FastAPI · /api", x: 590, y: 110, detail: "Receives requests and orchestrates the pipeline: Pydantic validation, JWT auth dependency with token_version check, per-user chat rate limit, CORS allow-list and security headers.", file: "backend/app/main.py · api/deps.py" },
  { key: "engine", label: "Persona engine", tech: "run_pipeline()", x: 850, y: 110, detail: "understand → retrieve → persona → assemble → prompt → generate → validate. Every step is timed and returned as the reply's trace.", file: "backend/app/services/chat.py" },
  { key: "memory", label: "Memory", tech: "PostgreSQL + pgvector", x: 850, y: 330, detail: "Five memory stores with 384-d embeddings; cosine search via pgvector (HNSW) — or Python cosine on SQLite. Every query is filtered by user_id.", file: "backend/app/services/retrieval.py" },
  { key: "ai", label: "AI layer", tech: "Claude · OpenAI-compatible · Demo", x: 590, y: 330, detail: "AIService wraps AnthropicProvider (adaptive thinking), OpenAIProvider or DemoProvider. A failing live provider falls back to the demo composer with a visible notice.", file: "backend/app/services/ai.py" },
  { key: "response", label: "Response", tech: "Validated JSON", x: 350, y: 330, detail: "Citations checked, unsupported memory claims flagged, grounding classified. Returned with sources and trace; stored with source snapshots unless privacy mode is on.", file: "backend/app/services/validation.py" },
];

const EDGES: { from: string; to: string; label: string; d?: string }[] = [
  { from: "user", to: "client", label: "message" },
  { from: "client", to: "api", label: "POST /api/chat" },
  { from: "api", to: "engine", label: "user + settings" },
  { from: "engine", to: "memory", label: "retrieve" },
  { from: "engine", to: "ai", label: "system + context" },
  { from: "ai", to: "response", label: "validate" },
  { from: "response", to: "user", label: "content · sources · trace", d: "M350 330 C 200 330, 110 300, 110 140" },
];

const ORDER = ARCH_NODES.map((n) => n.key);
const get = (k: string) => ARCH_NODES.find((n) => n.key === k)!;

function edgePath(e: (typeof EDGES)[number]) {
  if (e.d) return e.d;
  const a = get(e.from);
  const b = get(e.to);
  // trim so the line meets the node box rather than its centre
  const dx = b.x - a.x, dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len, uy = dy / len;
  const pad = Math.abs(ux) > Math.abs(uy) ? 72 : 42;
  return `M${a.x + ux * pad} ${a.y + uy * pad} L${b.x - ux * pad} ${b.y - uy * pad}`;
}

const FULL_ROUTE = "M110 110 L350 110 L590 110 L850 110 L850 330 L850 110 L590 330 L350 330 C 200 330, 110 300, 110 140";

export function ArchitectureDiagram() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.25 });
  const reduced = useReducedMotion();
  const [step, setStep] = useState(-1);
  const [hover, setHover] = useState<string | null>(null);

  // Activate nodes one by one, then keep cycling slowly through the request path.
  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setStep(ORDER.length - 1);
      return;
    }
    let i = 0;
    setStep(0);
    const id = window.setInterval(() => {
      i = (i + 1) % ORDER.length;
      setStep(i);
    }, 1500);
    return () => window.clearInterval(id);
  }, [inView, reduced]);

  const activeKey = hover ?? (step >= 0 ? ORDER[step] : "user");
  const active = get(activeKey);

  return (
    <div ref={ref} className={`arch${inView ? " is-visible" : ""}`}>
      {/* Desktop / tablet: spatial diagram */}
      <div className="arch__canvas">
        <svg viewBox="0 0 960 440" className="arch__svg" aria-hidden="true">
          <defs>
            <marker id="arch-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="#7aa7ff" />
            </marker>
          </defs>
          {/* layer bands */}
          <rect x="20" y="40" width="920" height="140" rx="18" className="arch__band" />
          <rect x="20" y="260" width="920" height="140" rx="18" className="arch__band" />
          <text x="40" y="66" className="arch__band-label">REQUEST PATH</text>
          <text x="40" y="286" className="arch__band-label">GENERATION &amp; RESPONSE</text>

          {EDGES.map((e, i) => {
            const d = edgePath(e);
            const lit = activeKey === e.from || activeKey === e.to;
            const a = get(e.from), b = get(e.to);
            const mx = e.d ? 150 : (a.x + b.x) / 2;
            const my = e.d ? 250 : (a.y + b.y) / 2;
            return (
              <g key={i} className={`arch__edge${lit ? " is-lit" : ""}`} style={{ ["--d" as string]: `${300 + i * 160}ms` }}>
                <path d={d} pathLength={1} className="arch__line" markerEnd="url(#arch-arrow)" />
                <text x={mx + (a.x === b.x ? 12 : 0)} y={my - (a.y === b.y ? 12 : 0)} textAnchor={a.x === b.x ? "start" : "middle"} className="arch__edge-label">
                  {e.label}
                </text>
              </g>
            );
          })}

          {!reduced && inView && (
            <g className="arch__particles">
              {[0, 1, 2].map((k) => (
                <circle key={k} r="4" className="arch__particle">
                  <animateMotion dur="9s" begin={`-${k * 3}s`} repeatCount="indefinite" path={FULL_ROUTE} />
                </circle>
              ))}
            </g>
          )}
        </svg>

        {ARCH_NODES.map((n, i) => (
          <button
            key={n.key}
            type="button"
            className={`arch__node${activeKey === n.key ? " is-active" : ""}${step >= i || hover ? " is-on" : ""}`}
            style={{ left: `${(n.x / 960) * 100}%`, top: `${(n.y / 440) * 100}%`, transitionDelay: `${i * 140}ms, ${i * 140}ms, 0ms, 0ms, 0ms` }}
            onMouseEnter={() => setHover(n.key)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(n.key)}
            onBlur={() => setHover(null)}
            aria-describedby="arch-detail"
          >
            <span className="arch__node-index">{String(i + 1).padStart(2, "0")}</span>
            <span className="arch__node-label">{n.label}</span>
            <span className="arch__node-tech">{n.tech}</span>
          </button>
        ))}
      </div>

      {/* Mobile: vertical stack with animated connectors */}
      <ol className="arch__stack">
        {ARCH_NODES.map((n, i) => (
          <li key={n.key} className={`arch__stack-item${activeKey === n.key ? " is-active" : ""}`} style={{ transitionDelay: `${i * 90}ms` }}>
            <span className="arch__node-index">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <p className="arch__node-label">{n.label}</p>
              <p className="arch__node-tech">{n.tech}</p>
              <p className="arch__stack-detail">{n.detail}</p>
            </div>
          </li>
        ))}
      </ol>

      <div id="arch-detail" className="arch__detail" aria-live="polite">
        <div className="arch__detail-head">
          <span className="arch__detail-kicker">Active layer</span>
          <h3>{active.label}</h3>
          <code>{active.file}</code>
        </div>
        <p>{active.detail}</p>
      </div>
    </div>
  );
}
