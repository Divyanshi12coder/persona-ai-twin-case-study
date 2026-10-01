import { SectionHeader } from "../components/SectionHeader";
import { Timeline } from "../components/Timeline";
import { TIMELINE } from "../data/content";

export function Evolution() {
  return (
    <section className="section section--dark" aria-labelledby="evo-title">
      <div className="container">
        <SectionHeader
          index="16"
          eyebrow="Project evolution"
          id="evo-title"
          title="How the system came together"
          lead="Phases of the build, in dependency order. They describe what was built, not calendar dates."
          align="center"
        />
        <Timeline items={TIMELINE} />
      </div>
    </section>
  );
}
