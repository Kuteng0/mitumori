const STORAGE_KEY = "agri-tiktok-profit-app";

const defaultState = {
  selectedTemplateId: "standard",
  masters: {
    products: [
      { name: "いちご", specs: ["250gパック", "300gパック", "贈答箱"], price: 1280, cost: 720 },
      { name: "みかん", specs: ["5kg箱", "10kg箱", "家庭用"], price: 4200, cost: 2600 },
      { name: "りんご", specs: ["5kg箱", "10kg箱", "訳あり"], price: 5200, cost: 3400 },
      { name: "ぶどう", specs: ["2房箱", "4房箱", "シャインマスカット"], price: 8800, cost: 5600 },
      { name: "米", specs: ["5kg袋", "10kg袋", "玄米30kg"], price: 4500, cost: 3100 },
      { name: "さつまいも", specs: ["3kg箱", "5kg箱", "焼き芋用"], price: 3200, cost: 1900 },
      { name: "じゃがいも", specs: ["5kg箱", "10kg箱", "業務用"], price: 2800, cost: 1600 },
      { name: "たまねぎ", specs: ["5kg箱", "10kg箱", "Lサイズ"], price: 2600, cost: 1500 },
      { name: "トマト", specs: ["1kg箱", "4kg箱", "ミニトマト"], price: 2400, cost: 1300 },
      { name: "きゅうり", specs: ["20本箱", "50本箱", "曲がり品"], price: 2200, cost: 1250 },
      { name: "キャベツ", specs: ["6玉箱", "10玉箱"], price: 2500, cost: 1450 },
      { name: "茶", specs: ["100g袋", "500g袋", "ギフト缶"], price: 1800, cost: 900 },
      { name: "干し芋", specs: ["200g袋", "500g袋", "ギフト箱"], price: 1600, cost: 850 },
      { name: "梅干し", specs: ["500g瓶", "1kg樽", "ギフト箱"], price: 2600, cost: 1500 },
      { name: "味噌", specs: ["500g袋", "1kg袋", "業務用5kg"], price: 1200, cost: 680 },
      { name: "蜂蜜", specs: ["300g瓶", "600g瓶", "ギフト箱"], price: 2800, cost: 1550 },
      { name: "漬物", specs: ["単品袋", "3点セット", "業務用"], price: 980, cost: 520 },
      { name: "乾燥野菜", specs: ["50g袋", "100g袋", "業務用"], price: 860, cost: 430 }
    ],
    adjustments: [
      { name: "TikTok販売手数料", type: "fee", method: "rate", value: 6, formula: "revenue * 0.06" },
      { name: "決済手数料", type: "fee", method: "rate", value: 3.6, formula: "revenue * 0.036" },
      { name: "国内送料", type: "fee", method: "perUnit", value: 850, formula: "qty * 850" },
      { name: "梱包資材", type: "fee", method: "perUnit", value: 120, formula: "qty * 120" },
      { name: "ライブ運営協力費", type: "fee", method: "amount", value: 5000, formula: "5000" },
      { name: "地域産品販促補助", type: "subsidy", method: "rate", value: 5, formula: "revenue * 0.05" },
      { name: "送料補助", type: "subsidy", method: "perUnit", value: 300, formula: "qty * 300" },
      { name: "メーカー協賛金", type: "subsidy", method: "amount", value: 3000, formula: "3000" }
    ]
  },
  templates: [
    {
      id: "standard",
      name: "標準テンプレート",
      quoteNo: "QT-2026-001",
      quoteDate: "",
      clientName: "B商 御中",
      issuerName: "農産品サプライヤー",
      currency: "JPY",
      taxRate: 10,
      productProfitFormula: "subtotal - cost",
      netProfitFormula: "revenue - cost - fees + subsidies - tax",
      products: [
        { name: "いちご", spec: "300gパック", qty: 30, price: 1280, cost: 720 },
        { name: "干し芋", spec: "500g袋", qty: 40, price: 1600, cost: 850 }
      ],
      fees: [
        { name: "TikTok販売手数料", method: "rate", value: 6, formula: "revenue * 0.06" },
        { name: "決済手数料", method: "rate", value: 3.6, formula: "revenue * 0.036" },
        { name: "国内送料", method: "perUnit", value: 850, formula: "qty * 850" },
        { name: "梱包資材", method: "perUnit", value: 120, formula: "qty * 120" }
      ],
      subsidies: [
        { name: "地域産品販促補助", method: "rate", value: 5, formula: "revenue * 0.05" },
        { name: "メーカー協賛金", method: "amount", value: 3000, formula: "3000" }
      ]
    }
  ]
};

