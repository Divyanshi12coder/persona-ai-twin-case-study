import { useReducedMotion } from "../hooks/useReducedMotion";

/** Head-and-shoulders bust centred on cx. Shared by the human and the twin so they mirror exactly. */
export const bustPath = (cx: number) =>
  `M${cx - 21} 252 C${cx - 19} 276 ${cx - 24} 286 ${cx - 42} 293 C${cx - 92} 306 ${cx - 114} 330 ${cx - 118} 380 L${cx - 120} 430 L${cx + 120} 430 L${cx + 118} 380 C${cx + 114} 330 ${cx + 92} 306 ${cx + 42} 293 C${cx + 24} 286 ${cx + 19} 276 ${cx + 21} 252 Z`;

const HUMAN_X = 150;
const TWIN_X = 450;
const CORE = { x: 300, y: 300 };

// Data streams: human → core, core → twin.
const STREAMS = [
  `M${HUMAN_X + 48} 215 C 240 200, 262 250, ${CORE.x - 24} ${CORE.y - 12}`,
  `M${HUMAN_X + 92} 330 C 230 340, 250 316, ${CORE.x - 26} ${CORE.y + 6}`,
  `M${CORE.x + 24} ${CORE.y - 12} C 338 250, 360 200, ${TWIN_X - 48} 215`,
  `M${CORE.x + 26} ${CORE.y + 6} C 350 316, 370 340, ${TWIN_X - 92} 330`,
];

const LABELS = [
  { text: "PERSONALITY", x: 16, y: 18, d: 0 },
  { text: "MEMORY", x: 70, y: 12, d: 1.2 },
  { text: "KNOWLEDGE", x: 6, y: 80, d: 2.1 },
  { text: "EXPERIENCES", x: 66, y: 84, d: 0.6 },
];

