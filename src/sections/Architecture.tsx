import { ArchitectureDiagram } from "../components/ArchitectureDiagram";
import { FeatureCard } from "../components/FeatureCard";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";

const PRINCIPLES = [
  { icon: "memory", title: "Memories come from the database, not the model", body: "The LLM receives retrieved rows as labelled data and must cite them." },
  { icon: "lock", title: "Ownership everywhere", body: "Every private query filters by user_id; chunks carry a denormalised user_id so vector search never trusts a join." },
  { icon: "layers", title: "Same code on two databases", body: "EmbeddingVector is vector(384) on PostgreSQL and JSON on SQLite; retrieval uses <=> or an equivalent Python cosine." },
  { icon: "route", title: "Graceful degradation", body: "No key → demo composer. Provider outage → fallback + notice. Embedding outage → saved as “not indexed”. DB error → 503." },
];

export function Architecture() {
  return (
    <section id="architecture" className="section section--dark section--grid" aria-labelledby="arch-title">
      <div className="container">
        <SectionHeader
          index="05"
          eyebrow="System architecture"
          id="arch-title"
          title="Three tiers, one carefully bounded pipeline"
          lead="A React single-page app, a FastAPI service and PostgreSQL with pgvector. The browser only ever talks to /api/* — AI keys live exclusively in backend environment variables. Hover or focus a layer to see what it does and where it lives in the code."
        />
        <ArchitectureDiagram />

        <div className="principles">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <FeatureCard title={p.title} icon={p.icon}>
                <p>{p.body}</p>
              </FeatureCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
