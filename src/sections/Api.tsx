import { useState } from "react";
import { Button } from "../components/Button";
import { CodeBlock } from "../components/CodeBlock";
import { Reveal } from "../components/Reveal";
import { SectionHeader } from "../components/SectionHeader";
import { API_GROUPS, CHAT_REQUEST, CHAT_RESPONSE, ENDPOINT_COUNT } from "../data/api";
import { LINKS } from "../data/site";
import { LiveStatus } from "../visuals/LiveStatus";

export function Api() {
  const [tab, setTab] = useState(API_GROUPS[0].key);
  const group = API_GROUPS.find((g) => g.key === tab)!;

  return (
    <section className="section section--light" aria-labelledby="api-title">
      <div className="container">
        <SectionHeader
          index="08"
          eyebrow="API architecture"
          id="api-title"
          title="A REST API built around private data"
          lead={`${ENDPOINT_COUNT} route handlers under /api, typed with Pydantic and documented with OpenAPI. Errors share one envelope ({"detail": …}); resources owned by someone else return 404, never 403, so IDs can't be probed.`}
        />

        <div className="api-layout">
          <Reveal className="endpoints">
            <div className="endpoints__tabs" role="tablist" aria-label="Endpoint groups">
              {API_GROUPS.map((g) => (
                <button
                  key={g.key}
                  role="tab"
                  id={`api-tab-${g.key}`}
                  aria-selected={g.key === tab}
                  aria-controls="api-panel"
                  tabIndex={g.key === tab ? 0 : -1}
                  className="endpoints__tab"
                  onClick={() => setTab(g.key)}
                  onKeyDown={(e) => {
                    const i = API_GROUPS.findIndex((x) => x.key === tab);
                    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
                    if (!d) return;
                    const next = API_GROUPS[(i + d + API_GROUPS.length) % API_GROUPS.length];
                    setTab(next.key);
                    document.getElementById(`api-tab-${next.key}`)?.focus();
                  }}
                >
                  {g.label}
                </button>
              ))}
            </div>
            <div id="api-panel" role="tabpanel" aria-labelledby={`api-tab-${tab}`} className="endpoints__panel">
              <p className="endpoints__summary">{group.summary}</p>
              <ul className="endpoints__list">
                {group.endpoints.map((e) => (
                  <li key={e.method + e.path}>
                    <span className={`method method--${e.method.toLowerCase()}`}>{e.method}</span>
                    <code className="endpoints__path">{e.path}</code>
                    <span className="endpoints__note">
                      {e.note}
                      {e.auth === false && <span className="endpoints__public">public</span>}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="endpoints__foot">
                Representative selection. Full reference: <a href={LINKS.apiDocs} target="_blank" rel="noopener noreferrer">interactive OpenAPI docs ↗</a>
              </p>
            </div>
          </Reveal>

          <div className="api-side">
            <Reveal delay={80}>
              <LiveStatus />
            </Reveal>
            <Reveal delay={140} className="api-ctas">
              <Button href={LINKS.liveApi} size="sm">Live API</Button>
              <Button href={LINKS.apiDocs} size="sm" variant="outline">OpenAPI docs</Button>
            </Reveal>
          </div>
        </div>

        <div className="api-examples">
          <Reveal>
            <CodeBlock title="Request" code={CHAT_REQUEST} />
          </Reveal>
          <Reveal delay={100}>
            <CodeBlock
              title="ChatResponse (abridged)"
              code={CHAT_RESPONSE}
              caption="Shape from the project's API reference (docs/api.md); field values are illustrative. Requires a bearer token from /api/auth/login."
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
