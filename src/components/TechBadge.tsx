import type { Tech } from "../data/tech";

export function TechBadge({ tech, tone = "dark" }: { tech: Tech; tone?: "dark" | "light" }) {
  return (
    <span className={`tech-badge tech-badge--${tone}`}>
      {tech.icon ? (
        <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" focusable="false" className="tech-badge__logo">
          <path d={tech.icon.path} />
        </svg>
      ) : (
        <span className="tech-badge__dot" aria-hidden="true" />
      )}
      <span className="tech-badge__name">{tech.name}</span>
      {tech.version && <span className="tech-badge__ver">{tech.version}</span>}
      {tech.note && <span className="tech-badge__note">{tech.note}</span>}
    </span>
  );
}
