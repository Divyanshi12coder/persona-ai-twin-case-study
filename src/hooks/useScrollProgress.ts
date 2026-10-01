import { useEffect, useRef, useState } from "react";

/** Progress (0–1) of an element travelling through the viewport. rAF-throttled. */
export function useElementProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the element's top hits 75% of the viewport, 1 when its bottom reaches 60%.
      const start = vh * 0.75;
      const end = vh * 0.6;
      const total = rect.height + start - end;
      const p = (start - rect.top) / total;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return [ref, progress] as const;
}

/** Id of the section currently under the navbar. */
export function useScrollSpy(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.boundingClientRect.top);
          else visible.delete(e.target.id);
        }
        const best = ids.find((id) => visible.has(id));
        setActive((prev) => best ?? prev);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}
