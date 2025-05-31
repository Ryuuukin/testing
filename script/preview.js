function renderBouquetPreview(selectedFlowers, wrapImageUrl) {
  const container = document.getElementById("bouquet-preview");
  container.innerHTML = "";

  if (wrapImageUrl) {
    const backWrap = document.createElement("img");
    backWrap.src = wrapImageUrl;
    backWrap.alt = "Wrapping";
    backWrap.className = "z-0";
    backWrap.style.bottom = "0";
    backWrap.style.left = "50%";
    backWrap.style.transform = "translateX(-50%)";
    backWrap.style.width = "110px";
    backWrap.style.position = "absolute";
    container.appendChild(backWrap);
  }

  const flowerImages = [];
  Object.entries(selectedFlowers).forEach(([id, qty]) => {
    const flower = flowers.find(f => f.id === id);
    for (let i = 0; i < qty; i++) {
      flowerImages.push(flower.image);
    }
  });

  flowerImages.forEach((src, index) => {
    const P = index % 2 === 0 ? -1 : 1;
    const middle = Math.floor(flowerImages.length / 2);
    const offset = index <= middle ? index : flowerImages.length - index;
    const rotate = P * Math.min(35, offset * 6);
    const shift = P * Math.min(40, 1 + offset * 1);
    const vertical = Math.min(index * 5, 20);

    const flowerEl = document.createElement("img");
    flowerEl.src = src;
    flowerEl.alt = `Flower ${index}`; 
    flowerEl.style.bottom = `${85 + vertical}px`;
    flowerEl.style.left = `calc(50% + ${shift}px)`;
    flowerEl.style.transform = `translateX(-50%) rotate(${rotate}deg)`;
    flowerEl.style.transformOrigin = "bottom center";
    flowerEl.style.zIndex = 20;
    container.appendChild(flowerEl);
  });

  if (wrapImageUrl) {
    const frontWrap = document.createElement("img");
    frontWrap.src = wrapImageUrl;
    frontWrap.alt = "Wrapping Front";
    frontWrap.className = "z-50";
    frontWrap.style.bottom = "0";
    frontWrap.style.left = "50%";
    frontWrap.style.transform = "translateX(-50%)";
    frontWrap.style.width = "200px";
    frontWrap.style.position = "absolute";
    frontWrap.style.pointerEvents = "none";
    container.appendChild(frontWrap);
  }
}
