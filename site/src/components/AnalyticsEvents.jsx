"use client";

import { useEffect } from "react";

export default function AnalyticsEvents() {
  useEffect(() => {
    const track = (name, params) => window.gtag?.("event", name, params);

    const onClick = (event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;

      const link = target.closest("a");
      if (link) {
        const href = link.getAttribute("href") || "";
        const text = link.textContent.replace(/\s+/g, " ").trim();

        if (href.endsWith(".pdf")) {
          track("resume_download", { link_text: text, link_url: href });
        } else if (href.startsWith("mailto:")) {
          track("contact_click", { method: "email" });
        } else if (href.includes("linkedin.com") || href.includes("github.com")) {
          track("outbound_click", { link_text: text, link_url: href });
        } else if (link.classList.contains("btn") || link.closest(".case-nav")) {
          track("cta_click", { link_text: text, link_url: href });
        }
      }

      const caseToggle = target.closest(".case-tile__summary");
      if (caseToggle) {
        track("case_study_toggle", {
          case_name: caseToggle.querySelector(".work-row__name")?.textContent?.trim() || "",
        });
      }

      const winCard = target.closest(".win-card--interactive");
      if (winCard) {
        track("win_card_toggle", {
          client: winCard.querySelector(".win-card__client")?.textContent?.trim() || "",
        });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
