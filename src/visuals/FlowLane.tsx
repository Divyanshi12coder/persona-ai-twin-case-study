import { useInView } from "../hooks/useInView";

export type FlowItem = { label: string; sub?: string; accent?: boolean };

type Props = {
  items: FlowItem[];
  tone?: "muted" | "accent";
  title?: string;
  caption?: string;
  surface?: "dark" | "light";
  /** stack vertically on all screen sizes */
  vertical?: boolean;
};

/**
 * Horizontal chain of steps joined by animated connectors (vertical on small screens).
 * Steps appear one by one and a data particle travels along every connector.
 */
export function FlowLane({ items, tone = "accent", title, caption, surface = "dark", vertical }: Props) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  return (
    <div ref={ref} className={`flow flow--${tone} flow--${surface}${vertical ? " flow--vertical" : ""}${inView ? " is-visible" : ""}`}>
      {title && <p className="flow__title">{title}</p>}
      <ol className="flow__list">
        {items.map((it, i) => (
          <li key={i} className="flow__step" style={{ transitionDelay: `${i * 110}ms` }}>
            <div className={`flow__node${it.accent ? " flow__node--accent" : ""}`}>
              <span className="flow__label">{it.label}</span>
              {it.sub && <span className="flow__sub">{it.sub}</span>}
            </div>
            {i < items.length - 1 && (
              <span className="flow__link" aria-hidden="true">
                <span className="flow__packet" style={{ animationDelay: `${i * 0.25}s` }} />
              </span>
            )}
          </li>
        ))}
      </ol>
      {caption && <p className="flow__caption">{caption}</p>}
    </div>
  );
}
