import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { PersonaConstellation } from "../visuals/PersonaConstellation";

const FORMULA = ["Identity", "Traits", "Preferences", "Communication style", "Experiences", "Knowledge"];

export function PersonaModel() {
  return (
    <section className="section section--deep" aria-labelledby="persona-title">
      <div className="container">
        <SectionHeader
          index="03"
          eyebrow="Personality model"
          id="persona-title"
          title="A persona is many layers, not one prompt"
          lead={
            <>
              The persona is a <strong>software representation of documented characteristics</strong> — choices the owner
              made in onboarding and can edit at any time. It is not a psychological assessment, and it shapes the voice
              without ever supplying facts.
            </>
          }
        />

        <PersonaConstellation />

        <Reveal className="formula" variant="fade">
          <ol className="formula__terms" aria-label="Persona profile inputs">
            {FORMULA.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ol>
          <span className="formula__arrow" aria-hidden="true">→</span>
          <span className="formula__out">Persona profile</span>
          <span className="formula__arrow" aria-hidden="true">→</span>
          <span className="formula__out formula__out--accent">Persona-aware response</span>
        </Reveal>

        <div className="persona-code">
          <Reveal>
            <h3 className="mini-title">How sliders become instructions</h3>
            <p className="muted">
              Four 0–100 sliders — formality, directness, warmth and humor — are converted to plain-language phrases before
              they reach the model. The same option lists power both the UI and server-side validation.
            </p>
          </Reveal>
          <Reveal delay={100} className="persona-code__sample">
            <pre tabIndex={0} aria-label="Example of persona guidance lines">
              <code>
                <span className="tok-comment"># PersonaSnapshot.guidance_lines() with the default profile</span>{"\n"}
                - Communication style: <span className="tok-str">Warm and personal — speaks like a trusted friend who happens to know a lot.</span>{"\n"}
                - Tone: <span className="tok-str">Encouraging and optimistic.</span>{"\n"}
                - Teaching approach: <span className="tok-str">Starts from concrete examples, then generalises.</span>{"\n"}
                - Register: <span className="tok-str">somewhat casual, somewhat direct, somewhat warm, somewhat serious</span>{"\n"}
                <span className="tok-comment"># + core values, signature phrases, philosophy and boundaries when provided</span>
              </code>
            </pre>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
