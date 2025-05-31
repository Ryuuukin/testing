function updateBouquetInfo() {
  const listEl = document.getElementById("bouquet-list");
  const wrapEl = document.getElementById("bouquet-wrap");
  const infoEl = document.getElementById("bouquet-info");

  listEl.innerHTML = "";
  let hasFlowers = false;

  flowers.forEach(f => {
    const qty = flowerQuantities[f.id] || 0;
    if (qty > 0) {
      hasFlowers = true;
      const cost = qty * f.price;
      const li = document.createElement("li");
      li.innerText = `${f.name.ru} х ${qty} = ${cost} ₸`;  // change `.ru` to `[currentLang]` if needed
      listEl.appendChild(li);
    }
  });

  const wrap = wrappings.find(w => w.id === selectedWrap);
  wrapEl.innerText = wrap ? `${wrap.name.ru}` : "";

  // Show or hide block
  infoEl.classList.toggle("d-none", !hasFlowers);
}
