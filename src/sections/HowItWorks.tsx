import { SectionHeader } from "../components/SectionHeader";
import { PipelineRail } from "../visuals/PipelineRail";

export function HowItWorks() {
  return (
    <section className="section section--light" aria-labelledby="how-title">
      <div className="container container--narrow">
        <SectionHeader
          index="04"
          eyebrow="How PersonaTwin works"
          id="how-title"
          title="Six steps from a person to a persona-aware reply"
          lead="Steps 1–2 happen when the owner builds their twin. Steps 3–6 run on every message inside a single orchestrator, run_pipeline(), and each one is timed into the reply's trace."
        />
        <PipelineRail />
      </div>
    </section>
  );
}
