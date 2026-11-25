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


      const automationTab = target.closest("[data-automation-tab]");
      if (automationTab) {
        track("automation_tab_select", {
          automation: automationTab.dataset.automation || "",
          client: automationTab.dataset.client || "",
          tab_label: automationTab.dataset.automationLabel || "",
        });
      }

      const automationRun = target.closest("[data-automation-run]");
      if (automationRun) {
        track("automation_run", {
          automation: automationRun.dataset.automation || "",
          client: automationRun.dataset.client || "",
        });
      }

      const automationOutput = target.closest("[data-automation-output]");
      if (automationOutput) {
        track("automation_output_view", {
          automation: automationOutput.dataset.automation || "",
          client: automationOutput.dataset.client || "",
          output: automationOutput.dataset.automationOutput || "",
        });
      }

      const automationCta = target.closest("[data-automation-cta]");
      if (automationCta) {
        track("automation_cta_click", {
          location: automationCta.dataset.automationCta || "",
          destination: automationCta.getAttribute("href") || "",
        });
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
