function initContactForm() {
  const form = document.querySelector("#leadForm");
  const message = document.querySelector("#formMessage");
  if (!form || !message) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const nombre = data.get("nombre");
    const telefono = data.get("telefono");
    const servicio = data.get("servicio");

    if (!nombre || !telefono || !servicio) {
      message.textContent =
        "Completa nombre, teléfono y servicio para continuar.";
      message.style.color = "#ff8fa3";
      return;
    }

    const text = `¡Gracias ${nombre}! Hemos recibido tu solicitud para ${servicio}. Te contactaremos en ${telefono} en menos de 30 minutos.`;
    message.textContent = text;
    message.style.color = "#7cf3d4";
    form.reset();

    if (window.gsap) {
      gsap.fromTo(
        message,
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
      );
    }
  });
}

initContactForm();
