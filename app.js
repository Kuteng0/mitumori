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
      quoteTitle: "TikTokライブ販売向け農産品供給見積",
      validUntil: "",
      paymentTerms: "月末締め翌月末払い",
      deliveryTerms: "国内指定倉庫またはB商指定住所納品",
      issuerContact: "住所・電話・メールを入力",
      quoteNotes: "価格、手数料、補助条件はライブ販売条件と実績により調整可能です。",
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
        { name: "クール便追加費", method: "perUnit", value: 330, formula: "qty * 330" },
        { name: "梱包資材費", method: "perUnit", value: 120, formula: "qty * 120" },
        { name: "包装・配送ロス引当", method: "rate", value: 2, formula: "revenue * 0.02" },
        { name: "返品・破損引当", method: "rate", value: 2, formula: "revenue * 0.02" }
      ],
      subsidies: []
    }
  ]
};

const supplementalProducts = [
  { name: "桃", specs: ["2kg箱", "5kg箱", "贈答用"], price: 6200, cost: 3900 },
  { name: "梨", specs: ["5kg箱", "10kg箱", "贈答用"], price: 5600, cost: 3500 },
  { name: "柿", specs: ["3kg箱", "5kg箱", "干し柿用"], price: 4200, cost: 2500 },
  { name: "メロン", specs: ["1玉箱", "2玉箱", "高糖度"], price: 4800, cost: 3000 },
  { name: "スイカ", specs: ["1玉", "2玉箱", "小玉"], price: 3600, cost: 2200 },
  { name: "とうもろこし", specs: ["10本箱", "20本箱", "訳あり"], price: 3200, cost: 1900 },
  { name: "枝豆", specs: ["500g袋", "1kg袋", "業務用"], price: 1400, cost: 780 },
  { name: "大根", specs: ["5本箱", "10本箱", "業務用"], price: 2100, cost: 1200 },
  { name: "にんじん", specs: ["5kg箱", "10kg箱", "洗い"], price: 2400, cost: 1400 },
  { name: "長ねぎ", specs: ["3kg箱", "5kg箱", "業務用"], price: 2600, cost: 1500 },
  { name: "しいたけ", specs: ["500g箱", "1kg箱", "乾燥"], price: 1900, cost: 980 },
  { name: "卵", specs: ["10個パック", "30個箱", "業務用"], price: 520, cost: 320 },
  { name: "牛乳", specs: ["1L", "6本箱", "低温殺菌"], price: 420, cost: 260 },
  { name: "チーズ", specs: ["100g", "500g", "ギフト"], price: 980, cost: 560 },
  { name: "ジャム", specs: ["150g瓶", "300g瓶", "ギフト箱"], price: 980, cost: 520 },
  { name: "ジュース", specs: ["720ml瓶", "1L瓶", "6本箱"], price: 1500, cost: 850 },
  { name: "米粉", specs: ["500g袋", "1kg袋", "業務用"], price: 760, cost: 420 },
  { name: "豆腐", specs: ["単品", "6個箱", "業務用"], price: 360, cost: 190 },
  { name: "醤油", specs: ["500ml", "1L", "ギフト"], price: 880, cost: 470 },
  { name: "乾麺", specs: ["200g袋", "1kg箱", "ギフト"], price: 620, cost: 330 }
];

const supplementalAdjustments = [
  { name: "TikTok Shop成約手数料", type: "fee", method: "rate", value: 6, formula: "revenue * 0.06" },
  { name: "決済代行手数料", type: "fee", method: "rate", value: 3.6, formula: "revenue * 0.036" },
  { name: "アフィリエイト料", type: "fee", method: "rate", value: 8, formula: "revenue * 0.08" },
  { name: "ライブ販売委託料", type: "fee", method: "rate", value: 10, formula: "revenue * 0.10" },
  { name: "広告配信費", type: "fee", method: "amount", value: 10000, formula: "10000" },
  { name: "常温送料", type: "fee", method: "perUnit", value: 850, formula: "qty * 850" },
  { name: "クール便追加費", type: "fee", method: "perUnit", value: 330, formula: "qty * 330" },
  { name: "梱包資材費", type: "fee", method: "perUnit", value: 120, formula: "qty * 120" },
  { name: "包装・配送ロス引当", type: "fee", method: "rate", value: 2, formula: "revenue * 0.02" },
  { name: "倉庫出荷作業費", type: "fee", method: "perUnit", value: 180, formula: "qty * 180" },
  { name: "返品・破損引当", type: "fee", method: "rate", value: 2, formula: "revenue * 0.02" },
  { name: "振込手数料", type: "fee", method: "amount", value: 440, formula: "440" },
  { name: "地域産品販促補助", type: "subsidy", method: "rate", value: 5, formula: "revenue * 0.05" },
  { name: "送料補助", type: "subsidy", method: "perUnit", value: 300, formula: "qty * 300" },
  { name: "自治体EC販促補助", type: "subsidy", method: "amount", value: 5000, formula: "5000" },
  { name: "メーカー協賛金", type: "subsidy", method: "amount", value: 3000, formula: "3000" },
  { name: "初回ライブ支援金", type: "subsidy", method: "amount", value: 10000, formula: "10000" }
];

