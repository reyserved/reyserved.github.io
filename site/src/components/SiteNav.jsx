"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "";

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    if (href === "/work/") return pathname.startsWith("/work") && !pathname.startsWith("/work/landing-pages");
    return pathname.startsWith(href);
  };

  return (
    <header className="site-nav" aria-label="Primary">
      <a className="site-nav__brand" href="/">Reymart</a>
      <nav className={`site-nav__links${open ? " is-open" : ""}`} id="site-links" aria-label="Sections">
        <a href="/work/" aria-current={isActive("/work/") ? "page" : undefined} onClick={() => setOpen(false)}>Case studies</a>
        <a href="/work/landing-pages/" aria-current={isActive("/work/landing-pages/") ? "page" : undefined} onClick={() => setOpen(false)}>Landing pages</a>
        <a href="/method/" aria-current={isActive("/method/") ? "page" : undefined} onClick={() => setOpen(false)}>Method</a>
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
