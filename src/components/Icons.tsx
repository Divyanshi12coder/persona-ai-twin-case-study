import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

const base = (size = 18): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
});

export const ArrowRight = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ArrowUpRight = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>
);
export const ArrowDown = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M12 5v14M6 13l6 6 6-6" /></svg>
);
export const Menu = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M4 7h16M4 12h16M4 17h10" /></svg>
);
export const Close = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const Pulse = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M3 12h4l2-6 4 12 2-6h6" /></svg>
);
export const Check = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="m5 12 4.5 4.5L19 7" /></svg>
);
export const Github = ({ size = 18, ...p }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);

/** Small line icons used on cards. */
export const Glyph = ({ name, size = 22 }: { name: string; size?: number }) => {
  const b = base(size);
  switch (name) {
    case "personality":
    case "user":
      return <svg {...b}><circle cx="12" cy="8" r="3.5" /><path d="M5 20c1.2-3.6 3.8-5.5 7-5.5s5.8 1.9 7 5.5" /></svg>;
    case "memory":
      return <svg {...b}><circle cx="12" cy="12" r="3" /><circle cx="5" cy="6" r="1.6" /><circle cx="19" cy="6" r="1.6" /><circle cx="5" cy="18" r="1.6" /><circle cx="19" cy="18" r="1.6" /><path d="m6.3 7.1 3.4 3M17.7 7.1l-3.4 3M6.3 16.9l3.4-3M17.7 16.9l-3.4-3" /></svg>;
    case "knowledge":
      return <svg {...b}><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5ZM20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5Z" /></svg>;
    case "experiences":
      return <svg {...b}><path d="M12 3v3M12 18v3M4.2 7.5l2.6 1.5M17.2 15l2.6 1.5M4.2 16.5l2.6-1.5M17.2 9l2.6-1.5" /><circle cx="12" cy="12" r="3.2" /></svg>;
    case "shield":
      return <svg {...b}><path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6Z" /><path d="m9 12 2 2 4-4" /></svg>;
    case "eye":
      return <svg {...b}><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="2.6" /></svg>;
    case "lock":
      return <svg {...b}><rect x="5" y="10.5" width="14" height="9.5" rx="2" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" /></svg>;
    case "doc":
      return <svg {...b}><path d="M7 3h7l4 4v14H7Z" /><path d="M14 3v4h4M10 12h5M10 16h5" /></svg>;
    case "spark":
      return <svg {...b}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" /></svg>;
    case "layers":
      return <svg {...b}><path d="m12 3 9 5-9 5-9-5Z" /><path d="m3 13 9 5 9-5" /></svg>;
    case "route":
      return <svg {...b}><circle cx="6" cy="18" r="2.2" /><circle cx="18" cy="6" r="2.2" /><path d="M8 18h6a4 4 0 0 0 0-8h-4a4 4 0 0 1 0-8h6" /></svg>;
    default:
      return <svg {...b}><circle cx="12" cy="12" r="8" /></svg>;
  }
};
