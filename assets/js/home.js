function initHomeHero() {
  if (!window.gsap) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.from(".hero .kicker", { y: 18, autoAlpha: 0, duration: 0.5 })
    .from(
      ".hero .hero-eyebrow",
      { y: 18, autoAlpha: 0, duration: 0.5 },
      "<0.06",
    )
    .from(".hero h1", { y: 36, autoAlpha: 0, duration: 0.9 }, "<0.05")
    .from(".hero p", { y: 22, autoAlpha: 0, duration: 0.6 }, "<0.05")
    .from(
      ".hero .btn",
      { y: 22, autoAlpha: 0, stagger: 0.08, duration: 0.55 },
      "<0.06",
    )
    .from(
      ".premium-pillars span",
      { y: 16, autoAlpha: 0, stagger: 0.06, duration: 0.45 },
      "<0.08",
    )
    .from(
      ".hero .stat",
      { y: 24, autoAlpha: 0, stagger: 0.08, duration: 0.55 },
      "<0.08",
    )
    .from(
      ".hero-visual__frame",
      { scale: 0.95, autoAlpha: 0, duration: 0.8, ease: "power2.out" },
      "<0.06",
    )
    .from(
      ".hero-visual__badge",
      { x: 18, autoAlpha: 0, duration: 0.55, stagger: 0.08 },
      "<0.1",
    )
    .from(
      ".hero-visual__thumbs img",
      { y: 14, autoAlpha: 0, duration: 0.45, stagger: 0.08 },
      "<0.12",
    );

  gsap.to(".hero-visual__frame img", {
    scale: 1.07,
    duration: 6,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });
}

function initHeroPerspective() {
  const visual = document.querySelector(".hero-visual");
  const frame = document.querySelector(".hero-visual__frame");
  if (!visual || !frame || !window.gsap) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  if (reduce || touch) return;

  visual.addEventListener("mousemove", (e) => {
    const rect = visual.getBoundingClientRect();
    const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
    const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 8;

    gsap.to(frame, {
      rotateX: rx,
      rotateY: ry,
      transformPerspective: 900,
      transformOrigin: "center",
      duration: 0.35,
      ease: "power2.out",
    });
  });

  visual.addEventListener("mouseleave", () => {
    gsap.to(frame, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.45,
      ease: "power3.out",
    });
  });
}

function initMarquee() {
  const track = document.querySelector(".marquee");
  if (!track || !window.gsap) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  gsap.to(track.children, {
    xPercent: -100,
    ease: "none",
    duration: 16,
    repeat: -1,
    stagger: 0,
  });
}

function initPremiumScenes() {
  if (!window.gsap || !window.ScrollTrigger) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  gsap.registerPlugin(ScrollTrigger);

  const band = document.querySelector(".executive-band");
  if (band) {
    const cards = band.querySelectorAll(".executive-band__items article");
    gsap.from(cards, {
      y: 24,
      autoAlpha: 0,
      stagger: 0.09,
      duration: 0.55,
      ease: "power2.out",
      scrollTrigger: {
        trigger: band,
        start: "top 82%",
      },
    });
  }

  const decision = document.querySelector(".decision-panel");
  if (decision) {
    gsap.from(decision.querySelectorAll(".decision-panel__steps article"), {
      x: 20,
      autoAlpha: 0,
      stagger: 0.1,
      duration: 0.48,
      ease: "power2.out",
      scrollTrigger: {
        trigger: decision,
        start: "top 84%",
      },
    });
  }
}

initHomeHero();
initHeroPerspective();
initMarquee();
initPremiumScenes();
