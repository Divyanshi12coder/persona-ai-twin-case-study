import { TECH_LAYERS } from "../data/tech";
import { TechBadge } from "../components/TechBadge";
import { useInView } from "../hooks/useInView";

/** Layered technology map — each layer slides into place, connected top to bottom. */
export function TechLayers() {
  const [ref, inView] = useInView<HTMLOListElement>({ threshold: 0.1 });
  return (
    <ol ref={ref} className={`layers${inView ? " is-visible" : ""}`}>
      {TECH_LAYERS.map((l, i) => (
        <li key={l.key} className={`layer layer--${l.key}`} style={{ transitionDelay: `${i * 120}ms` }}>
          <div className="layer__meta">
            <span className="layer__index">L{i + 1}</span>
            <div>
              <h3 className="layer__name">{l.layer}</h3>
              <p className="layer__role">{l.role}</p>
            </div>
          </div>
          <ul className="layer__badges">
            {l.items.map((t) => (
              <li key={t.name}>
                <TechBadge tech={t} tone="light" />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
