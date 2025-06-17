const FLOWERS_URL = `https://opensheet.elk.sh/1pn0_jgN1bVlq8igLix57r6cSMucoW_mWTpX5f6NcUmw/Flowers`;
const WRAPPINGS_URL = `https://opensheet.elk.sh/1pn0_jgN1bVlq8igLix57r6cSMucoW_mWTpX5f6NcUmw/Wrappings`;

let flowerData = [];
let wrapData = [];

function fetchDataAndRender() {
  fetch(FLOWERS_URL)
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(data => {
      flowerData = data.filter(item => item.in_stock?.toLowerCase() === 'yes');
      renderFlowers();
    })
    .catch(() => {});

  fetch(WRAPPINGS_URL)
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(data => {
      wrapData = data.filter(item => item.in_stock?.toLowerCase() === 'yes');
      renderWrappings();
    })
    .catch(() => {});
}

function resolveImagePath(imageValue) {
  // If it already starts with "http", return it as-is
  if (imageValue?.startsWith("http")) return imageValue;
  // Otherwise treat it as relative path (from /img/ folder)
  return imageValue ? imageValue : "";
}

function renderFlowers() {
  const container = document.getElementById("flower-scroll");
  container.innerHTML = "";
  flowerData.forEach(flower => {
    container.innerHTML += createCard({
      id: flower.id,
      name: {
        ru: flower.name_ru,
        kk: flower.name_kk
      },
      price: flower.price,
      image: flower.image
    }, true);
  });
}

function renderWrappings() {
  const container = document.getElementById("wrap-scroll");
  container.innerHTML = "";

  const dataToUse = [
    { id: "none", name: { ru: "Без упаковки", kk: "Ораусыз" }, price: 0 },
    ...wrapData
  ];

  dataToUse.forEach(wrap => {
    const isSelected = wrap.id === selectedWrap;
    container.innerHTML += createCard({
      id: wrap.id,
      name: {
        ru: wrap.name_ru || wrap.name?.ru || wrap.name,
        kk: wrap.name_kk || wrap.name?.kk || wrap.name,
      },
      price: wrap.price,
      image: wrap.image
    }, false, isSelected);
  });
}

function createCard(item, isFlower, isSelected = false) {
  const isNoneWrap = !isFlower && item.id === "none";
  const displayTitle = item.name[currentLang] || "-";
  const cardClass = `card text-center ${!isFlower && isSelected ? 'wrap-selected' : ''}`;
  const cardClick = !isFlower ? `onclick="selectWrap('${item.id}')"` : "";

  return `
    <div class="col-md-4 mb-3">
      <div class="${cardClass}" style="cursor: ${!isFlower ? 'pointer' : 'default'};" ${cardClick}>
        ${
          isNoneWrap
            ? `<div class="no-image-replacement" style="height:150px; display:flex; align-items:center; justify-content:center; font-weight:semi-bold; font-size:1rem; background:#f8f9fa; color:#636363;">
                 ${displayTitle}
               </div>`
            : `<img src="${item.image}" class="card-img-top" alt="${displayTitle}" style="${!isFlower ? 'height: 180px; object-fit: cover;' : ''}">`
        }
        <div class="card-body">
          ${!isNoneWrap ? `<h5 class="card-title">${displayTitle}</h5>` : ''}
          <p class="card-text">${item.price} ₸</p>
          ${
            isFlower
              ? `<div class="quantity-controls">
                  <button class="btn btn-sm btn-outline-danger" onclick="changeQty('${item.id}', -1)">−</button>
                  <span id="${item.id}-qty">0</span>
                  <button class="btn btn-sm btn-outline-success" onclick="changeQty('${item.id}', 1)">+</button>
                </div>`
              : ''
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
  document.getElementById("delivery-btn-text").innerText = translations[currentLang].delivery;
  document.getElementById("preview-title").innerText = translations[currentLang].bouquetPreview;
  document.getElementById("reset-btn").innerText = translations[currentLang].resetBouquet;
  document.getElementById("letter-label").innerText = translations[currentLang].letterLabel;
  document.getElementById("message-box").placeholder = translations[currentLang].letterPlaceholder;
  document.getElementById("bouquet-info-title").innerText = translations[currentLang].bouquetRecipe;
  fetchDataAndRender();
  renderFlowers();
  renderWrappings();
}
