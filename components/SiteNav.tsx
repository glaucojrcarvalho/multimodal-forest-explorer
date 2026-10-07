export function SiteNav() {
  return (
    <nav className="nav shell" aria-label="Primary">
      <a className="brand" href="#top" aria-label="Forest Intelligence Explorer home">
        <span className="brandMark" aria-hidden="true">F</span>
        <span>Forest Intelligence Explorer</span>
      </a>
      <div className="navLinks">
        <a href="#modalities">Modalities</a>
        <a href="#method">Method</a>
        <a href="#research">Research</a>
        <a href="#sources">Sources</a>
      </div>
    </nav>
  );
}
