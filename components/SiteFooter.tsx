import { SITE } from "../lib/site";

export function SiteFooter() {
  return (
    <footer className="siteFooter">
      <div className="shell footerGrid">
        <div>
          <a className="footerBrand" href="#top">
            Forest Intelligence Explorer
          </a>
          <p>
            Independent research prototype exploring multimodal AI for forest
            monitoring and biodiversity understanding.
          </p>
        </div>

        <nav aria-label="Footer">
          <a href="/disclaimer">Research disclaimer</a>
          <a href="/ethics">Data ethics</a>
          <a href="#research">Public research</a>
          <a href="#sources">Source policy</a>
        </nav>

        <div className="footerMeta">
          <a href={SITE.repositoryUrl} target="_blank" rel="noreferrer">
            Source repository ↗
          </a>
          <span>Public-safe synthetic prototype · 2026</span>
        </div>
      </div>
    </footer>
  );
}
