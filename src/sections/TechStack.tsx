import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { TECH_CATEGORIES } from "../data/tech";
import { TechLayers } from "../visuals/TechLayers";

export function TechStack() {
  return (
    <section className="section section--light section--tinted" aria-labelledby="stack-title">
      <div className="container">
        <SectionHeader
          index="09"
          eyebrow="Tech stack"
          id="stack-title"
          title="A technology map, layer by layer"
          lead="Every entry below appears in the project's package.json, requirements.txt, Dockerfile, docker-compose.yml or CI workflow."
        />
        <TechLayers />

        <div className="stack-cats">
          {TECH_CATEGORIES.map((c, i) => (
            <Reveal key={c.label} className="stack-cat" delay={(i % 4) * 70}>
              <h3>{c.label}</h3>
              <ul>
                {c.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
