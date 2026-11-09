"use client";

import { useEffect } from "react";
import { animateNumber, onVisible, prefersReducedMotion } from "../lib/charts";

export default function ClientEffects() {
  useEffect(() => {
    const reduced = prefersReducedMotion();
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const revealTargets = document.querySelectorAll(".reveal, .reveal-group");
    if (reduced || !("IntersectionObserver" in window)) {
      revealTargets.forEach((el) => el.classList.add("is-visible"));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
      );
      revealTargets.forEach((el) => observer.observe(el));
    }

    document.querySelectorAll("[data-count]").forEach((el) => {
      const target = parseFloat(el.dataset.count);
      const decimals = parseInt(el.dataset.decimals || "0", 10);
      const prefix = el.dataset.prefix || "";
      const suffix = el.dataset.suffix || "";
      const format = (value) =>
        prefix +
        value.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }) +
        suffix;
      if (reduced) {
        el.textContent = format(target);
        return;
      }
      onVisible(el, () => {
        el.textContent = format(0);
        animateNumber(el, target, format);
      });
    });

    const ticker = document.querySelector(".hero__ticker-track");
    let tickerTimer;
    if (ticker && !reduced) {
      const items = ticker.querySelectorAll("span");
      let index = 0;
      tickerTimer = window.setInterval(() => {
        index = (index + 1) % items.length;
        ticker.style.transform = `translateY(-${index * 24}px)`;
      }, 2600);
    }

    let dot;
    let ring;
    let frame;
    if (finePointer && !reduced) {
      dot = document.createElement("div");
      ring = document.createElement("div");
      dot.className = "cursor-dot";
      ring.className = "cursor-ring";
      document.body.append(dot, ring);

      let mouseX = -100;
      let mouseY = -100;
      let ringX = -100;
      let ringY = -100;

      const onMove = (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      };
      document.addEventListener("mousemove", onMove);

      const animateCursor = () => {
        ringX += (mouseX - ringX) * 0.16;
        ringY += (mouseY - ringY) * 0.16;
        ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
        frame = requestAnimationFrame(animateCursor);
      };
      animateCursor();

      document.querySelectorAll("a, button, .card").forEach((el) => {
        el.addEventListener("mouseenter", () => ring.classList.add("is-active"));
        el.addEventListener("mouseleave", () => ring.classList.remove("is-active"));
      });

      var cursorCleanup = () => document.removeEventListener("mousemove", onMove);
    }

    let parallaxCleanup;
    if (finePointer && !reduced) {
      const shapes = document.querySelectorAll(".clay");
      const onParallax = (event) => {
        const x = (event.clientX / window.innerWidth - 0.5) * 2;
        const y = (event.clientY / window.innerHeight - 0.5) * 2;
        shapes.forEach((shape, index) => {
          const depth = (index % 3 + 1) * 5;
          shape.style.translate = `${x * depth}px ${y * depth}px`;
        });
      };
      document.addEventListener("mousemove", onParallax);
      parallaxCleanup = () => document.removeEventListener("mousemove", onParallax);
    }

    return () => {
      if (tickerTimer) window.clearInterval(tickerTimer);
      if (frame) cancelAnimationFrame(frame);
      if (dot) dot.remove();
      if (ring) ring.remove();
      if (typeof cursorCleanup === "function") cursorCleanup();
      if (parallaxCleanup) parallaxCleanup();
    };
  }, []);

  return null;
}