let state = loadState();
let current = clone(getTemplate(state.selectedTemplateId) || state.templates[0]);

const els = {
  templateSelect: document.getElementById("templateSelect"),
  productList: document.getElementById("productList"),
  feeList: document.getElementById("feeList"),
  subsidyList: document.getElementById("subsidyList"),
  summaryRows: document.getElementById("summaryRows"),
  quoteDoc: document.getElementById("quoteDoc"),
  masterProducts: document.getElementById("masterProducts"),
  masterAdjustments: document.getElementById("masterAdjustments")
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.templates?.length) return saved;
  } catch {}
  return clone(defaultState);
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getTemplate(id) {
  return state.templates.find((template) => template.id === id);
}

function money(value) {
  const currency = current.currency || "JPY";
  return new Intl.NumberFormat("ja-JP", { style: "currency", currency, maximumFractionDigits: currency === "JPY" ? 0 : 2 }).format(Number(value) || 0);
}

function number(value) {
  return Number.parseFloat(value) || 0;
}

function safeFormula(expression, scope) {
  const clean = String(expression || "0").replace(/[^-+*/().\w\s]/g, "");
  try {
    const keys = Object.keys(scope);
    const values = keys.map((key) => Number(scope[key]) || 0);
    const fn = new Function(...keys, `"use strict"; return (${clean});`);
    const result = Number(fn(...values));
    return Number.isFinite(result) ? result : 0;
  } catch {
    return 0;
  }
}

function adjustmentAmount(item, scope) {
  if (item.method === "formula") return safeFormula(item.formula, scope);
  if (item.method === "rate") return scope.revenue * number(item.value) / 100;
  if (item.method === "perUnit") return scope.qty * number(item.value);
  return number(item.value);
}

function calculate() {
  const products = current.products.map((product) => {
    const qty = number(product.qty);
    const subtotal = qty * number(product.price);
    const cost = qty * number(product.cost);
    const profit = safeFormula(current.productProfitFormula, { subtotal, cost, qty, revenue: subtotal, fees: 0, subsidies: 0, tax: 0 });
    return { ...product, qty, subtotal, cost, profit };
  });
  const revenue = products.reduce((sum, product) => sum + product.subtotal, 0);
  const cost = products.reduce((sum, product) => sum + product.cost, 0);
  const qty = products.reduce((sum, product) => sum + product.qty, 0);
  const baseScope = { subtotal: revenue, revenue, cost, qty, fees: 0, subsidies: 0, tax: 0 };
  const fees = current.fees.reduce((sum, item) => sum + adjustmentAmount(item, baseScope), 0);
  const subsidies = current.subsidies.reduce((sum, item) => sum + adjustmentAmount(item, { ...baseScope, fees }), 0);
  const taxable = Math.max(0, revenue - fees + subsidies);
  const tax = taxable * number(current.taxRate) / 100;
  const netProfit = safeFormula(current.netProfitFormula, { ...baseScope, fees, subsidies, tax });
  return { products, revenue, cost, qty, fees, subsidies, tax, netProfit, margin: revenue ? netProfit / revenue * 100 : 0 };
}

function syncInputsFromCurrent() {
  ["quoteNo", "quoteDate", "clientName", "issuerName", "currency", "taxRate", "productProfitFormula", "netProfitFormula"].forEach((id) => {
    const element = document.getElementById(id);
    element.value = current[id] || "";
  });
}

function syncCurrentFromInputs() {
  ["quoteNo", "quoteDate", "clientName", "issuerName", "currency", "productProfitFormula", "netProfitFormula"].forEach((id) => {
    current[id] = document.getElementById(id).value;
  });
  current.taxRate = number(document.getElementById("taxRate").value);
}

function renderTemplateSelect() {
  els.templateSelect.innerHTML = state.templates.map((template) => `<option value="${template.id}">${escapeHtml(template.name)}</option>`).join("");
  els.templateSelect.value = state.selectedTemplateId;
}

function productOptions(selected) {
  return state.masters.products.map((product) => `<option value="${escapeAttr(product.name)}"${product.name === selected ? " selected" : ""}>${escapeHtml(product.name)}</option>`).join("");
}

