import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { LEARNED } from "../data/content";

export function Learned() {
  return (
    <section className="section section--light" aria-labelledby="learned-title">
      <div className="container">
        <SectionHeader index="17" eyebrow="What I learned" id="learned-title" title="Engineering lessons from building a personal AI" />
        <ol className="learned">
          {LEARNED.map((l, i) => (
            <Reveal as="li" key={l.title} className="learned__item" delay={(i % 3) * 70}>
              <span className="learned__n">{String(i + 1).padStart(2, "0")}</span>
              <h3>{l.title}</h3>
              <p>{l.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
