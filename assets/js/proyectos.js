function initProjectFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      button.classList.add("active");
      const target = button.dataset.filter;

      projects.forEach((project) => {
        const show = target === "all" || project.dataset.category === target;
        project.style.display = show ? "block" : "none";
      });
    });
  });
}

function initLightbox() {
  const modal = document.querySelector(".modal");
  const modalImg = modal?.querySelector("img");
  const modalText = modal?.querySelector("p");
  if (!modal || !modalImg || !modalText) return;

  document.querySelectorAll(".project").forEach((project) => {
    project.addEventListener("click", () => {
      const img = project.querySelector("img");
      const caption = project.dataset.caption || "";
      if (!img) return;
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modalText.textContent = caption;
      modal.classList.add("open");
    });
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.classList.contains("modal-close")) {
      modal.classList.remove("open");
    }
  });
}

initProjectFilters();
initLightbox();