let state = loadState();
let current = clone(getTemplate(state.selectedTemplateId) || state.templates[0]);

const els = {
  templateSelect: document.getElementById("templateSelect"),
  productList: document.getElementById("productList"),
  feeList: document.getElementById("feeList"),
  subsidyList: document.getElementById("subsidyList"),
  summaryRows: document.getElementById("summaryRows"),
  adjustmentRows: document.getElementById("adjustmentRows"),
  previewRows: document.getElementById("previewRows"),
  previewFeeNames: document.getElementById("previewFeeNames"),
  quoteDoc: document.getElementById("quoteDoc"),
  quoteLockToggle: document.getElementById("quoteLockToggle"),
  masterProducts: document.getElementById("masterProducts"),
  masterAdjustments: document.getElementById("masterAdjustments")
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && saved.templates && saved.templates.length) return normalizeState(saved);
  } catch {}
  return normalizeState(clone(defaultState));
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeState(nextState) {
  if (!nextState.masters) nextState.masters = { products: [], adjustments: [] };
  if (!nextState.masters.products) nextState.masters.products = [];
  if (!nextState.masters.adjustments) nextState.masters.adjustments = [];
  mergeByName(nextState.masters.products, supplementalProducts);
  mergeByName(nextState.masters.adjustments, supplementalAdjustments);
  if (!nextState.templates) nextState.templates = clone(defaultState.templates);
  nextState.templates.forEach((template) => {
    fillMissingQuoteFields(template);
  });
  const standard = nextState.templates.find((template) => template.id === "standard");
  if (standard) {
    if (!standard.fees) standard.fees = [];
    if (!standard.subsidies) standard.subsidies = [];
    mergeByName(standard.fees, defaultState.templates[0].fees);
    standard.subsidies = [];
  }
  return nextState;
}

function fillMissingQuoteFields(template) {
  const defaults = defaultState.templates[0];
  ["quoteTitle", "validUntil", "paymentTerms", "deliveryTerms", "issuerContact", "quoteNotes", "taxRate", "productProfitFormula", "netProfitFormula"].forEach((field) => {
    if (template[field] === undefined || template[field] === null) template[field] = defaults[field] || "";
  });
}

function mergeByName(target, additions) {
  additions.forEach((item) => {
    if (!target.some((existing) => existing.name === item.name)) target.push(clone(item));
  });
}

function stripType(item) {
  const copy = clone(item);
  delete copy.type;
  return copy;
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
  const feeDetails = current.fees.map((item) => ({ ...item, amount: adjustmentAmount(item, baseScope) }));
  const fees = feeDetails.reduce((sum, item) => sum + item.amount, 0);
  const subsidyDetails = current.subsidies.map((item) => ({ ...item, amount: adjustmentAmount(item, { ...baseScope, fees }) }));
  const subsidies = subsidyDetails.reduce((sum, item) => sum + item.amount, 0);
  const taxable = Math.max(0, revenue - fees + subsidies);
  const tax = taxable * number(current.taxRate) / 100;
  const netProfit = safeFormula(current.netProfitFormula, { ...baseScope, fees, subsidies, tax });
  return { products, feeDetails, subsidyDetails, revenue, cost, qty, fees, subsidies, tax, netProfit, margin: revenue ? netProfit / revenue * 100 : 0 };
}

function syncInputsFromCurrent() {
  ["quoteNo", "quoteDate", "clientName", "issuerName", "quoteTitle", "validUntil", "paymentTerms", "deliveryTerms", "issuerContact", "quoteNotes", "currency", "taxRate", "productProfitFormula", "netProfitFormula"].forEach((id) => {
    const element = document.getElementById(id);
    element.value = current[id] || "";
  });
}

function syncCurrentFromInputs() {
  ["quoteNo", "quoteDate", "clientName", "issuerName", "quoteTitle", "validUntil", "paymentTerms", "deliveryTerms", "issuerContact", "quoteNotes", "currency", "productProfitFormula", "netProfitFormula"].forEach((id) => {
    current[id] = document.getElementById(id).value;
  });
  current.taxRate = number(document.getElementById("taxRate").value);
}

function renderTemplateSelect() {
  els.templateSelect.innerHTML = state.templates.map((template) => `<option value="${template.id}">${escapeHtml(template.name)}</option>`).join("");
  els.templateSelect.value = state.selectedTemplateId;
}

