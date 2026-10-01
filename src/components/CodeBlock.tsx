import { Fragment } from "react";

const TOKEN_RE = /("(?:[^"\\]|\\.)*")(\s*:)?|\b(true|false|null)\b|\b(\d+(?:\.\d+)?)\b|^(GET|POST|PUT|PATCH|DELETE)\b|(\/\/.*$)/g;

/** Tiny dependency-free highlighter for the JSON/HTTP snippets on this page. */
function highlight(line: string) {
  const parts: { t: string; c?: string }[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  TOKEN_RE.lastIndex = 0;
  while ((m = TOKEN_RE.exec(line))) {
    if (m.index > last) parts.push({ t: line.slice(last, m.index) });
    if (m[1]) {
      parts.push({ t: m[1], c: m[2] ? "tok-key" : "tok-str" });
      if (m[2]) parts.push({ t: m[2] });
    } else if (m[3]) parts.push({ t: m[3], c: "tok-kw" });
    else if (m[4]) parts.push({ t: m[4], c: "tok-num" });
    else if (m[5]) parts.push({ t: m[5], c: "tok-method" });
    else if (m[6]) parts.push({ t: m[6], c: "tok-comment" });
    last = TOKEN_RE.lastIndex;
  }
  if (last < line.length) parts.push({ t: line.slice(last) });
  return parts;
}

export function CodeBlock({ code, title, caption }: { code: string; title: string; caption?: string }) {
  return (
    <figure className="code">
      <figcaption className="code__bar">
        <span className="code__dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="code__title">{title}</span>
      </figcaption>
      <pre tabIndex={0} aria-label={title}>
        <code>
          {code.split("\n").map((line, li) => (
            <Fragment key={li}>
              {highlight(line).map((p, pi) =>
                p.c ? <span key={pi} className={p.c}>{p.t}</span> : <Fragment key={pi}>{p.t}</Fragment>,
              )}
              {"\n"}
            </Fragment>
          ))}
        </code>
      </pre>
      {caption && <p className="code__caption">{caption}</p>}
    </figure>
  );
}
