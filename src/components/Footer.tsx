import { LINKS } from "../data/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo size={26} />
          <div>
            <p className="footer__name">PersonaTwin — engineering case study</p>
            <p className="footer__meta">
              Built by <a href={LINKS.author} target="_blank" rel="noopener noreferrer">@Divyanshi12coder</a>. Technical details
              were taken from the PersonaTwin source. Sample conversations are illustrative.
            </p>
          </div>
        </div>
        <ul className="footer__links">
          <li><a href={LINKS.liveApi} target="_blank" rel="noopener noreferrer">Live API</a></li>
          <li><a href={LINKS.apiDocs} target="_blank" rel="noopener noreferrer">OpenAPI docs</a></li>
          <li><a href={LINKS.sourceRepo} target="_blank" rel="noopener noreferrer">Source repository</a></li>
          <li><a href={LINKS.caseStudyRepo} target="_blank" rel="noopener noreferrer">Case study repository</a></li>
          <li><a href="#top">Back to top ↑</a></li>
        </ul>
      </div>
    </footer>
  );
}
