import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "./Icons";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline";
  icon?: ReactNode;
  external?: boolean;
  size?: "md" | "sm";
};

export function Button({ href, children, variant = "primary", icon, external, size = "md" }: Props) {
  const ext = external ?? /^https?:/.test(href);
  return (
    <a
      className={`btn btn--${variant} btn--${size}`}
      href={href}
      {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      data-magnetic
    >
      {icon && <span className="btn__icon">{icon}</span>}
      <span>{children}</span>
      <span className="btn__arrow">{ext ? <ArrowUpRight size={16} /> : <ArrowRight size={16} />}</span>
      {ext && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