function specOptions(productName, selected) {
  const product = state.masters.products.find((item) => item.name === productName) || state.masters.products[0];
  return product.specs.map((spec) => `<option value="${escapeAttr(spec)}"${spec === selected ? " selected" : ""}>${escapeHtml(spec)}</option>`).join("");
}

function renderProducts() {
  els.productList.innerHTML = "";
  current.products.forEach((product, index) => {
    const node = document.getElementById("productTemplate").content.firstElementChild.cloneNode(true);
    node.querySelector(".product-name").innerHTML = productOptions(product.name);
    node.querySelector(".product-spec").innerHTML = specOptions(product.name, product.spec);
    node.querySelector(".product-qty").value = product.qty;
    node.querySelector(".product-price").value = product.price;
    node.querySelector(".product-cost").value = product.cost;
    node.querySelector(".remove-btn").onclick = () => {
      current.products.splice(index, 1);
      renderAll();
    };
    node.querySelector(".product-name").onchange = (event) => {
      const master = state.masters.products.find((item) => item.name === event.target.value);
      current.products[index] = {
        ...current.products[index],
        name: master.name,
        spec: master.specs[0],
        price: master.price,
        cost: master.cost
      };
      renderAll();
    };
    node.querySelectorAll("input, select").forEach((input) => {
      input.oninput = () => {
        current.products[index] = {
          name: node.querySelector(".product-name").value,
          spec: node.querySelector(".product-spec").value,
          qty: number(node.querySelector(".product-qty").value),
          price: number(node.querySelector(".product-price").value),
          cost: number(node.querySelector(".product-cost").value)
        };
        renderResults();
      };
    });
    els.productList.appendChild(node);
  });
}

function renderAdjustments(list, target) {
  target.innerHTML = "";
  list.forEach((item, index) => {
    const node = document.getElementById("adjustmentTemplate").content.firstElementChild.cloneNode(true);
    node.querySelector(".adjustment-name").value = item.name;
    node.querySelector(".adjustment-method").value = item.method;
    node.querySelector(".adjustment-value").value = item.value;
    node.querySelector(".adjustment-formula").value = item.formula;
    node.querySelector(".remove-btn").onclick = () => {
      list.splice(index, 1);
      renderAll();
    };
    node.querySelectorAll("input, select").forEach((input) => {
      input.oninput = () => {
        list[index] = {
          name: node.querySelector(".adjustment-name").value,
          method: node.querySelector(".adjustment-method").value,
          value: number(node.querySelector(".adjustment-value").value),
          formula: node.querySelector(".adjustment-formula").value
        };
        renderResults();
      };
    });
    target.appendChild(node);
  });
}

function renderResults() {
  syncCurrentFromInputs();
  const result = calculate();
  document.getElementById("kpiRevenue").textContent = money(result.revenue);
  document.getElementById("kpiCost").textContent = money(result.cost);
  document.getElementById("kpiFees").textContent = money(result.fees);
  document.getElementById("kpiSubsidies").textContent = money(result.subsidies);
  document.getElementById("kpiProfit").textContent = money(result.netProfit);
  document.getElementById("kpiMargin").textContent = `${result.margin.toFixed(1)}%`;
  els.summaryRows.innerHTML = result.products.map((product) => `
    <tr>
      <td>${escapeHtml(product.name)}</td>
      <td>${escapeHtml(product.spec)}</td>
      <td>${product.qty}</td>
      <td>${money(product.subtotal)}</td>
      <td>${money(product.profit)}</td>
    </tr>
  `).join("");
  renderQuote(result);
}

