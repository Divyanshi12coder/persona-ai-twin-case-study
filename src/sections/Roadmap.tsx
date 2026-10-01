import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { ROADMAP } from "../data/content";

export function Roadmap() {
  return (
    <section id="roadmap" className="section section--light section--tinted" aria-labelledby="roadmap-title">
      <div className="container">
        <SectionHeader
          index="18"
          eyebrow="Future roadmap"
          id="roadmap-title"
          title="What could be built next"
          lead={<>Everything in this section is <strong>future work — not implemented</strong>. Items marked “README roadmap” are already listed in the project repository; “Exploratory” items are longer-term ideas.</>}
        />
        <ul className="roadmap">
          {ROADMAP.map((r, i) => (
            <Reveal as="li" key={r.title} className="roadmap__item" delay={(i % 3) * 70}>
              <div className="roadmap__top">
                <span className="roadmap__status">Planned</span>
                <span className={`roadmap__src${r.source === "Exploratory" ? " is-explore" : ""}`}>{r.source}</span>
              </div>
              <h3>{r.title}</h3>
              <p>{r.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
