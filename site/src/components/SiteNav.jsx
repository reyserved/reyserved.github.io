"use client";

import { useState } from "react";

export default function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-nav" aria-label="Primary">
      <a className="site-nav__brand" href="/">Reymart</a>
      <nav className={`site-nav__links${open ? " is-open" : ""}`} id="site-links" aria-label="Sections">
        <a href="/work/" onClick={() => setOpen(false)}>Case studies</a>
        <a href="/method/" onClick={() => setOpen(false)}>Method</a>
        <a href="/about/" onClick={() => setOpen(false)}>About</a>
      </nav>
      <button
        className="site-nav__menu"
        type="button"
        aria-expanded={open}
        aria-controls="site-links"
        onClick={() => setOpen((value) => !value)}
      >
        Menu
      </button>
      <a className="btn btn--dark btn--sm site-nav__cta" href="/about/#contact">
        Contact <span className="arrow" aria-hidden="true">→</span>
      </a>
    </header>
  );
}
