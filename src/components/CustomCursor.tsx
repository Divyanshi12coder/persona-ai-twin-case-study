import { useEffect, useRef } from "react";
import { useMediaQuery, useReducedMotion } from "../hooks/useReducedMotion";

const INTERACTIVE = "a, button, [role='tab'], [data-interactive], .card, summary";

/**
 * Desktop-only cursor: a small dot plus a trailing ring that grows over
 * interactive elements. Buttons marked data-magnetic drift slightly toward it.
 * Disabled for touch devices and reduced-motion users; the native cursor stays visible.
 */
export function CustomCursor() {
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useReducedMotion();
  const enabled = finePointer && !reduced;
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");
    let x = -100, y = -100, rx = -100, ry = -100;
    let frame = 0;
    let magnet: HTMLElement | null = null;

    const loop = () => {
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = e.target as Element | null;
      const hit = target?.closest?.(INTERACTIVE);
      ringRef.current?.classList.toggle("is-active", Boolean(hit));
      dotRef.current?.classList.add("is-visible");
      ringRef.current?.classList.add("is-visible");

      const m = target?.closest?.("[data-magnetic]") as HTMLElement | null;
      if (magnet && magnet !== m) magnet.style.transform = "";
      magnet = m;
      if (m) {
        const r = m.getBoundingClientRect();
        const dx = (x - (r.left + r.width / 2)) * 0.12;
        const dy = (y - (r.top + r.height / 2)) * 0.2;
        m.style.transform = `translate(${dx}px, ${dy}px)`;
      }
    };
    const onLeave = () => {
      dotRef.current?.classList.remove("is-visible");
      ringRef.current?.classList.remove("is-visible");
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
      if (magnet) magnet.style.transform = "";
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
