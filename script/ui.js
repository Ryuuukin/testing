function renderFlowers() {
  const container = document.getElementById("flower-scroll");
  container.innerHTML = "";
  flowers.forEach(flower => {
    container.innerHTML += createCard(flower, true);
  });
}

function renderWrappings() {
  const container = document.getElementById("wrap-scroll");
  container.innerHTML = "";
  wrappings.forEach(wrap => {
    const isSelected = wrap.id === selectedWrap
    container.innerHTML += createCard(wrap, false, isSelected);
  });
}


function createCard(item, isFlower, isSelected = false) {
  // For wrapping with id 'none', replace image with title text shown in "image" area
  const isNoneWrap = !isFlower && item.id === "none";

  // If no name for any reason, display '-'
  const displayTitle = item.name[currentLang] || "-";

  return `
    <div class="col-md-4 mb-3">
      <div class="card text-center ${!isFlower && isSelected ? 'wrap-selected' : ''}">
        ${
          isNoneWrap
            ? `<div class="no-image-replacement" style="height:150px; display:flex; align-items:center; justify-content:center; font-weight:semi-bold; font-size:1rem; background:#f8f9fa; color:#636363; ">
                 ${displayTitle}
               </div>`
            : `<img src="${item.image}" class="card-img-top" alt="${displayTitle}">`
        }
        <div class="card-body">
          ${!isNoneWrap ? `<h5 class="card-title">${displayTitle}</h5>` : ''}
          <p class="card-text">${item.price} ₸</p>
          ${isFlower
            ? `<div class="quantity-controls">
                <button class="btn btn-sm btn-outline-danger" onclick="changeQty('${item.id}', -1)">−</button>
                <span id="${item.id}-qty">0</span>
                <button class="btn btn-sm btn-outline-success" onclick="changeQty('${item.id}', 1)">+</button>
              </div>`
            : `<button class="btn btn-outline-pink btn-sm" onclick="selectWrap('${item.id}')">${translations[currentLang].wrap}</button>`
          }
        </div>
      </div>
    </div>
  `;
}



function updateUIText() {
  document.getElementById("flower-title").innerText = translations[currentLang].chooseFlowers;
  document.getElementById("wrap-title").innerText = translations[currentLang].chooseWrap;
  document.getElementById("order-text").innerText = translations[currentLang].order;
  document.getElementById("delivery-text").innerText = translations[currentLang].delivery;
  document.getElementById("preview-title").innerText = translations[currentLang].bouquetPreview;
  document.getElementById("reset-btn").innerText = translations[currentLang].resetBouquet;
  renderFlowers();
  renderWrappings();
}
