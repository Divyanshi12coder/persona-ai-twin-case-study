import { useEffect, useState } from "react";
import { HEALTH_SNAPSHOT, LINKS } from "../data/site";

type State =
  | { kind: "loading" }
  | { kind: "live"; body: unknown }
  | { kind: "snapshot"; reason: string };

/**
 * Tries GET /api/health from the browser. The API's CORS allow-list only includes the app's own
 * frontend, so from GitHub Pages this usually falls back to a dated snapshot — clearly labelled.
 */
export function LiveStatus() {
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    const ctrl = new AbortController();
    const timer = window.setTimeout(() => ctrl.abort(), 9000);
    fetch(LINKS.apiHealth, { signal: ctrl.signal, mode: "cors" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((body) => setState({ kind: "live", body }))
      .catch((err: Error) =>
        setState({
          kind: "snapshot",
          reason:
            err.name === "AbortError"
              ? "The free Render instance may be waking up."
              : "The browser couldn't read the API from this origin (CORS) or it is asleep.",
        }),
      )
      .finally(() => window.clearTimeout(timer));
    return () => {
      ctrl.abort();
      window.clearTimeout(timer);
    };
  }, []);

  const body = state.kind === "live" ? state.body : HEALTH_SNAPSHOT.body;
  const label =
    state.kind === "loading" ? "Checking…" : state.kind === "live" ? "Live response" : `Snapshot · ${HEALTH_SNAPSHOT.capturedOn}`;

  return (
    <figure className="status">
      <figcaption className="status__head">
        <span className={`status__pill status__pill--${state.kind}`}>
          <span className="live-dot" aria-hidden="true" />
          {label}
        </span>
        <code>GET /api/health</code>
      </figcaption>
      <pre tabIndex={0} aria-label="Health endpoint response">
        <code>{JSON.stringify(body, null, 2)}</code>
      </pre>
      <p className="status__note">
        {state.kind === "snapshot" && <>{state.reason} Showing the response captured with curl. </>}
        <a href={LINKS.apiHealth} target="_blank" rel="noopener noreferrer">Open the live endpoint ↗</a>
      </p>
    </figure>
  );
}
