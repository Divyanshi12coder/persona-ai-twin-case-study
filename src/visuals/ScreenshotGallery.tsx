import { useRef, useState, type KeyboardEvent } from "react";

const base = import.meta.env.BASE_URL;

// Captured from the running PersonaTwin app in demo mode with sample data (no LLM key).
const SHOTS = [
  { key: "chat", label: "Mentor chat", file: "mentor-chat.webp", alt: "Mentor chat: a grounded answer citing two recorded experiences, with a 'Grounded in your memories' badge, sources and pipeline trace controls." },
  { key: "memory", label: "Memory Inspector", file: "memory-vault.webp", alt: "Memory Inspector listing knowledge, experiences, preferences and conversation memories with a semantic recall test and relevance scores." },
  { key: "personality", label: "Personality", file: "personality.webp", alt: "Personality profile: mentor name, bio, mentoring domains and expertise, with a radar preview of the four register sliders and a note that it is a communication profile, not a psychological assessment." },
  { key: "experiences", label: "Experiences", file: "experiences.webp", alt: "Experiences journal of structured episodes with situation, lesson and importance." },
  { key: "knowledge", label: "Knowledge Vault", file: "knowledge-vault.webp", alt: "Knowledge vault with notes, uploaded documents and imported pages, filterable by category and tag." },
  { key: "insights", label: "Insights", file: "insights.webp", alt: "Insights dashboard with topic, trend, memory growth and grounding charts." },
];

export function ScreenshotGallery() {
  const [idx, setIdx] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const shot = SHOTS[idx];

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (idx + delta + SHOTS.length) % SHOTS.length;
    setIdx(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="gallery">
      <div className="gallery__tabs" role="tablist" aria-label="Application screens" onKeyDown={onKey}>
        {SHOTS.map((s, i) => (
          <button
            key={s.key}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`shot-tab-${s.key}`}
            aria-selected={i === idx}
            aria-controls="shot-panel"
            tabIndex={i === idx ? 0 : -1}
            className="gallery__tab"
            onClick={() => setIdx(i)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div id="shot-panel" role="tabpanel" aria-labelledby={`shot-tab-${shot.key}`} className="gallery__frame">
        <div className="gallery__chrome" aria-hidden="true">
          <i /><i /><i />
          <span>PersonaTwin · {shot.label}</span>
        </div>
        <img
          key={shot.file}
          src={`${base}assets/screenshots/${shot.file}`}
          alt={shot.alt}
          width={1440}
          height={900}
          loading="lazy"
          decoding="async"
          className="gallery__img"
        />
      </div>
      <p className="gallery__note">Captured from the running application in demo mode with sample data — no LLM key configured.</p>
    </div>
  );
}
