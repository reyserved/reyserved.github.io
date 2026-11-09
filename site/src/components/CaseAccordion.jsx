"use client";

import { useState } from "react";
import { CASE_LIST, CASES } from "../data/cases";

export default function CaseAccordion() {
  const [open, setOpen] = useState(null);

  return (
    <div className="work-list">
      {CASE_LIST.map((item, index) => {
        const isOpen = open === index;
        const detail = CASES[item.slug];
        return (
          <div className={`case-tile${isOpen ? " is-open" : ""}`} key={item.slug} style={{ "--row-tint": item.tint }}>
            <button
              className="case-tile__summary"
              type="button"
              aria-expanded={isOpen}
              aria-controls={`case-panel-${item.slug}`}
              onClick={() => setOpen(isOpen ? null : index)}
            >
              <span className="work-row__client">
                <span className="work-row__brand">
                  <img className={item.logoWide ? "work-row__logo work-row__logo--wide" : "work-row__logo"} src={item.logo} alt={`${item.client} logo`} />
                  <span className="work-row__brand-text">
                    <span className="case-pill">{item.pill}</span>
                    <span className="work-row__name">{item.client}</span>
                  </span>
                </span>
              </span>
              <span className="work-row__year">{item.year}</span>
              <span className="work-row__title">{item.title}</span>
              <span className="work-row__desc">{item.desc}</span>
              <span className="case-tile__chevron" aria-hidden="true">{isOpen ? "×" : "»"}</span>
            </button>

            <div className="case-tile__panel" id={`case-panel-${item.slug}`} hidden={!isOpen}>
              <div className="case-tile__visual">
                <img src={item.logo} alt={`${item.client} logo`} />
              </div>
              <div className="case-tile__detail">
                <span className="case-pill">{item.pill}</span>
                <h3>{item.title}</h3>
                <p>{item.lede}</p>
                <ul>
                  {detail.metricCards.slice(0, 3).map(([value, label, source]) => (
                    <li key={label}><strong>{value}</strong> — {label} <span>({source})</span></li>
                  ))}
                </ul>
                <a className="btn btn--dark btn--sm" href={`/work/${item.slug}/`}>Read full case study <span className="arrow" aria-hidden="true">→</span></a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
