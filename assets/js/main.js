(function () {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(pointer: fine)");

  /* Scroll reveals */
  const revealTargets = document.querySelectorAll(".reveal, .reveal-group");
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    revealTargets.forEach((el) => revealObserver.observe(el));
  }

  /* Animated counters */
  const counters = document.querySelectorAll("[data-count]");
  counters.forEach((el) => {
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

    if (window.Charts && window.Charts.onVisible) {
      window.Charts.onVisible(el, () => {
        if (window.Charts.animateNumber) {
          window.Charts.animateNumber(el, target, format);
        } else {
          el.textContent = format(target);
        }
      });
    } else {
      el.textContent = format(target);
    }
  });

  /* Mobile navigation */
  const menuButton = document.querySelector(".site-nav__menu");
  const siteLinks = document.getElementById("site-links");
  if (menuButton && siteLinks) {
    menuButton.addEventListener("click", () => {
      const isOpen = siteLinks.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });
    siteLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        siteLinks.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Specialty ticker */
  const ticker = document.querySelector(".hero__ticker-track");
  if (ticker && !reducedMotion.matches) {
    const items = ticker.querySelectorAll("span");
    let index = 0;
    window.setInterval(() => {
      index = (index + 1) % items.length;
      ticker.style.transform = `translateY(-${index * 24}px)`;
    }, 2600);
  }

  /* Custom cursor */
  if (finePointer.matches && !reducedMotion.matches) {
    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className = "cursor-dot";
    ring.className = "cursor-ring";
    document.body.append(dot, ring);

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    document.addEventListener("mousemove", (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    function animateCursor() {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll("a, button, .card").forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("is-active"));
      el.addEventListener("mouseleave", () => ring.classList.remove("is-active"));
    });
  }

  /* Clay parallax */
  if (finePointer.matches && !reducedMotion.matches) {
    const shapes = document.querySelectorAll(".clay");
    document.addEventListener("mousemove", (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      shapes.forEach((shape, index) => {
        const depth = (index % 3 + 1) * 5;
        shape.style.translate = `${x * depth}px ${y * depth}px`;
      });
    });
  }
})();
