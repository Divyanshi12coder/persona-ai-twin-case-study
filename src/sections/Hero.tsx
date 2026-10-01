import { Button } from "../components/Button";
import { ArrowDown, Github, Pulse } from "../components/Icons";
import { NeuralBackground } from "../components/NeuralBackground";
import { LINKS } from "../data/site";
import { HeroTwin } from "../visuals/HeroTwin";

const CHAIN = ["Human", "Personality", "Memory", "Knowledge", "AI Persona", "Conversation"];

export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <NeuralBackground />
      <div className="hero__grid-bg" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="hero__kicker">
            <span className="live-dot" aria-hidden="true" /> Engineering case study · AI digital doppelganger
          </p>
          <h1 id="hero-title" className="hero__title">
            Persona<span>Twin</span>
          </h1>
          <p className="hero__subtitle">An AI Digital Doppelganger That Learns Who You Are.</p>
          <p className="hero__text">
            PersonaTwin explores how personality, memories, experiences, and knowledge can be represented inside an
            interactive AI system — a mentor that answers from what a person has actually documented, and says so when it
            doesn't know.
          </p>
          <div className="hero__ctas">
            <Button href="#overview">Explore the System</Button>
            <Button href={LINKS.sourceRepo} variant="outline" icon={<Github size={17} />}>View GitHub</Button>
            <Button href={LINKS.liveApi} variant="ghost" icon={<Pulse size={17} />}>Live API</Button>
          </div>
        </div>

        <div className="hero__visual">
          <HeroTwin />
        </div>
      </div>

      <div className="container">
        <ol className="hero__chain" aria-label="How a persona becomes a conversation">
          {CHAIN.map((c, i) => (
            <li key={c} style={{ animationDelay: `${i * 0.6}s` }}>
              <span className="hero__chain-index">{String(i + 1).padStart(2, "0")}</span>
              {c}
            </li>
          ))}
        </ol>
        <a href="#overview" className="hero__scroll">
          <ArrowDown size={16} />
          <span>Scroll to explore</span>
        </a>
      </div>
    </section>
  );
}
