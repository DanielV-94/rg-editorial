function initServiceFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".service-item");
  if (!buttons.length || !cards.length || !window.gsap) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.dataset.filter;

      cards.forEach((card) => {
        const match = category === "all" || card.dataset.category === category;
        gsap.to(card, {
          autoAlpha: match ? 1 : 0.18,
          scale: match ? 1 : 0.98,
          duration: 0.25,
        });
      });
    });
  });
}

function initFaq() {
  const items = document.querySelectorAll("[data-faq]");
  items.forEach((item) => {
    item.querySelector("button")?.addEventListener("click", () => {
      item.classList.toggle("open");
      const panel = item.querySelector(".faq-body");
      if (!panel) return;
      panel.style.maxHeight = item.classList.contains("open")
        ? `${panel.scrollHeight}px`
        : "0px";
    });
  });
}

initServiceFilters();
initFaq();
