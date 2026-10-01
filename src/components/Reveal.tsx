import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "../hooks/useInView";

type Props = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  variant?: "up" | "scale" | "fade";
  style?: CSSProperties;
};

/** Fades/translates its children in once, the first time they scroll into view. */
export function Reveal({ children, as: Tag = "div", delay = 0, className = "", variant = "up", style }: Props) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.12 });
  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant}${inView ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
    >
      {children}
    </Tag>
  );
}
