import { useInView } from "../hooks/useInView";

type Variant = "line" | "nodes" | "grid";

/** Section transitions — a line that expands, a short neural chain, or a fading grid band. */
export function Divider({ variant = "line", tone = "dark" }: { variant?: Variant; tone?: "dark" | "light" }) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.5 });
  return (
    <div ref={ref} className={`divider divider--${variant} divider--${tone}${inView ? " is-visible" : ""}`} aria-hidden="true">
      {variant === "nodes" ? (
        <svg viewBox="0 0 600 24" preserveAspectRatio="none">
          <path className="divider__path" d="M0 12 H220 L240 4 L260 20 L280 12 H600" />
          {[220, 260, 300, 340, 380].map((cx) => (
            <circle key={cx} cx={cx} cy={12} r={2.5} />
          ))}
        </svg>
      ) : (
        <span className="divider__line" />
      )}
    </div>
  );
}
