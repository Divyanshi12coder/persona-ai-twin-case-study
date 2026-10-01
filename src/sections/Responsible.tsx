import { FeatureCard } from "../components/FeatureCard";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { ETHICS, LIMITATIONS } from "../data/content";

const ETHICS_ICONS = ["user", "personality", "lock", "doc", "eye", "shield", "spark", "lock"];

export function Responsible() {
  return (
    <>
      <section className="section section--light" aria-labelledby="limits-title">
        <div className="container">
          <SectionHeader
            index="14"
            eyebrow="Limitations"
            id="limits-title"
            title="Design considerations, stated plainly"
            lead="A digital twin is only useful if people can trust what it claims. These are the boundaries of the current system and the reasons behind them."
          />
          <div className="limits">
            {LIMITATIONS.map((l, i) => (
              <Reveal key={l.title} delay={(i % 4) * 60}>
                <article className="limit">
                  <h3>{l.title}</h3>
                  <p>{l.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--light section--tinted" aria-labelledby="ethics-title">
        <div className="container">
          <SectionHeader
            index="15"
            eyebrow="Ethical considerations"
            id="ethics-title"
            title="Representing a person is a responsibility"
            lead="Practical safeguards built into the product, rather than principles on a slide."
          />
          <div className="ethics">
            {ETHICS.map((e, i) => (
              <Reveal key={e.title} delay={(i % 4) * 60}>
                <FeatureCard title={e.title} icon={ETHICS_ICONS[i]} tone="light">
                  <p>{e.body}</p>
                </FeatureCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
