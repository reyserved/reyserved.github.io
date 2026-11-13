"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LANDING_PAGES } from "../data/landingPages";

const AUTOPLAY_MS = 4200;

export default function AboutPageCarousel() {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(LANDING_PAGES.length - 1);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".about-pages__card");
    if (!card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0");
    const step = card.getBoundingClientRect().width + gap;
    const visible = Math.max(1, Math.round((track.clientWidth + gap) / step));
    const nextMax = Math.max(0, LANDING_PAGES.length - visible);
    setMaxIndex(nextMax);
    setIndex((current) => Math.min(current, nextMax));
  }, []);

  useEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    return () => observer.disconnect();
  }, [measure]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const goTo = useCallback(
    (target) => {
      const track = trackRef.current;
      if (!track) return;
      const card = track.querySelector(".about-pages__card");
      if (!card) return;
      const gap = parseFloat(getComputedStyle(track).columnGap || "0");
      const step = card.getBoundingClientRect().width + gap;
      const next = Math.max(0, Math.min(target, maxIndex));
      setIndex(next);
      track.scrollTo({ left: next * step, behavior: reduced ? "auto" : "smooth" });
    },
    [maxIndex, reduced]
  );

  useEffect(() => {
    if (paused || reduced || maxIndex === 0) return undefined;
    const timer = window.setInterval(() => {
      goTo(index >= maxIndex ? 0 : index + 1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [goTo, index, maxIndex, paused, reduced]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    let frame;
    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const card = track.querySelector(".about-pages__card");
        if (!card) return;
        const gap = parseFloat(getComputedStyle(track).columnGap || "0");
        const step = card.getBoundingClientRect().width + gap;
        setIndex(Math.max(0, Math.min(Math.round(track.scrollLeft / step), maxIndex)));
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [maxIndex]);

  return (
    <div
      className="about-pages__carousel"
      role="group"
      aria-roledescription="carousel"
      aria-label="Selected landing page builds"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="about-pages__track" ref={trackRef}>
        {LANDING_PAGES.map((page) => (
          <a
            className="about-pages__card"
            href={`/work/landing-pages/${page.slug}/`}
            key={page.slug}
            aria-label={`${page.client}: ${page.title}`}
          >
            <span className="about-pages__media">
              <img
                src={`/landing-pages/${page.slug}/card.webp`}
                alt={`${page.client} page preview`}
                loading="eager"
                decoding="async"
              />
            </span>
            <span className="about-pages__meta">
              <span className="about-pages__client">{page.client}</span>
              <span className="about-pages__title">{page.title}</span>
            </span>
          </a>
        ))}
      </div>

    </div>
  );
}
