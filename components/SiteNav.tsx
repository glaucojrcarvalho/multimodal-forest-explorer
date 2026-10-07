"use client";

import { useState } from "react";

const links = [
  ["Explorer", "#explorer"],
  ["Research", "#research-tasks"],
  ["Roadmap", "#modalities"],
  ["Provenance", "#reproducibility"]
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="siteNav">
      <nav className="nav shell" aria-label="Primary">
        <a className="brand" href="#top" aria-label="Forest Intelligence Explorer home">
          <span className="brandMark" aria-hidden="true">F</span>
          <span>Forest Intelligence Explorer</span>
        </a>

        <div className="navLinks">
          {links.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </div>

        <button
          className="menuButton"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </nav>

      <div
        id="mobile-navigation"
        className={open ? "mobileNav open" : "mobileNav"}
        aria-hidden={!open}
      >
        <div className="shell">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
