import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { FlowLane } from "../visuals/FlowLane";

const ROWS = [
  { k: "Source of personal facts", a: "Whatever the model infers from the prompt", b: "Only memories retrieved for this user" },
  { k: "Personal anecdotes", a: "Can be generated freely", b: "Must cite an E# experience, or the reply is flagged" },
  { k: "Voice", a: "Default assistant style", b: "Documented persona guidance lines" },
  { k: "Unknown topics", a: "Usually answers anyway", b: "Says the notes don't cover it, then gives clearly general guidance" },
  { k: "Transparency", a: "Answer text", b: "Sources, relevance, grounding label, provider/model and pipeline trace" },
];

export function Comparison() {
  return (
    <section className="section section--dark" aria-labelledby="cmp-title">
      <div className="container">
        <SectionHeader
          index="12"
          eyebrow="Persona vs generic AI"
          id="cmp-title"
          title="Same model family, very different contract"
          lead="PersonaTwin doesn't replace the LLM — it changes what the LLM is given and what is accepted back. This compares a plain assistant prompt with the PersonaTwin pipeline, not with a real person."
        />
        <div className="cmp-lanes">
          <Reveal>
            <FlowLane
              tone="muted"
              title="Generic AI"
              items={[{ label: "User" }, { label: "General knowledge" }, { label: "Response" }]}
            />
          </Reveal>
          <Reveal delay={100}>
            <FlowLane
              title="PersonaTwin"
              items={[
                { label: "User" },
                { label: "User context" },
                { label: "Persona" },
                { label: "Memory" },
                { label: "Knowledge" },
                { label: "AI" },
                { label: "Personalized response", accent: true },
              ]}
            />
          </Reveal>
        </div>
        <Reveal>
          <div className="table-scroll table-scroll--dark" tabIndex={0} role="region" aria-label="Comparison table">
          <table className="table table--dark">
            <thead>
              <tr>
                <th scope="col">Dimension</th>
                <th scope="col">Plain assistant prompt</th>
                <th scope="col">PersonaTwin pipeline</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.k}>
                  <th scope="row">{r.k}</th>
                  <td>{r.a}</td>
                  <td className="is-accent">{r.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
