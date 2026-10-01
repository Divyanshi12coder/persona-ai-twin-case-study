import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { GROUNDING_RULES } from "../data/content";
import { ConversationDemo } from "../visuals/ConversationDemo";
import { FlowLane } from "../visuals/FlowLane";

export function ConversationalAI() {
  return (
    <section id="ai" className="section section--dark" aria-labelledby="ai-title">
      <div className="container">
        <SectionHeader
          index="07"
          eyebrow="Conversational AI"
          id="ai-title"
          title="Every reply shows its work"
          lead="A message runs through query understanding, user-scoped retrieval, persona loading, bounded context assembly and prompt construction before it reaches the LLM — then the output is validated before anyone sees it."
        />

        <Reveal>
          <FlowLane
            items={[
              { label: "User message" },
              { label: "Intent & topic", sub: "deterministic" },
              { label: "Persona", sub: "guidance lines" },
              { label: "Memory", sub: "K# · E# · C#" },
              { label: "Prompt", sub: "≤ 9 000 chars" },
              { label: "LLM", sub: "provider abstraction" },
              { label: "Persona-aware response", sub: "validated", accent: true },
            ]}
          />
        </Reveal>

        <ConversationDemo />
        <p className="demo-note">
          Illustrative run assembled from the project's sample persona data. It demonstrates the pipeline — it does not
          reproduce a real person's response.
        </p>

        <div className="ai-grid">
          <Reveal className="rules">
            <h3 className="mini-title">Grounding rules in the system prompt</h3>
            <ol>
              {GROUNDING_RULES.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ol>
          </Reveal>
          <Reveal className="providers" delay={100}>
            <h3 className="mini-title">Provider abstraction · services/ai.py</h3>
            <ul className="providers__list">
              <li>
                <strong>AnthropicProvider</strong>
                <span>Official SDK · default model <code>claude-opus-5</code> · adaptive thinking with configurable effort · server-side refusal fallbacks</span>
              </li>
              <li>
                <strong>OpenAIProvider</strong>
                <span>Chat Completions or any compatible gateway via <code>AI_BASE_URL</code> · temperature from the user's creativity setting</span>
              </li>
              <li>
                <strong>DemoProvider</strong>
                <span>No key, no network · composes replies only from retrieved memories, each with its label</span>
              </li>
            </ul>
            <h3 className="mini-title">After generation · services/validation.py</h3>
            <ul className="checks">
              <li>Removes citation labels that don't match a retrieved memory</li>
              <li>Strips leaked internal tags</li>
              <li>Flags each “I remember…” claim lacking a nearby <code>[E#]</code></li>
              <li>Classifies grounded · partial · ungrounded</li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
