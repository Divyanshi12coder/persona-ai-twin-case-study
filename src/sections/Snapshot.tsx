import { Reveal } from "../components/Reveal";
import { TechBadge } from "../components/TechBadge";
import { SNAPSHOT } from "../data/site";
import { TECH_LAYERS } from "../data/tech";

const KEY_TECH = ["React", "TypeScript", "FastAPI", "Python", "PostgreSQL", "pgvector", "Anthropic SDK", "Docker", "Render", "GitHub Actions"];
const all = TECH_LAYERS.flatMap((l) => l.items);
const badges = KEY_TECH.map((n) => all.find((t) => t.name === n)!).filter(Boolean);

export function Snapshot() {
  return (
    <section id="overview" className="snapshot section--dark" aria-labelledby="snapshot-title">
      <div className="container">
        <Reveal variant="scale" className="snapshot__panel">
          <div className="snapshot__head">
            <h2 id="snapshot-title" className="snapshot__title">Project snapshot</h2>
            <p className="snapshot__lead">
              A full-stack system with a React client, a FastAPI service and a per-user memory store. The API is live on
              Render.
            </p>
          </div>
          <dl className="snapshot__grid">
            {SNAPSHOT.map((s) => (
              <div key={s.label} className="snapshot__cell">
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
          <ul className="snapshot__badges" aria-label="Key technologies">
            {badges.map((t) => (
              <li key={t.name}>
                <TechBadge tech={{ ...t, note: undefined }} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
