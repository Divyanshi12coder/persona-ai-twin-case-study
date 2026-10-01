import { PERSONA_NODES } from "../data/content";
import { NodeGraph, type GraphEdge, type GraphNode } from "./NodeGraph";

const C = { x: 300, y: 300 };
const R = 215;

const nodes: GraphNode[] = PERSONA_NODES.map((n, i) => {
  const a = (i / PERSONA_NODES.length) * Math.PI * 2 - Math.PI / 2;
  return { key: n.key, label: n.label, x: C.x + Math.cos(a) * R, y: C.y + Math.sin(a) * R };
});

const edges: GraphEdge[] = [
  ...nodes.map((n) => ({ from: "center", to: n.key })),
  // faint ring connecting neighbouring layers
  ...nodes.map((n, i) => ({ from: n.key, to: nodes[(i + 1) % nodes.length].key, faint: true })),
];

const related = Object.fromEntries(PERSONA_NODES.map((n) => [n.key, n.related]));

export function PersonaConstellation() {
  return (
    <NodeGraph
      variant="constellation"
      nodes={nodes}
      edges={edges}
      center={{ ...C, label: "PERSONA", sub: "PersonaSnapshot" }}
      related={related}
      initial="personality"
      ariaLabel="Selected persona layer"
      renderPanel={(key) => {
        const n = PERSONA_NODES.find((p) => p.key === key)!;
        return (
          <>
            <p className="graph__panel-kicker">Persona layer</p>
            <h3 className="graph__panel-title">{n.label}</h3>
            <p className="graph__panel-summary">{n.summary}</p>
            <ul className="graph__panel-list">
              {n.detail.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <p className="graph__panel-hint">Hover, tap or tab through the nodes to explore each layer.</p>
          </>
        );
      }}
    />
  );
}