function renderQuote(result) {
  if (document.activeElement === els.quoteDoc) return;
  const quoteScope = { ...result, subtotal: result.revenue };
  const feeRows = current.fees.map((item) => `<tr><td>${escapeHtml(item.name)}</td><td colspan="3">${escapeHtml(methodLabel(item))}</td><td>-${money(adjustmentAmount(item, quoteScope))}</td></tr>`).join("");
  const subsidyRows = current.subsidies.map((item) => `<tr><td>${escapeHtml(item.name)}</td><td colspan="3">${escapeHtml(methodLabel(item))}</td><td>${money(adjustmentAmount(item, quoteScope))}</td></tr>`).join("");
  els.quoteDoc.innerHTML = `
    <h2>見積書</h2>
    <div class="quote-meta">
      <div>
        <p><strong>${escapeHtml(current.clientName || "")}</strong></p>
        <p>下記の通りお見積り申し上げます。</p>
      </div>
      <div>
        <p>見積番号: ${escapeHtml(current.quoteNo || "")}</p>
        <p>発行日: ${escapeHtml(current.quoteDate || "")}</p>
        <p>${escapeHtml(current.issuerName || "")}</p>
      </div>
    </div>
    <table>
      <thead><tr><th>品名</th><th>規格</th><th>数量</th><th>単価</th><th>金額</th></tr></thead>
      <tbody>
        ${result.products.map((product) => `<tr><td>${escapeHtml(product.name)}</td><td>${escapeHtml(product.spec)}</td><td>${product.qty}</td><td>${money(product.price)}</td><td>${money(product.subtotal)}</td></tr>`).join("")}
        ${feeRows}
        ${subsidyRows}
      </tbody>
    </table>
    <table class="quote-total">
      <tbody>
        <tr><th>売上小計</th><td>${money(result.revenue)}</td></tr>
        <tr><th>控除合計</th><td>-${money(result.fees)}</td></tr>
        <tr><th>補助合計</th><td>${money(result.subsidies)}</td></tr>
        <tr><th>消費税参考</th><td>${money(result.tax)}</td></tr>
        <tr><th>B商見込利益</th><td><strong>${money(result.netProfit)}</strong></td></tr>
      </tbody>
    </table>
    <p>備考: 価格、手数料、補助条件はライブ販売条件と実績により調整可能です。</p>
  `;
}

function methodLabel(item) {
  if (item.method === "rate") return `${item.value}%`;
  if (item.method === "perUnit") return `${money(item.value)} / 数量`;
  if (item.method === "formula") return item.formula;
  return money(item.value);
}

function renderMasters() {
  els.masterProducts.innerHTML = state.masters.products.map((product, index) => `
    <div class="item-card master-product-row">
      <label>商品名<input data-master-product="${index}" data-field="name" value="${escapeAttr(product.name)}"></label>
      <label>規格（カンマ区切り）<input data-master-product="${index}" data-field="specs" value="${escapeAttr(product.specs.join(", "))}"></label>
      <label>既定販売単価<input type="number" inputmode="decimal" data-master-product="${index}" data-field="price" value="${escapeAttr(product.price)}"></label>
      <label>既定仕入単価<input type="number" inputmode="decimal" data-master-product="${index}" data-field="cost" value="${escapeAttr(product.cost)}"></label>
      <button class="danger" data-remove-master-product="${index}">削除</button>
    </div>
  `).join("");
  els.masterAdjustments.innerHTML = state.masters.adjustments.map((item, index) => `
    <div class="item-card master-adjustment-row">
      <label>項目<input data-master-adjustment="${index}" data-field="name" value="${escapeAttr(item.name)}"></label>
      <label>種別<select data-master-adjustment="${index}" data-field="type"><option value="fee"${item.type === "fee" ? " selected" : ""}>控除</option><option value="subsidy"${item.type === "subsidy" ? " selected" : ""}>補助</option></select></label>
      <label>方式<select data-master-adjustment="${index}" data-field="method"><option value="amount"${item.method === "amount" ? " selected" : ""}>金額</option><option value="rate"${item.method === "rate" ? " selected" : ""}>売上%</option><option value="perUnit"${item.method === "perUnit" ? " selected" : ""}>数量単価</option><option value="formula"${item.method === "formula" ? " selected" : ""}>式</option></select></label>
      <label>値<input type="number" inputmode="decimal" step="0.01" data-master-adjustment="${index}" data-field="value" value="${escapeAttr(item.value)}"></label>
      <label>式<input data-master-adjustment="${index}" data-field="formula" value="${escapeAttr(item.formula)}"></label>
      <button class="danger" data-remove-master-adjustment="${index}">削除</button>
    </div>
  `).join("");
}

