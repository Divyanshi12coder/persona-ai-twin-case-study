import { FeatureCard } from "../components/FeatureCard";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { PILLARS } from "../data/content";
import { Transformation } from "../visuals/Transformation";

export function Idea() {
  return (
    <section id="concept" className="section section--dark section--idea" aria-labelledby="idea-title">
      <div className="container">
        <SectionHeader
          index="02"
          eyebrow="The idea"
          id="idea-title"
          title={<>What if an AI could learn your <span className="grad">digital identity</span>?</>}
          lead="PersonaTwin breaks a person into four kinds of signal, stores each one differently, and recombines them at question time. The result is a mentor that speaks in a documented voice, draws on recorded experiences, and shows its sources."
        />

        <div className="pillars">
          {PILLARS.map((p, i) => (
            <Reveal key={p.key} delay={i * 90}>
              <FeatureCard title={p.title} icon={p.key} className="pillar">
                <ul className="pillar__list">
                  {p.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
                <p className="pillar__impl"><code>{p.implemented}</code></p>
              </FeatureCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="signal-chain" variant="fade">
          <span>These signals</span>
          <i aria-hidden="true" />
          <span>Persona representation</span>
          <i aria-hidden="true" />
          <span className="signal-chain__end">AI response generation</span>
        </Reveal>
      </div>

      <div className="container">
        <div className="transform-intro">
          <Reveal as="p" className="eyebrow">Information becomes representation</Reveal>
          <Reveal as="h3" className="transform-intro__title" delay={80}>
            From raw notes to a conversational twin
          </Reveal>
        </div>
        <Transformation />
      </div>
    </section>
  );
}
