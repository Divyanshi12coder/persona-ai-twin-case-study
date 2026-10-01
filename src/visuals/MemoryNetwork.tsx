import { MEMORY_TYPES } from "../data/content";
import { NodeGraph, type GraphEdge, type GraphNode } from "./NodeGraph";

const C = { x: 320, y: 255 };
const R = 190;

// Episodic memory sits on top: it is the only store allowed to speak as "I remember".
const ORDER = ["episodic", "persona", "conversation", "semantic", "short"];

const nodes: GraphNode[] = ORDER.map((k, i) => {
  const m = MEMORY_TYPES.find((t) => t.key === k)!;
  const a = (i / ORDER.length) * Math.PI * 2 - Math.PI / 2;
  return { key: k, label: m.label2, sub: m.label, x: C.x + Math.cos(a) * R, y: C.y + Math.sin(a) * R * 0.92 };
});

const edges: GraphEdge[] = [
  ...nodes.map((n) => ({ from: "center", to: n.key })),
  { from: "semantic", to: "conversation", faint: true },
  { from: "episodic", to: "persona", faint: true },
  { from: "short", to: "episodic", faint: true },
];

const related: Record<string, string[]> = {
  short: ["conversation"],
  semantic: ["conversation"],
  episodic: ["persona"],
  persona: ["episodic"],
  conversation: ["short", "semantic"],
};

export function MemoryNetwork() {
  return (
    <NodeGraph
      variant="network"
      viewBox={[640, 500]}
      nodes={nodes}
      edges={edges}
      center={{ ...C, label: "CONTEXT", sub: "<memory_context>" }}
      related={related}
      initial="episodic"
      ariaLabel="Selected memory store"
      renderPanel={(key) => {
        const m = MEMORY_TYPES.find((t) => t.key === key)!;
        return (
          <>
            <p className="graph__panel-kicker">Memory store</p>
            <h3 className="graph__panel-title">{m.label}</h3>
            <p className="graph__panel-summary">{m.holds}</p>
            <dl className="graph__panel-dl">
              <div><dt>Table</dt><dd><code>{m.table}</code></dd></div>
              <div><dt>Lifetime</dt><dd>{m.lifetime}</dd></div>
              <div><dt>How it may be used</dt><dd>{m.trust}</dd></div>
            </dl>
          </>
        );
      }}
    />
  );
}
