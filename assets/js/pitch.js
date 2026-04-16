function initScrollProgress() {
  const bar = document.querySelector(".page-progress span");
  if (!bar) return;

  const update = () => {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const max = doc.scrollHeight - doc.clientHeight;
    const progress = max > 0 ? Math.min(1, scrollTop / max) : 0;
    bar.style.width = `${progress * 100}%`;
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

function initThemeToggle() {
  const toggle = document.querySelector(".theme-toggle");
  if (!toggle) return;

  const KEY = "rg-luxury-theme";
  const saved = localStorage.getItem(KEY);

  if (saved === "light") {
    document.body.classList.add("luxury-light");
  }

  toggle.addEventListener("click", () => {
    const enabled = document.body.classList.toggle("luxury-light");
    localStorage.setItem(KEY, enabled ? "light" : "dark");
    toggle.setAttribute("aria-pressed", String(enabled));
  });
}

function initPageTransitions() {
  const overlay = document.querySelector(".page-transition");
  if (!overlay || !window.gsap) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  gsap.fromTo(
    overlay,
    { autoAlpha: 1 },
    { autoAlpha: 0, duration: 0.65, ease: "power2.out", pointerEvents: "none" },
  );

  const internalLinks = Array.from(document.querySelectorAll("a[href]")).filter(
    (link) => {
      const href = link.getAttribute("href") || "";
      const isHash = href.startsWith("#");
      const isExternal =
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:");
      const isNewTab = link.getAttribute("target") === "_blank";
      return !isHash && !isExternal && !isNewTab;
    },
  );

  internalLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href) return;
      e.preventDefault();
      gsap.to(overlay, {
        autoAlpha: 1,
        duration: 0.45,
        ease: "power2.inOut",
        onStart: () => {
          overlay.style.pointerEvents = "auto";
        },
        onComplete: () => {
          window.location.href = href;
        },
      });
    });
  });
}

function initStorytellingPin() {
  const container = document.querySelector(".storyboard");
  const slides = gsap.utils.toArray("[data-story-slide]");
  const progress = document.querySelector(".story-progress span");
  if (!container || !slides.length || !window.gsap || !window.ScrollTrigger)
    return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || window.innerWidth < 760) {
    slides.forEach((slide) => slide.classList.add("is-active"));
    if (progress) progress.style.width = "100%";
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  slides.forEach((slide, index) => {
    if (index !== 0) {
      gsap.set(slide, { autoAlpha: 0, y: 30, position: "absolute" });
    }
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top top+=100",
      end: `+=${slides.length * 520}`,
      scrub: 0.8,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        if (progress)
          progress.style.width = `${Math.round(self.progress * 100)}%`;
      },
    },
  });

  slides.forEach((slide, index) => {
    if (index > 0) {
      tl.to(
        slides[index - 1],
        { autoAlpha: 0, y: -28, duration: 0.34 },
        ">+0.06",
      );
      tl.fromTo(
        slide,
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.34 },
        "<",
      );
    }

    tl.add(() => {
      slides.forEach((s, i) => s.classList.toggle("is-active", i === index));
    });
  });
}

initScrollProgress();
initThemeToggle();
initPageTransitions();
initStorytellingPin();
