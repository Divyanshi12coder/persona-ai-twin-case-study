import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { CHALLENGES } from "../data/content";

export function Challenges() {
  return (
    <section id="engineering" className="section section--light" aria-labelledby="eng-title">
      <div className="container">
        <SectionHeader
          index="11"
          eyebrow="Engineering challenges"
          id="eng-title"
          title="Ten problems, and how the code answers them"
          lead="Each challenge is shown as challenge → engineering approach → current state. No benchmarks are claimed; the outcomes describe what is implemented."
        />
        <ol className="challenges">
          {CHALLENGES.map((c, i) => (
            <Reveal as="li" key={c.n} className="challenge" delay={(i % 2) * 80}>
              <header className="challenge__head">
                <span className="challenge__n">{String(c.n).padStart(2, "0")}</span>
                <h3>{c.title}</h3>
              </header>
              <div className="challenge__flow">
                <div className="challenge__col">
                  <span className="challenge__label">Challenge</span>
                  <p>{c.challenge}</p>
                </div>
                <span className="challenge__arrow" aria-hidden="true" />
                <div className="challenge__col">
                  <span className="challenge__label">Approach</span>
                  <p>{c.approach}</p>
                </div>
                <span className="challenge__arrow" aria-hidden="true" />
                <div className="challenge__col challenge__col--out">
                  <span className="challenge__label">Current state</span>
                  <p>{c.outcome}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
