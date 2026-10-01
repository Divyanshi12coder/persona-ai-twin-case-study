import { Button } from "../components/Button";
import { Github, Pulse } from "../components/Icons";
import { Reveal } from "../components/Reveal";
import { LINKS } from "../data/site";

export function FinalCTA() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="cta__glow" aria-hidden="true" />
      <div className="container cta__inner">
        <Reveal variant="scale">
          <p className="eyebrow eyebrow--center">PersonaTwin</p>
          <h2 id="cta-title" className="cta__title">
            Build an AI that doesn't just know answers — <span className="grad">it knows the context behind them.</span>
          </h2>
          <div className="cta__buttons">
            <Button href={LINKS.liveApi} icon={<Pulse size={17} />}>Live API</Button>
            <Button href={LINKS.sourceRepo} variant="outline" icon={<Github size={17} />}>GitHub</Button>
            <Button href={LINKS.caseStudyRepo} variant="ghost">Case Study</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
