import { useEffect, useMemo, useRef, useState } from "react";
import { TRANSFORM_STAGES } from "../data/content";

const N = 64;
const W = 400;
const H = 400;

// Deterministic PRNG so the layout is identical on every render and in screenshots.
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

type Pt = [number, number];

function insideBust(x: number, y: number) {
  const cx = 200;
  const head = ((x - cx) / 52) ** 2 + ((y - 130) / 62) ** 2 <= 1;
  const neck = Math.abs(x - cx) < 22 && y > 180 && y < 228;
  // shoulders: widening trapezoid with rounded top
  const t = (y - 222) / 120;
  const half = 40 + Math.min(1, Math.max(0, t)) * 110;
  const shoulders = y >= 222 && y <= 345 && Math.abs(x - cx) <= half;
  return head || neck || shoulders;
}

function layouts(): Pt[][] {
  const r = rng(7);
  // 0 raw: scattered
  const raw: Pt[] = Array.from({ length: N }, () => [20 + r() * 360, 20 + r() * 360]);

  // 1 personality: 6 clusters on a hexagon (six persona traits)
  const personality: Pt[] = Array.from({ length: N }, (_, i) => {
    const c = i % 6;
    const a = (c / 6) * Math.PI * 2 - Math.PI / 2;
    const k = Math.floor(i / 6);
    const ring = 10 + (k % 3) * 9;
    const a2 = k * 2.1;
    return [200 + Math.cos(a) * 120 + Math.cos(a2) * ring, 200 + Math.sin(a) * 120 + Math.sin(a2) * ring];
  });

  // 2 memory: 5 linked memory stores (pentagon) + a core
  const memory: Pt[] = Array.from({ length: N }, (_, i) => {
    if (i < 8) {
      const a = (i / 8) * Math.PI * 2;
      return [200 + Math.cos(a) * 16, 200 + Math.sin(a) * 16];
    }
    const c = i % 5;
    const a = (c / 5) * Math.PI * 2 - Math.PI / 2;
    const k = Math.floor(i / 5);
    const ring = 6 + (k % 3) * 8;
    return [200 + Math.cos(a) * 140 + Math.cos(k * 1.7) * ring, 200 + Math.sin(a) * 140 + Math.sin(k * 1.7) * ring];
  });

  // 3 knowledge: chunk grid (8 x 8)
  const knowledge: Pt[] = Array.from({ length: N }, (_, i) => [88 + (i % 8) * 32, 88 + Math.floor(i / 8) * 32]);

  // 4 persona model: three concentric rings
  const model: Pt[] = Array.from({ length: N }, (_, i) => {
    const ring = i < 12 ? 50 : i < 30 ? 100 : 150;
    const count = i < 12 ? 12 : i < 30 ? 18 : 34;
    const idx = i < 12 ? i : i < 30 ? i - 12 : i - 30;
    const a = (idx / count) * Math.PI * 2;
    return [200 + Math.cos(a) * ring, 200 + Math.sin(a) * ring];
  });

  // 5 twin: points sampled inside a head-and-shoulders bust
  const twin: Pt[] = [];
  const r2 = rng(11);
  while (twin.length < N) {
    const x = 40 + r2() * 320;
    const y = 60 + r2() * 290;
    if (insideBust(x, y)) twin.push([x, y]);
  }

  // 6 conversation: two speech bubbles
  const conversation: Pt[] = Array.from({ length: N }, (_, i) => {
    const left = i < 30;
    const idx = left ? i : i - 30;
    const count = left ? 30 : 34;
    const t = idx / count;
    const [cx, cy, rx, ry] = left ? [150, 140, 110, 52] : [250, 270, 120, 56];
    const a = t * Math.PI * 2;
    return [cx + Math.cos(a) * rx, cy + Math.sin(a) * ry];
  });

  return [raw, personality, memory, knowledge, model, twin, conversation];
}

export function Transformation() {
  const L = useMemo(layouts, []);
  const [stage, setStage] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setStage(Number((e.target as HTMLElement).dataset.stage));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const pts = L[stage];
  const s = TRANSFORM_STAGES[stage];

  return (
    <div className="transform">
      <div className="transform__sticky">
        <div className="transform__stage" aria-hidden="true">
          <svg viewBox={`0 0 ${W} ${H}`} className="transform__svg">
            <defs>
              <radialGradient id="tf-glow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#4d8dff" stopOpacity="0.18" />
                <stop offset="1" stopColor="#4d8dff" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="200" cy="200" r="190" fill="url(#tf-glow)" />

            {/* stage-specific scaffolding */}
            <g className={`tf-deco${stage === 2 ? " is-on" : ""}`}>
              {Array.from({ length: 5 }, (_, c) => {
                const a = (c / 5) * Math.PI * 2 - Math.PI / 2;
                const b = ((c + 1) / 5) * Math.PI * 2 - Math.PI / 2;
                return (
                  <g key={c}>
                    <line x1="200" y1="200" x2={200 + Math.cos(a) * 140} y2={200 + Math.sin(a) * 140} />
                    <line x1={200 + Math.cos(a) * 140} y1={200 + Math.sin(a) * 140} x2={200 + Math.cos(b) * 140} y2={200 + Math.sin(b) * 140} className="faint" />
                  </g>
                );
              })}
            </g>
            <g className={`tf-deco${stage === 3 ? " is-on" : ""}`}>
              {Array.from({ length: 4 }, (_, i) => (
                <rect key={i} x={74 + (i % 2) * 128} y={74 + Math.floor(i / 2) * 128} width="124" height="124" rx="10" className="faint" />
              ))}
            </g>
            <g className={`tf-deco${stage === 4 ? " is-on" : ""}`}>
              {[50, 100, 150].map((rr) => (
                <circle key={rr} cx="200" cy="200" r={rr} />
              ))}
            </g>
            <g className={`tf-deco${stage === 5 ? " is-on" : ""}`}>
              <ellipse cx="200" cy="130" rx="56" ry="66" />
              <path d="M178 192 C178 214 172 222 156 228 C100 244 62 268 54 345 M222 192 C222 214 228 222 244 228 C300 244 338 268 346 345" />
            </g>
            <g className={`tf-deco${stage === 6 ? " is-on" : ""}`}>
              <path d="M70 175 L52 210 L98 186" />
              <path d="M330 310 L352 344 L300 322" />
            </g>

            {pts.map(([x, y], i) => (
              <circle
                key={i}
                r={stage === 0 ? 2.2 : 2.8}
                className={`tf-dot tf-dot--${i % 4}`}
                style={{ transform: `translate(${x}px, ${y}px)`, transitionDelay: `${(i % 16) * 14}ms` }}
              />
            ))}
          </svg>
          <div className="transform__readout">
            <span className="transform__count">{String(stage + 1).padStart(2, "0")} / {String(TRANSFORM_STAGES.length).padStart(2, "0")}</span>
            <span className="transform__label">{s.label}</span>
            <code>{s.code}</code>
          </div>
        </div>
      </div>

      <ol className="transform__steps">
        {TRANSFORM_STAGES.map((st, i) => (
          <li
            key={st.key}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            data-stage={i}
            className={`transform__step${stage === i ? " is-active" : ""}${stage > i ? " is-past" : ""}`}
          >
            <span className="transform__num">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3>{st.label}</h3>
              <p>{st.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
