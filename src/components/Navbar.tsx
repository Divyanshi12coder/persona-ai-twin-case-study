import { useEffect, useRef, useState } from "react";
import { LINKS, NAV } from "../data/site";
import { useScrollSpy } from "../hooks/useScrollProgress";
import { Close, Github, Menu, Pulse } from "./Icons";
import { Logo } from "./Logo";

const NAV_IDS = NAV.map((n) => n.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(NAV_IDS);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock scroll, close on Escape, move focus into the panel.
  useEffect(() => {
    if (!open) return;
    document.body.classList.add("menu-open");
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 1080px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <header className={`nav${scrolled ? " nav--scrolled" : ""}${open ? " nav--open" : ""}`}>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="nav__inner container">
        <a className="nav__brand" href="#top" aria-label="PersonaTwin case study — back to top">
          <Logo />
          <span>Persona<span className="nav__brand-accent">Twin</span></span>
        </a>

        <nav className="nav__links" aria-label="Sections">
          <ul>
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} aria-current={active === n.id ? "location" : undefined}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__actions">
          <a className="nav__btn nav__btn--ghost" href={LINKS.sourceRepo} target="_blank" rel="noopener noreferrer">
            <Github size={16} />
            <span>GitHub</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a className="nav__btn nav__btn--live" href={LINKS.liveApi} target="_blank" rel="noopener noreferrer">
            <span className="live-dot" aria-hidden="true" />
            <span>Live API</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <button
            ref={toggleRef}
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <Close size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" ref={menuRef} className="mobile-menu" hidden={!open}>
        <nav aria-label="Sections (mobile)">
          <ol>
            {NAV.map((n, i) => (
              <li key={n.id} style={{ transitionDelay: `${60 + i * 35}ms` }}>
                <a href={`#${n.id}`} onClick={() => setOpen(false)} aria-current={active === n.id ? "location" : undefined}>
                  <span className="mobile-menu__num">{String(i + 1).padStart(2, "0")}</span>
                  {n.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="mobile-menu__ctas">
          <a className="btn btn--primary btn--md" href={LINKS.liveApi} target="_blank" rel="noopener noreferrer">
            <Pulse size={16} /> <span>Live API</span>
          </a>
          <a className="btn btn--outline btn--md" href={LINKS.sourceRepo} target="_blank" rel="noopener noreferrer">
            <Github size={16} /> <span>View GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