function productOptions(selected) {
  if (!state.masters.products.length) return `<option value="Custom"${selected === "Custom" ? " selected" : ""}>Custom</option>`;
  return state.masters.products.map((product) => `<option value="${escapeAttr(product.name)}"${product.name === selected ? " selected" : ""}>${escapeHtml(product.name)}</option>`).join("");
}

function specOptions(productName, selected) {
  const product = state.masters.products.find((item) => item.name === productName) || state.masters.products[0];
  const specs = product && product.specs && product.specs.length ? product.specs : [selected || "標準"];
  return specs.map((spec) => `<option value="${escapeAttr(spec)}"${spec === selected ? " selected" : ""}>${escapeHtml(spec)}</option>`).join("");
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
      if (!master) return;
      current.products[index] = {
        ...current.products[index],
        name: master.name,
        spec: master.specs[0] || "標準",
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
  document.getElementById("previewRevenue").textContent = money(result.revenue);
  document.getElementById("previewCost").textContent = money(result.cost);
  document.getElementById("previewFees").textContent = money(result.fees);
  document.getElementById("previewSubsidies").textContent = money(result.subsidies);
  document.getElementById("previewProfit").textContent = money(result.netProfit);
  document.getElementById("previewMargin").textContent = `${result.margin.toFixed(1)}%`;
  document.getElementById("previewProductCount").textContent = String(result.products.length);
  document.getElementById("previewQty").textContent = String(result.qty);
  renderTopPreviewRows(result);
  els.summaryRows.innerHTML = result.products.map((product) => `
    <tr>
      <td data-label="商品">${escapeHtml(product.name)}</td>
      <td data-label="規格">${escapeHtml(product.spec)}</td>
      <td data-label="数量">${product.qty}</td>
      <td data-label="売上">${money(product.subtotal)}</td>
      <td data-label="粗利">${money(product.profit)}</td>
    </tr>
  `).join("");
  els.adjustmentRows.innerHTML = [
    ...result.feeDetails.map((item) => ({ ...item, typeLabel: "控除", signedAmount: -item.amount })),
    ...result.subsidyDetails.map((item) => ({ ...item, typeLabel: "補助", signedAmount: item.amount }))
  ].map((item) => `
    <tr>
      <td data-label="区分">${escapeHtml(item.typeLabel)}</td>
      <td data-label="項目">${escapeHtml(item.name)}</td>
      <td data-label="方式">${escapeHtml(methodLabel(item))}</td>
      <td data-label="金額">${money(item.signedAmount)}</td>
    </tr>
  `).join("");
  renderQuote(result);
}

function renderTopPreviewRows(result) {
  const feeNames = result.feeDetails.length ? result.feeDetails.map((item) => item.name).join(" / ") : "-";
  els.previewFeeNames.textContent = `控除: ${feeNames}`;
  els.previewRows.innerHTML = result.products.map((product) => {
    const share = result.revenue ? product.subtotal / result.revenue : 0;
    const allocatedFees = result.fees * share;
    const allocatedSubsidies = result.subsidies * share;
    const allocatedTax = result.tax * share;
    const profit = product.subtotal - product.cost - allocatedFees + allocatedSubsidies - allocatedTax;
    const margin = product.subtotal ? profit / product.subtotal * 100 : 0;
    return `
      <div class="preview-row">
        <div class="preview-product">
          <strong>${escapeHtml(product.name)}</strong>
          <span>${escapeHtml(product.spec)}</span>
        </div>
        <div><span>数量</span><strong>${product.qty}</strong></div>
        <div><span>進貨価</span><strong>${money(product.cost / (product.qty || 1))}</strong></div>
        <div><span>售价</span><strong>${money(product.price)}</strong></div>
        <div><span>売上</span><strong>${money(product.subtotal)}</strong></div>
        <div><span>扣除</span><strong>-${money(allocatedFees)}</strong></div>
        <div><span>補助</span><strong>${money(allocatedSubsidies)}</strong></div>
        <div><span>利益</span><strong>${money(profit)}</strong></div>
        <div><span>利益率</span><strong>${margin.toFixed(1)}%</strong></div>
      </div>
    `;
  }).join("");
}

function renderQuote(result) {
  if (current.quoteLocked && current.quoteHtml) {
    if (els.quoteDoc.innerHTML !== current.quoteHtml) els.quoteDoc.innerHTML = current.quoteHtml;
    els.quoteLockToggle.checked = true;
    return;
  }
  if (document.activeElement === els.quoteDoc) return;
  els.quoteLockToggle.checked = false;
  const quoteSubtotal = result.products.reduce((sum, product) => sum + product.subtotal, 0);
  const quoteTax = quoteSubtotal * number(current.taxRate) / 100;
  const quoteTotal = quoteSubtotal + quoteTax;
  els.quoteDoc.innerHTML = `
    <h2>見積書</h2>
    <div class="quote-meta">
      <div>
        <p><strong>${escapeHtml(current.clientName || "")}</strong></p>
        <p>下記の通りお見積り申し上げます。</p>
        <p>件名: ${escapeHtml(current.quoteTitle || "")}</p>
      </div>
      <div>
        <p>見積番号: ${escapeHtml(current.quoteNo || "")}</p>
        <p>発行日: ${escapeHtml(current.quoteDate || "")}</p>
        <p>有効期限: ${escapeHtml(current.validUntil || "")}</p>
        <p>${escapeHtml(current.issuerName || "")}</p>
        <p>${escapeHtml(current.issuerContact || "")}</p>
      </div>
    </div>
    <table>
      <thead><tr><th>品名</th><th>規格・サイズ</th><th>数量</th><th>単価</th><th>金額</th></tr></thead>
      <tbody>
        ${result.products.map((product) => `<tr><td>${escapeHtml(product.name)}</td><td>${escapeHtml(product.spec)}</td><td>${product.qty}</td><td>${money(product.price)}</td><td>${money(product.subtotal)}</td></tr>`).join("")}
      </tbody>
    </table>
    <div class="quote-terms">
      <p><strong>支払条件:</strong> ${escapeHtml(current.paymentTerms || "")}</p>
      <p><strong>納品条件:</strong> ${escapeHtml(current.deliveryTerms || "")}</p>
    </div>
    <table class="quote-total">
      <tbody>
        <tr><th>小計</th><td>${money(quoteSubtotal)}</td></tr>
        <tr><th>消費税 (${number(current.taxRate)}%)</th><td>${money(quoteTax)}</td></tr>
        <tr><th>見積合計</th><td><strong>${money(quoteTotal)}</strong></td></tr>
      </tbody>
    </table>
    <p>備考: ${escapeHtml(current.quoteNotes || "")}</p>
  `;
  current.quoteHtml = els.quoteDoc.innerHTML;
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
  return String(value == null ? "" : value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

function addProduct() {
  const master = state.masters.products[0];
  current.products.push({
    name: master ? master.name : "Custom",
    spec: master && master.specs && master.specs[0] ? master.specs[0] : "標準",
    qty: 1,
    price: master ? master.price : 0,
    cost: master ? master.cost : 0
  });
  renderAll();
}

function addAdjustment(list, type) {
  const master = state.masters.adjustments.find((item) => item.type === type);
  list.push({
    name: master ? master.name : "新規項目",
    method: master ? master.method : "amount",
    value: master ? master.value : 0,
    formula: master ? master.formula : "0"
  });
  renderAll();
}

function validateQuoteBeforeExport() {
  syncCurrentFromInputs();
  const missing = [];
  if (!current.products.length) missing.push("商品");
  if (!current.quoteNo) missing.push("見積番号");
  if (!current.clientName) missing.push("宛先");
  if (!current.issuerName) missing.push("自社名");
  if (missing.length) {
    alert(`PDF出力前に未入力項目を確認してください: ${missing.join("、")}`);
    return false;
  }
  return true;
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
  document.querySelectorAll("#quoteNo,#quoteDate,#clientName,#issuerName,#quoteTitle,#validUntil,#paymentTerms,#deliveryTerms,#issuerContact,#quoteNotes,#currency,#taxRate,#productProfitFormula,#netProfitFormula").forEach((input) => {
    input.addEventListener("input", renderResults);
  });
  document.getElementById("addProductBtn").onclick = addProduct;
  document.getElementById("addFeeBtn").onclick = () => addAdjustment(current.fees, "fee");
  document.getElementById("addSubsidyBtn").onclick = () => addAdjustment(current.subsidies, "subsidy");
  document.getElementById("saveTemplateBtn").onclick = saveTemplate;
  els.quoteDoc.addEventListener("input", () => {
    current.quoteLocked = true;
    current.quoteHtml = els.quoteDoc.innerHTML;
    els.quoteLockToggle.checked = true;
  });
  els.quoteLockToggle.addEventListener("change", () => {
    current.quoteLocked = els.quoteLockToggle.checked;
    if (current.quoteLocked) current.quoteHtml = els.quoteDoc.innerHTML;
    renderResults();
  });
  document.getElementById("regenerateQuoteBtn").onclick = () => {
    current.quoteLocked = false;
    current.quoteHtml = "";
    els.quoteLockToggle.checked = false;
    renderResults();
  };
  document.getElementById("exportPdfBtn").onclick = () => {
    if (!validateQuoteBeforeExport()) return;
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
      if (state.masters.products.length <= 1) return alert("商品マスターは最低1件必要です。");
      state.masters.products.splice(productIndex, 1);
      persist();
      renderAll();
    }
    if (adjustmentIndex !== undefined) {
      if (state.masters.adjustments.length <= 1) return alert("控除・補助マスターは最低1件必要です。");
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
