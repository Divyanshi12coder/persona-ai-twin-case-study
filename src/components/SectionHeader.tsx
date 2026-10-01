import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  index?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  id?: string;
};

export function SectionHeader({ eyebrow, index, title, lead, align = "left", id }: Props) {
  return (
    <Reveal className={`section-header section-header--${align}`}>
      <p className="eyebrow">
        {index && <span className="eyebrow__index">{index}</span>}
        {eyebrow}
      </p>
      <h2 id={id} className="section-title">{title}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </Reveal>
  );
}
