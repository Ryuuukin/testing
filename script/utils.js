let flowerQuantities = {};
let selectedWrap = null;

function changeQty(id, diff) {
  if (!flowerQuantities[id]) flowerQuantities[id] = 0;
  flowerQuantities[id] = Math.max(0, flowerQuantities[id] + diff);
  document.getElementById(`${id}-qty`).innerText = flowerQuantities[id];
  const wrapObj = wrappings.find(w => w.id === selectedWrap);
  renderBouquetPreview(flowerQuantities, wrapObj?.image || null);
  updateTotalCostDisplay();
  updateBouquetInfo()
}

function chunkArray(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

function selectWrap(id) {
  selectedWrap = id;
  renderWrappings(); // refresh button state

  const wrapObj = wrappings.find(w => w.id === selectedWrap);
  renderBouquetPreview(flowerQuantities, wrapObj?.image || null);
  updateTotalCostDisplay();
  updateBouquetInfo()
}

function generateMessage() {
  const t = translations[currentLang];
  let msg = `💐 ${t.greeting}\n`;
  let total = 0;
  let hasFlowers = false;

  flowers.forEach(f => {
    const qty = flowerQuantities[f.id] || 0;
    if (qty > 0) {
      hasFlowers = true;
      const cost = qty * f.price;
      msg += `🎀 ${f.name[currentLang]} x${qty} = ${cost} ₸\n`;
      total += cost;
    }
  });

  if (!hasFlowers) {
    alert(t.alertEmpty);
    return null;
  }

  const wrap = wrappings.find(w => w.id === selectedWrap) || wrappings[0];
  msg += `${t.wrap}: ${wrap.name[currentLang]} (${wrap.price} ₸)\n`;
  total += wrap.price;
  msg += `💰 ${t.total}: ${total} ₸`;

  return encodeURIComponent(msg);
}


function updateTotalCostDisplay() {
  let total = 0;

  // Sum flower costs
  flowers.forEach(f => {
    const qty = flowerQuantities[f.id] || 0;
    total += qty * f.price;
  });

  // Add wrap cost
  const wrap = wrappings.find(w => w.id === selectedWrap);
  if (wrap) {
    total += wrap.price;
  }

  // Update display
  const el = document.getElementById("total-cost");
  el.innerText = `${translations[currentLang].total}: ${total} ₸`;
}
