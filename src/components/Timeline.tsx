import { useInView } from "../hooks/useInView";

type Item = { phase: string; body: string; future?: boolean };

/** Vertical on mobile, alternating on desktop. The spine draws as it scrolls into view. */
export function Timeline({ items }: { items: Item[] }) {
  const [ref, inView] = useInView<HTMLOListElement>({ threshold: 0.1 });
  return (
    <ol ref={ref} className={`timeline${inView ? " is-visible" : ""}`}>
      {items.map((it, i) => (
        <li
          key={it.phase}
          className={`timeline__item${it.future ? " timeline__item--future" : ""}`}
          style={{ transitionDelay: `${150 + i * 110}ms` }}
        >
          <span className="timeline__node" aria-hidden="true" />
          <div className="timeline__card">
            <span className="timeline__step">{it.future ? "Next" : `Phase ${String(i + 1).padStart(2, "0")}`}</span>
            <h3>{it.phase}</h3>
            <p>{it.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
