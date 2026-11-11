"use client";

import { useEffect, useRef, useState } from "react";

const SKILLS = [
  "AEO",
  "GEO",
  "Technical SEO",
  "Local SEO",
  "Content Strategy",
  "Schema",
  "GA4",
  "Google Search Console",
  "Semrush",
  "Internal Linking",
];

export default function SkillsCarousel() {
  const trackRef = useRef(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const update = () => {
      const width = track.clientWidth;
      const maxScroll = track.scrollWidth - width;
      const total = Math.max(1, Math.ceil(track.scrollWidth / width));
      setPages(total);
      setPage(Math.round(track.scrollLeft / width));
      setCanPrev(track.scrollLeft > 4);
      setCanNext(track.scrollLeft < maxScroll - 4);
    };

    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const move = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const width = track.clientWidth;
    const maxScroll = track.scrollWidth - width;
    const target = Math.max(0, Math.min(track.scrollLeft + direction * width, maxScroll));
    track.scrollTo({ left: target, behavior: "auto" });
    setPage(Math.round(target / width));
    setCanPrev(target > 4);
    setCanNext(target < maxScroll - 4);
  };

  return (
    <div className="skills-carousel">
      <div className="skills-carousel__head">
        <span className="skills-carousel__label">Capabilities</span>
        <div className="skills-carousel__controls">
          <span className="skills-carousel__counter">
            {String(page + 1).padStart(2, "0")} / {String(pages).padStart(2, "0")}
          </span>
          <button type="button" onClick={() => move(-1)} disabled={!canPrev} aria-label="Previous skills">
            ←
          </button>
          <button type="button" onClick={() => move(1)} disabled={!canNext} aria-label="Next skills">
            →
          </button>
        </div>
      </div>

      <div className="skills-carousel__viewport">
        <div className="skills-carousel__track" ref={trackRef}>
          {SKILLS.map((skill) => (
            <div className="skills-carousel__cell" key={skill}>
              <span className="skills-carousel__dot" aria-hidden="true" />
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
