import { useEffect, useRef, useState } from "react";
import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useReducedMotion";

// Illustrative run built from the project's sample persona data (see docs/api.md and
// the repository screenshots). It demonstrates the pipeline; it is not a real person's words.
const QUESTION = "What would you recommend before I switch careers?";
const ANSWER =
  "I'd test the change with a small, real experiment before jumping, and keep a financial runway while you do. That's what I took from leaving agency life for a product startup [E1]. Name your criteria before comparing options, otherwise the salary number decides for you [E2].";

const STEPS = [
  { step: "understand", detail: "Career · decision" },
  { step: "retrieve", detail: "0 knowledge · 2 experiences" },
  { step: "persona", detail: "direct · encouraging · balanced" },
  { step: "assemble", detail: "2 memories in context" },
  { step: "prompt", detail: "system rules + <memory_context>" },
  { step: "generate", detail: "LLM provider" },
  { step: "validate", detail: "2 citations verified" },
];

const CONTEXT = [
  { label: "E1", type: "Experience", title: "Leaving agency life to join a product startup" },
  { label: "E2", type: "Experience", title: "Choosing between two job offers" },
];

type Phase = "idle" | "typing-q" | "pipeline" | "typing-a" | "done";

function renderAnswer(text: string) {
  return text.split(/(\[[KEC]\d\])/g).map((part, i) =>
    /^\[[KEC]\d\]$/.test(part) ? (
      <span key={i} className="cite">{part.slice(1, -1)}</span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function ConversationDemo() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.35 });
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [q, setQ] = useState("");
  const [a, setA] = useState("");
  const [stepIdx, setStepIdx] = useState(-1);
  const [run, setRun] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (!inView) return;
    const clear = () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = [];
    };
    clear();
    if (reduced) {
      setQ(QUESTION);
      setA(ANSWER);
      setStepIdx(STEPS.length - 1);
      setPhase("done");
      return;
    }
    const at = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms));
    setQ("");
    setA("");
    setStepIdx(-1);
    setPhase("typing-q");
    let t = 300;
    for (let i = 1; i <= QUESTION.length; i++) {
      t += 28;
      at(t, () => setQ(QUESTION.slice(0, i)));
    }
    t += 300;
    at(t, () => setPhase("pipeline"));
    STEPS.forEach((_, i) => {
      t += 420;
      at(t, () => setStepIdx(i));
    });
    t += 350;
    at(t, () => setPhase("typing-a"));
    const words = ANSWER.split(" ");
    for (let i = 1; i <= words.length; i++) {
      t += 45;
      at(t, () => setA(words.slice(0, i).join(" ")));
    }
    at(t + 100, () => setPhase("done"));
    return clear;
  }, [inView, reduced, run]);

  const contextLit = stepIdx >= 1;

  return (
    <div ref={ref} className="convo">
      <div className="convo__chat" aria-label="Illustrative PersonaTwin conversation">
        <div className="convo__chat-head">
          <span className="convo__avatar" aria-hidden="true">MT</span>
          <div>
            <p className="convo__name">Sample mentor</p>
            <p className="convo__mode">Illustrative run · sample persona data</p>
          </div>
          <button
            type="button"
            className="convo__replay"
            onClick={() => setRun((r) => r + 1)}
            disabled={phase !== "done" || reduced}
          >
            Replay
          </button>
        </div>

        <div className="convo__msgs">
          <div className={`bubble bubble--user${q ? " is-on" : ""}`}>
            <span className="bubble__who">User</span>
            <p>
              {q}
              {phase === "typing-q" && <span className="caret" aria-hidden="true" />}
            </p>
          </div>

          {(phase === "pipeline") && (
            <div className="bubble bubble--typing" aria-hidden="true"><i /><i /><i /></div>
          )}

          <div className={`bubble bubble--twin${a ? " is-on" : ""}`}>
            <span className="bubble__who">PersonaTwin</span>
            <p>
              {renderAnswer(a)}
              {phase === "typing-a" && <span className="caret" aria-hidden="true" />}
            </p>
            {phase === "done" && (
              <div className="bubble__meta">
                <span className="badge badge--ok">Grounded in your memories</span>
                <span className="badge">2 memories used</span>
                <span className="badge">How this was made ↓</span>
              </div>
            )}
          </div>
        </div>
        <p className="sr-only">
          Example question: {QUESTION} Example answer: {ANSWER} The answer cites experience E1 and experience E2 and is
          labelled grounded.
        </p>
      </div>

      <div className="convo__side">
        <div className={`convo__context${contextLit ? " is-lit" : ""}`}>
          <p className="convo__panel-title">Retrieved persona context</p>
          {CONTEXT.map((c, i) => (
            <div key={c.label} className="ctx-item" style={{ transitionDelay: `${i * 140}ms` }}>
              <span className="cite">{c.label}</span>
              <div>
                <p className="ctx-item__type">{c.type}</p>
                <p className="ctx-item__title">{c.title}</p>
              </div>
            </div>
          ))}
          <div className="ctx-traits" style={{ transitionDelay: "280ms" }}>
            {["Communication style", "Tone", "Values", "Signature phrase"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>

        <ol className="convo__trace" aria-label="Pipeline trace">
          {STEPS.map((s, i) => (
            <li key={s.step} className={i <= stepIdx ? "is-done" : i === stepIdx + 1 && phase === "pipeline" ? "is-next" : ""}>
              <span className="convo__trace-dot" aria-hidden="true" />
              <code>{s.step}</code>
              <span className="convo__trace-detail">{s.detail}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
