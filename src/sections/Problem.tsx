import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { FlowLane } from "../visuals/FlowLane";

export function Problem() {
  return (
    <section className="section section--light" aria-labelledby="problem-title">
      <div className="container">
        <SectionHeader
          index="01"
          eyebrow="The problem"
          id="problem-title"
          title={<>Generic assistants know a lot. They don't know <em>you</em>.</>}
          lead="A general-purpose assistant answers from broad training data. Out of the box it has no record of a specific person's experiences, preferences, values or way of explaining things — so advice that should sound like a trusted mentor comes out sounding like everyone else."
        />

        <div className="problem__flows">
          <Reveal className="problem__flow problem__flow--generic">
            <FlowLane
              surface="light"
              tone="muted"
              title="Typical conversational AI"
              items={[{ label: "User" }, { label: "Generic AI" }, { label: "Generic response" }]}
            />
          </Reveal>
          <Reveal className="problem__flow" delay={120}>
            <FlowLane
              surface="light"
              title="PersonaTwin"
              items={[
                { label: "User" },
                { label: "Personal context" },
                { label: "Personality" },
                { label: "Memory" },
                { label: "Knowledge" },
                { label: "AI reasoning" },
                { label: "Persona-aware response", accent: true },
              ]}
            />
          </Reveal>
        </div>

        <div className="problem__points">
          {[
            { k: "Represent", v: "Model a specific person's documented knowledge, experiences and communication style as structured, editable data." },
            { k: "Recall", v: "Retrieve only what is relevant to the question — from this person's memories and no one else's." },
            { k: "Stay honest", v: "Cite what was used, and say plainly when nothing relevant has been recorded instead of inventing a story." },
          ].map((p, i) => (
            <Reveal key={p.k} className="problem__point" delay={i * 90}>
              <h3>{p.k}</h3>
              <p>{p.v}</p>
            </Reveal>
          ))}
        </div>
        <Reveal as="p" className="note note--light">
          PersonaTwin does not claim to replicate a human. It explores how documented characteristics can make AI
          conversations more personal — and how to keep them transparent.
        </Reveal>
      </div>
    </section>
  );
}
