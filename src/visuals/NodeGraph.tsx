import { useId, useState, type ReactNode } from "react";
import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useReducedMotion";

export type GraphNode = { key: string; label: string; x: number; y: number; sub?: string };
export type GraphEdge = { from: string; to: string; faint?: boolean };

type Props = {
  nodes: GraphNode[];
  edges: GraphEdge[];
  center: { label: string; sub?: string; x: number; y: number };
  /** keys related to each node (they react subtly when it is active) */
  related?: Record<string, string[]>;
  initial: string;
  renderPanel: (key: string) => ReactNode;
  ariaLabel: string;
  variant: "constellation" | "network";
  viewBox?: [number, number];
  particles?: boolean;
};

/**
 * Interactive hub-and-spoke graph. The SVG layer draws edges and travelling particles;
 * nodes are real <button>s positioned over it, so the graph is fully keyboard accessible.
 * Hover or focus a node to highlight its connections and show its explanation.
 */
export function NodeGraph({ nodes, edges, center, related = {}, initial, renderPanel, ariaLabel, variant, viewBox = [600, 600], particles = true }: Props) {
  const [active, setActive] = useState(initial);
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.25 });
  const reduced = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const [vw, vh] = viewBox;

  const pos = (k: string) => (k === "center" ? center : nodes.find((n) => n.key === k)!);
  const rel = new Set(related[active] ?? []);
  const isLit = (e: GraphEdge) => e.from === active || e.to === active;
  const panelId = `${uid}-panel`;

  return (
    <div ref={ref} className={`graph graph--${variant}${inView ? " is-visible" : ""}`}>
      <div className="graph__canvas" style={{ aspectRatio: `${vw} / ${vh}` }}>
        <svg viewBox={`0 0 ${vw} ${vh}`} className="graph__svg" aria-hidden="true">
          <defs>
            <radialGradient id={`${uid}-glow`} cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#4d8dff" stopOpacity="0.28" />
              <stop offset="1" stopColor="#4d8dff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx={center.x} cy={center.y} r={vw * 0.3} fill={`url(#${uid}-glow)`} />
          {variant === "constellation" && (
            <>
              <circle cx={center.x} cy={center.y} r={vw * 0.35} className="graph__ring" />
              <circle cx={center.x} cy={center.y} r={vw * 0.22} className="graph__ring graph__ring--inner" />
            </>
          )}
          {edges.map((e, i) => {
            const a = pos(e.from);
            const b = pos(e.to);
            const d = `M${a.x} ${a.y} L${b.x} ${b.y}`;
            const lit = isLit(e);
            return (
              <g key={i} className={`graph__edge${lit ? " is-lit" : ""}${e.faint ? " is-faint" : ""}`} style={{ ["--d" as string]: `${i * 70}ms` }}>
                <path d={d} pathLength={1} className="graph__line" />
                <path d={d} className="graph__flow" />
                {particles && !reduced && !e.faint && (
                  <circle r={lit ? 3.4 : 2.2} className="graph__particle">
                    {/* travel toward the hub: memories flow into the persona */}
                    <animateMotion dur={`${2.4 + (i % 3) * 0.5}s`} begin={`-${i * 0.3}s`} repeatCount="indefinite" path={`M${b.x} ${b.y} L${a.x} ${a.y}`} />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>

        <div className="graph__center" style={{ left: `${(center.x / vw) * 100}%`, top: `${(center.y / vh) * 100}%` }}>
          <span className="graph__center-label">{center.label}</span>
          {center.sub && <span className="graph__center-sub">{center.sub}</span>}
        </div>

        {nodes.map((n, i) => {
          const state = n.key === active ? "is-active" : rel.has(n.key) ? "is-related" : "is-dim";
          return (
            <button
              key={n.key}
              type="button"
              className={`graph__node ${state}`}
              style={{ left: `${(n.x / vw) * 100}%`, top: `${(n.y / vh) * 100}%`, transitionDelay: `${200 + i * 90}ms, ${200 + i * 90}ms, 0ms, 0ms` }}
              onMouseEnter={() => setActive(n.key)}
              onFocus={() => setActive(n.key)}
              onClick={() => setActive(n.key)}
              aria-pressed={n.key === active}
              aria-controls={panelId}
            >
              <span className="graph__node-dot" aria-hidden="true" />
              <span className="graph__node-label">{n.label}</span>
              {n.sub && <span className="graph__node-sub">{n.sub}</span>}
            </button>
          );
        })}
      </div>

      <div id={panelId} className="graph__panel" role="region" aria-live="polite" aria-label={ariaLabel}>
        {renderPanel(active)}
      </div>
    </div>
  );
}