function renderAll() {
  syncInputsFromCurrent();
  renderTemplateSelect();
  renderProducts();
  renderAdjustments(current.fees, els.feeList);
  renderAdjustments(current.subsidies, els.subsidyList);
  renderMasters();
  renderResults();
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

function addProduct() {
  const master = state.masters.products[0];
  current.products.push({ name: master.name, spec: master.specs[0], qty: 1, price: master.price, cost: master.cost });
  renderAll();
}

function addAdjustment(list, type) {
  const master = state.masters.adjustments.find((item) => item.type === type);
  list.push({ name: master?.name || "新規項目", method: master?.method || "amount", value: master?.value || 0, formula: master?.formula || "0" });
  renderAll();
}

function saveTemplate() {
  syncCurrentFromInputs();
  const name = prompt("テンプレート名", current.name || "新規テンプレート");
  if (!name) return;
  const id = current.id && current.id !== "standard" ? current.id : `tpl-${Date.now()}`;
  current = { ...clone(current), id, name };
  const existing = state.templates.findIndex((template) => template.id === id);
  if (existing >= 0) state.templates[existing] = clone(current);
  else state.templates.push(clone(current));
  state.selectedTemplateId = id;
  persist();
  renderAll();
}

function bindEvents() {
  document.querySelectorAll("#quoteNo,#quoteDate,#clientName,#issuerName,#currency,#taxRate,#productProfitFormula,#netProfitFormula").forEach((input) => {
    input.addEventListener("input", renderResults);
  });
  document.getElementById("addProductBtn").onclick = addProduct;
  document.getElementById("addFeeBtn").onclick = () => addAdjustment(current.fees, "fee");
  document.getElementById("addSubsidyBtn").onclick = () => addAdjustment(current.subsidies, "subsidy");
  document.getElementById("saveTemplateBtn").onclick = saveTemplate;
  document.getElementById("exportPdfBtn").onclick = () => {
    document.querySelector('[data-tab="quote"]').click();
    setTimeout(() => window.print(), 100);
  };
  document.getElementById("loadTemplateBtn").onclick = () => {
    state.selectedTemplateId = els.templateSelect.value;
    current = clone(getTemplate(state.selectedTemplateId));
    persist();
    renderAll();
  };
  document.getElementById("duplicateTemplateBtn").onclick = () => {
    current.id = `tpl-${Date.now()}`;
    current.name = `${current.name || "テンプレート"} コピー`;
    saveTemplate();
  };
  document.getElementById("deleteTemplateBtn").onclick = () => {
    if (state.templates.length <= 1) return alert("最後のテンプレートは削除できません。");
    if (!confirm("選択中のテンプレートを削除しますか？")) return;
    state.templates = state.templates.filter((template) => template.id !== els.templateSelect.value);
    state.selectedTemplateId = state.templates[0].id;
    current = clone(state.templates[0]);
    persist();
    renderAll();
  };
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.onclick = () => {
      document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
      document.querySelectorAll(".tab-view").forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(`${tab.dataset.tab}Tab`).classList.add("active");
    };
  });
  document.getElementById("addMasterProductBtn").onclick = () => {
    state.masters.products.push({ name: "新規商品", specs: ["標準"], price: 0, cost: 0 });
    persist();
    renderAll();
  };
  document.getElementById("addMasterAdjustmentBtn").onclick = () => {
    state.masters.adjustments.push({ name: "新規項目", type: "fee", method: "amount", value: 0, formula: "0" });
    persist();
    renderAll();
  };
  document.body.addEventListener("input", (event) => {
    const productIndex = event.target.dataset.masterProduct;
    const adjustmentIndex = event.target.dataset.masterAdjustment;
    if (productIndex !== undefined) {
      const product = state.masters.products[productIndex];
      if (event.target.dataset.field === "specs") product.specs = event.target.value.split(",").map((item) => item.trim()).filter(Boolean);
      else if (event.target.dataset.field === "price" || event.target.dataset.field === "cost") product[event.target.dataset.field] = number(event.target.value);
      else product[event.target.dataset.field] = event.target.value;
      persist();
      renderProducts();
    }
    if (adjustmentIndex !== undefined) {
      const field = event.target.dataset.field;
      state.masters.adjustments[adjustmentIndex][field] = field === "value" ? number(event.target.value) : event.target.value;
      persist();
    }
  });
  document.body.addEventListener("click", (event) => {
    const productIndex = event.target.dataset.removeMasterProduct;
    const adjustmentIndex = event.target.dataset.removeMasterAdjustment;
    if (productIndex !== undefined) {
      state.masters.products.splice(productIndex, 1);
      persist();
      renderAll();
    }
    if (adjustmentIndex !== undefined) {
      state.masters.adjustments.splice(adjustmentIndex, 1);
      persist();
      renderAll();
    }
  });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("service-worker.js").catch(() => {}));
}

bindEvents();
if (!current.quoteDate) current.quoteDate = new Date().toISOString().slice(0, 10);
renderAll();
