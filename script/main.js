document.addEventListener("DOMContentLoaded", () => {
  const langModal = new bootstrap.Modal(document.getElementById("languageModal"));
  langModal.show();

  document.getElementById("order-btn").addEventListener("click", () => {
    const msg = generateMessage();
    if (msg) {
      const phone = "77013328646";
      window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
    }
  });

  document.getElementById("delivery-btn").addEventListener("click", () => {
    const alert = document.createElement("div");
    alert.className = "alert alert-info delivery-alert";
    alert.innerText = msg;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 4000);
  });

  autoScrollCarousel("flower-scroll", 0.5);
  autoScrollCarousel("wrap-scroll", 0.5);
});
