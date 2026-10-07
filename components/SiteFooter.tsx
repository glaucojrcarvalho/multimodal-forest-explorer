import { FOR_AGE } from "../data/for-age";

export function SiteFooter() {
  return (
    <footer className="siteFooter">
      <div className="shell footerGrid">
        <div>
          <a className="footerBrand" href="#top">
            Forest Intelligence Explorer
          </a>
          <p>
            Independent research prototype for real forest point clouds,
            source-backed AI research tasks, and reproducible tree-level analysis.
          </p>
        </div>

        <nav aria-label="Footer">
          <a href="/disclaimer">Research disclaimer</a>
          <a href="/ethics">Data ethics</a>
          <a href="#research">Public research</a>
          <a href="#sources">Sources & provenance</a>
        </nav>

        <div className="footerMeta">
          <a href={FOR_AGE.zenodoUrl} target="_blank" rel="noreferrer">
            FOR-age dataset ↗
          </a>
          <span>Independent prototype · real public data · 2026</span>
        </div>
      </div>
    </footer>
  );
}
