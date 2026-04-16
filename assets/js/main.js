const SELECTORS = {
  preloader: ".preloader",
  cursor: ".cursor",
  cursorFollower: ".cursor-follower",
  menuBtn: ".menu-btn",
  nav: ".nav",
};

const MEDIA = {
  reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)"),
  mobile: window.matchMedia("(max-width: 980px)"),
  touch: window.matchMedia("(hover: none), (pointer: coarse)"),
};

function shouldReduceMotion() {
  return MEDIA.reducedMotion.matches;
}

function initPreloader() {
  const loader = document.querySelector(SELECTORS.preloader);
  if (!loader) return;

  window.addEventListener("load", () => {
    if (!window.gsap || shouldReduceMotion()) {
      loader.remove();
      return;
    }

    gsap.to(loader, {
      autoAlpha: 0,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => loader.remove(),
    });
  });
}

function initCursor() {
  const cursor = document.querySelector(SELECTORS.cursor);
  const follower = document.querySelector(SELECTORS.cursorFollower);
  if (
    !cursor ||
    !follower ||
    MEDIA.mobile.matches ||
    MEDIA.touch.matches ||
    shouldReduceMotion()
  )
    return;

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let fx = x;
  let fy = y;

  window.addEventListener("mousemove", (e) => {
    x = e.clientX;
    y = e.clientY;
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
  });

  gsap.ticker.add(() => {
    fx += (x - fx) * 0.18;
    fy += (y - fy) * 0.18;
    follower.style.left = `${fx}px`;
    follower.style.top = `${fy}px`;
  });

  const hoverables = document.querySelectorAll("a, button, .project, .btn");
  hoverables.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      follower.style.width = "56px";
      follower.style.height = "56px";
      follower.style.borderColor = "rgba(44, 227, 179, 0.65)";
    });
    item.addEventListener("mouseleave", () => {
      follower.style.width = "38px";
      follower.style.height = "38px";
      follower.style.borderColor = "rgba(255, 255, 255, 0.4)";
    });
  });
}

function initMenu() {
  const btn = document.querySelector(SELECTORS.menuBtn);
  const nav = document.querySelector(SELECTORS.nav);
  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => nav.classList.remove("open"));
  });

  document.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    if (!nav.contains(target) && !btn.contains(target)) {
      nav.classList.remove("open");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") nav.classList.remove("open");
  });

  window.addEventListener("resize", () => {
    if (!MEDIA.mobile.matches) {
      nav.classList.remove("open");
    }
  });
}

function initActiveNav() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === current) a.classList.add("active");
  });
}

function initRevealAnimations() {
  if (!window.gsap || !window.ScrollTrigger) return;

  if (shouldReduceMotion()) {
    document.querySelectorAll(".reveal").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    document.querySelectorAll(".counter").forEach((counter) => {
      const target = Number(counter.dataset.target || 0);
      counter.textContent = `${target}+`;
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".reveal").forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: (i % 4) * 0.04,
      scrollTrigger: {
        trigger: el,
        start: "top 86%",
      },
    });
  });

  gsap.utils.toArray(".counter").forEach((counter) => {
    const target = Number(counter.dataset.target || 0);
    const obj = { value: 0 };
    gsap.to(obj, {
      value: target,
      duration: 1.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: counter,
        start: "top 92%",
      },
      onUpdate: () => {
        counter.textContent = `${Math.round(obj.value)}+`;
      },
    });
  });
}

function initMagneticButtons() {
  if (!window.gsap || shouldReduceMotion() || MEDIA.touch.matches) return;

  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      gsap.to(btn, { x: x * 0.14, y: y * 0.2, duration: 0.3 });
    });

    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.38, ease: "power3.out" });
    });
  });
}

function initParallax() {
  if (!window.gsap || !window.ScrollTrigger || shouldReduceMotion()) return;

  gsap.utils.toArray("[data-parallax]").forEach((el) => {
    const y = Number(el.dataset.parallax || 50);
    gsap.to(el, {
      y,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        scrub: true,
      },
    });
  });
}

function initThreeBackground() {
  const wrap = document.querySelector(".three-wrap");
  const lowPowerDevice =
    MEDIA.touch.matches ||
    window.innerWidth < 760 ||
    shouldReduceMotion() ||
    (navigator.deviceMemory && navigator.deviceMemory <= 4);
  if (!wrap || !window.THREE || lowPowerDevice) {
    if (wrap) wrap.style.display = "none";
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 16;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
  wrap.appendChild(renderer.domElement);

  const geometry = new THREE.BufferGeometry();
  const count = 1200;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 38;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 26;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0x6bb7ff,
    size: 0.05,
    transparent: true,
    opacity: 0.8,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  const mouse = { x: 0, y: 0 };

  window.addEventListener("mousemove", (e) => {
    mouse.x = (e.clientX / window.innerWidth - 0.5) * 0.3;
    mouse.y = (e.clientY / window.innerHeight - 0.5) * 0.3;
  });

  function animate() {
    points.rotation.y += 0.0009;
    points.rotation.x += 0.0005;
    camera.position.x += (mouse.x - camera.position.x) * 0.04;
    camera.position.y += (-mouse.y - camera.position.y) * 0.04;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

initPreloader();
initCursor();
initMenu();
initActiveNav();
initRevealAnimations();
initMagneticButtons();
initParallax();
initThreeBackground();
initSmoothAnchors();