export function HeroTwin() {
  const reduced = useReducedMotion();

  return (
    <figure className="hero-twin" aria-labelledby="hero-twin-caption">
      <svg viewBox="0 0 600 470" className="hero-twin__svg" role="img" aria-labelledby="hero-twin-title">
        <title id="hero-twin-title">
          A human silhouette and its wireframe digital twin, connected through a central AI core by streams of data.
        </title>
        <defs>
          <linearGradient id="ht-human" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#dfe7f7" />
            <stop offset="1" stopColor="#5d6b8c" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="ht-stream" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#7aa7ff" stopOpacity="0.05" />
            <stop offset="0.5" stopColor="#7aa7ff" stopOpacity="0.7" />
            <stop offset="1" stopColor="#8b7bff" stopOpacity="0.1" />
          </linearGradient>
          <radialGradient id="ht-core" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#c9d8ff" />
            <stop offset="0.35" stopColor="#4d8dff" />
            <stop offset="1" stopColor="#4d8dff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ht-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#4d8dff" stopOpacity="0.22" />
            <stop offset="1" stopColor="#4d8dff" stopOpacity="0" />
          </radialGradient>
          <pattern id="ht-dots" width="7" height="7" patternUnits="userSpaceOnUse">
            <circle cx="3.5" cy="3.5" r="1.05" fill="#8fb4ff" />
          </pattern>
          <clipPath id="ht-twin-clip">
            <ellipse cx={TWIN_X} cy="208" rx="43" ry="51" />
            <path d={bustPath(TWIN_X)} />
          </clipPath>
          <linearGradient id="ht-scan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7aa7ff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#9cc0ff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#7aa7ff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ht-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0.7" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="ht-bottom-fade">
            <rect width="600" height="470" fill="url(#ht-fade)" />
          </mask>
        </defs>

        {/* ambient glow behind the core */}
        <circle cx={CORE.x} cy={CORE.y} r="190" fill="url(#ht-glow)" />

        <g mask="url(#ht-bottom-fade)">
          {/* HUMAN */}
          <g className="ht-human">
            <ellipse cx={HUMAN_X} cy="208" rx="43" ry="51" fill="url(#ht-human)" />
            <path d={bustPath(HUMAN_X)} fill="url(#ht-human)" />
          </g>

          {/* DIGITAL TWIN — dot matrix + contour lines + scanline, clipped to the same bust */}
          <g className="ht-twin">
            <g clipPath="url(#ht-twin-clip)">
              <rect x={TWIN_X - 130} y="150" width="260" height="290" fill="url(#ht-dots)" opacity="0.75" />
              {Array.from({ length: 13 }, (_, i) => (
                <path
                  key={i}
                  d={`M${TWIN_X - 130} ${168 + i * 21} Q ${TWIN_X} ${158 + i * 21 + (i % 2 ? 8 : -4)} ${TWIN_X + 130} ${168 + i * 21}`}
                  stroke="#7aa7ff"
                  strokeOpacity="0.28"
                  fill="none"
                />
              ))}
              {!reduced && (
                <rect x={TWIN_X - 130} y="150" width="260" height="46" fill="url(#ht-scan)">
                  <animate attributeName="y" values="140;420;140" dur="7s" repeatCount="indefinite" />
                </rect>
              )}
            </g>
            <ellipse cx={TWIN_X} cy="208" rx="43" ry="51" fill="none" stroke="#8fb4ff" strokeOpacity="0.7" strokeDasharray="3 4" />
            <path d={bustPath(TWIN_X)} fill="none" stroke="#8fb4ff" strokeOpacity="0.55" strokeDasharray="3 4" />
            {/* mesh vertices */}
            {[
              [TWIN_X - 22, 190], [TWIN_X + 20, 186], [TWIN_X, 214], [TWIN_X - 16, 236], [TWIN_X + 18, 238],
              [TWIN_X - 70, 330], [TWIN_X + 70, 330], [TWIN_X, 352], [TWIN_X - 40, 396], [TWIN_X + 44, 398],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="2.4" fill="#cfe0ff" className="ht-vertex" style={{ animationDelay: `${i * 0.35}s` }} />
            ))}
            <path
              d={`M${TWIN_X - 22} 190 L${TWIN_X} 214 L${TWIN_X + 20} 186 M${TWIN_X} 214 L${TWIN_X - 16} 236 L${TWIN_X + 18} 238 L${TWIN_X} 214 M${TWIN_X - 70} 330 L${TWIN_X} 352 L${TWIN_X + 70} 330 M${TWIN_X} 352 L${TWIN_X - 40} 396 L${TWIN_X + 44} 398 L${TWIN_X} 352`}
              stroke="#a9c4ff"
              strokeOpacity="0.4"
              fill="none"
            />
          </g>
        </g>

        {/* data streams */}
        {STREAMS.map((d, i) => (
          <g key={i}>
            <path d={d} stroke="url(#ht-stream)" strokeWidth="1.3" fill="none" className="ht-stream" />
            {!reduced &&
              [0, 1].map((k) => (
                <circle key={k} r={k ? 1.8 : 2.6} fill={i < 2 ? "#cfe0ff" : "#b7a9ff"}>
                  <animateMotion dur={`${2.6 + i * 0.35}s`} begin={`-${k * 1.3 + i * 0.4}s`} repeatCount="indefinite" path={d} />
                  <animate attributeName="opacity" values="0;1;1;0" dur={`${2.6 + i * 0.35}s`} begin={`-${k * 1.3 + i * 0.4}s`} repeatCount="indefinite" />
                </circle>
              ))}
          </g>
        ))}

        {/* AI core with orbital rings */}
        <g className="ht-core">
          <circle cx={CORE.x} cy={CORE.y} r="40" fill="url(#ht-core)" opacity="0.55" />
          <circle cx={CORE.x} cy={CORE.y} r="12" fill="#e9f0ff" />
          <circle cx={CORE.x} cy={CORE.y} r="20" fill="none" stroke="#7aa7ff" strokeOpacity="0.8" />
          <g className="ht-orbit ht-orbit--a">
            <ellipse cx={CORE.x} cy={CORE.y} rx="58" ry="20" fill="none" stroke="#7aa7ff" strokeOpacity="0.45" />
            <circle cx={CORE.x + 58} cy={CORE.y} r="3" fill="#9cc0ff" />
          </g>
          <g className="ht-orbit ht-orbit--b">
            <ellipse cx={CORE.x} cy={CORE.y} rx="74" ry="26" fill="none" stroke="#8b7bff" strokeOpacity="0.32" />
            <circle cx={CORE.x - 74} cy={CORE.y} r="2.4" fill="#b7a9ff" />
          </g>
        </g>

        {/* layer captions */}
        <g className="ht-captions" fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="2" textAnchor="middle">
          <text x={HUMAN_X} y="456" fill="#9aa6c0">HUMAN</text>
          <text x={CORE.x} y={CORE.y + 64} fill="#7aa7ff">AI CORE</text>
          <text x={TWIN_X} y="456" fill="#9aa6c0">DIGITAL TWIN</text>
        </g>
      </svg>

      {/* floating layer labels (HTML so they stay crisp at any size) */}
      {LABELS.map((l) => (
        <span
          key={l.text}
          className="hero-twin__label"
          style={{ left: `${l.x}%`, top: `${l.y}%`, animationDelay: `${l.d}s` }}
          aria-hidden="true"
        >
          <i />
          {l.text}
        </span>
      ))}
      <figcaption id="hero-twin-caption" className="sr-only">
        PersonaTwin turns a person's documented personality, memory, knowledge and experiences into a conversational digital twin.
      </figcaption>
    </figure>
  );
}
