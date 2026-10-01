import type { ReactNode } from "react";
import { Glyph } from "./Icons";

type Props = {
  title: string;
  icon?: string;
  children: ReactNode;
  tag?: string;
  tone?: "dark" | "light";
  className?: string;
};

export function FeatureCard({ title, icon, children, tag, tone = "dark", className = "" }: Props) {
  return (
    <article className={`card card--${tone}${className ? ` ${className}` : ""}`}>
      <div className="card__head">
        {icon && (
          <span className="card__icon">
            <Glyph name={icon} />
          </span>
        )}
        {tag && <span className="card__tag">{tag}</span>}
      </div>
      <h3 className="card__title">{title}</h3>
      <div className="card__body">{children}</div>
    </article>
  );
}
