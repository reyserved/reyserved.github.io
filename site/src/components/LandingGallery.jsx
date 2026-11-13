"use client";

import { useState } from "react";
import { LANDING_FILTERS, LANDING_PAGES } from "../data/landingPages";

export default function LandingGallery() {
  const [filter, setFilter] = useState("All");
  const visible = LANDING_PAGES.filter((page) => filter === "All" || page.sectorGroup === filter);

  return (
    <>
      <div className="lp-filter">
        <div className="lp-filter__buttons" role="group" aria-label="Filter landing pages by sector">
          {LANDING_FILTERS.map((item) => {
            const count = item === "All" ? LANDING_PAGES.length : LANDING_PAGES.filter((page) => page.sectorGroup === item).length;
            return (
              <button
                key={item}
                type="button"
                className={`lp-filter__btn${filter === item ? " is-active" : ""}`}
                aria-pressed={filter === item}
                data-filter={item}
                onClick={() => setFilter(item)}
              >
                {item}
                <span>{String(count).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>
        <span className="lp-filter__count" aria-live="polite">
          Showing {String(visible.length).padStart(2, "0")} of {String(LANDING_PAGES.length).padStart(2, "0")}
        </span>
      </div>

      <div className="lp-grid">
        {LANDING_PAGES.map((page) => (
          <a
            className={`lp-card${page.wide ? " lp-card--wide" : ""}`}
            href={`/work/landing-pages/${page.slug}/`}
            key={page.slug}
            data-sector={page.sectorGroup}
            hidden={filter !== "All" && page.sectorGroup !== filter}
            aria-label={`${page.client}: ${page.title}`}
          >
            <span className="lp-card__media">
              <img
                src={`/landing-pages/${page.slug}/card.webp`}
                alt={`${page.client} ${page.shortTitle} landing page preview`}
                loading="eager"
                decoding="async"
              />
              <span className="lp-card__sector">{page.sectorGroup}</span>
            </span>
            <span className="lp-card__footer">
              <span className="lp-card__copy">
                <span className="lp-card__client">{page.client}</span>
                <span className="lp-card__title">{page.title}</span>
                <span className="lp-card__type">
                  {page.pageType} <span aria-hidden="true">/</span> {page.builtShort}
                </span>
              </span>
              <span className="lp-card__arrow" aria-hidden="true">
                →
              </span>
            </span>
          </a>
        ))}
      </div>
    </>
  );
}
