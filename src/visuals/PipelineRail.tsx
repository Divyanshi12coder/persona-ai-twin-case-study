import { PIPELINE_STEPS } from "../data/content";
import { useElementProgress } from "../hooks/useScrollProgress";

/** Six-step pipeline whose rail fills as the reader scrolls; each step lights up as the rail reaches it. */
export function PipelineRail() {
  const [ref, progress] = useElementProgress<HTMLOListElement>();
  const reached = Math.floor(progress * PIPELINE_STEPS.length + 0.35);

  return (
    <ol ref={ref} className="rail" style={{ ["--rail" as string]: progress }}>
      <span className="rail__track" aria-hidden="true">
        <span className="rail__fill" />
        <span className="rail__spark" />
      </span>
      {PIPELINE_STEPS.map((s, i) => (
        <li key={s.n} className={`rail__step${i < reached ? " is-reached" : ""}`}>
          <span className="rail__marker" aria-hidden="true">{s.n}</span>
          <div className="rail__card">
            <div className="rail__head">
              <h3>
                <span className="sr-only">Step {s.n}: </span>
                {s.title}
              </h3>
              <code>{s.code}</code>
            </div>
            <p>{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
