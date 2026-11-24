(function () {
  "use strict";

  const SHOP = window.SHOP;
  const PRODUCTS = window.PRODUCTS;
  const $ = (s) => document.querySelector(s);
  const fmt = (n) => n.toLocaleString("vi-VN") + " ₫";
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ } }
  };

  /* ---------- Age gate ---------- */
  const gate = $("#age-gate");
  if (!store.get("lt_age_ok", false)) {
    gate.hidden = false;
    document.body.classList.add("locked");
  }
  $("#age-yes").addEventListener("click", () => {
    store.set("lt_age_ok", true);
    gate.hidden = true;
    document.body.classList.remove("locked");
  });
  $("#age-no").addEventListener("click", () => {
    $("#age-denied").hidden = false;
    $(".age-actions").hidden = true;
  });

  /* ---------- Shop info ---------- */
  document.querySelectorAll("[data-config]").forEach((el) => {
    const key = el.dataset.config;
    el.textContent = SHOP[key];
    if (el.dataset.href === "tel") el.href = "tel:" + SHOP.phone.replace(/\s/g, "");
    if (el.dataset.href === "zalo") el.href = "https://zalo.me/" + SHOP.zalo;
  });
  $("#map").src = "https://www.google.com/maps?q=" + encodeURIComponent(SHOP.mapQuery) + "&output=embed";
  $("#call-shop").href = "tel:" + SHOP.phone.replace(/\s/g, "");
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Mobile menu ---------- */
  const nav = $("#nav"), menuBtn = $("#menu-btn");
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  nav.addEventListener("click", (e) => { if (e.target.tagName === "A") nav.classList.remove("open"); });

  /* ---------- Products ---------- */
  const categories = ["Tất cả", ...new Set(PRODUCTS.map((p) => p.category))];
  let activeCat = "Tất cả", query = "";
  const filtersEl = $("#filters");
  categories.forEach((c) => {
    const b = document.createElement("button");
    b.className = "chip"; b.textContent = c; b.setAttribute("role", "tab");
    b.setAttribute("aria-selected", c === activeCat);
    b.addEventListener("click", () => {
      activeCat = c;
      filtersEl.querySelectorAll(".chip").forEach((x) => x.setAttribute("aria-selected", x === b));
      renderProducts();
    });
    filtersEl.appendChild(b);
  });
  $("#search").addEventListener("input", (e) => { query = e.target.value.trim().toLowerCase(); renderProducts(); });

  function renderProducts() {
    const grid = $("#product-grid");
    const list = PRODUCTS.filter((p) =>
      (activeCat === "Tất cả" || p.category === activeCat) &&
      (!query || p.name.toLowerCase().includes(query)));
    grid.innerHTML = list.map((p) => `
      <article class="card">
        <div class="pack-art" style="--c:${p.color}">
          <span class="tag">${p.category}</span>
          <div class="box"><div class="top"></div><div class="label">${p.name}</div></div>
        </div>
        <div class="card-body">
          <h3>${p.name}</h3>
          <div class="prices">
            <button class="price-opt" data-id="${p.id}" data-unit="bao"><span class="add">+</span><small>Bao (20 điếu)</small><strong>${fmt(p.pack)}</strong></button>
            <button class="price-opt" data-id="${p.id}" data-unit="cay"><span class="add">+</span><small>Cây (10 bao)</small><strong>${fmt(p.carton)}</strong></button>
          </div>
        </div>
      </article>`).join("");
    $("#empty").hidden = list.length > 0;
  }
  $("#product-grid").addEventListener("click", (e) => {
    const btn = e.target.closest(".price-opt");
    if (btn) addToCart(btn.dataset.id, btn.dataset.unit);
  });

  /* ---------- Cart ---------- */
  let cart = store.get("lt_cart", {}); // key "id|unit" -> qty
  const unitLabel = { bao: "bao", cay: "cây" };
  const priceOf = (p, unit) => (unit === "cay" ? p.carton : p.pack);

  function addToCart(id, unit) {
    const k = id + "|" + unit;
    cart[k] = (cart[k] || 0) + 1;
    saveCart();
    const p = PRODUCTS.find((x) => x.id === id);
    toast(`Đã thêm 1 ${unitLabel[unit]} ${p.name}`);
  }
  function setQty(k, q) { if (q <= 0) delete cart[k]; else cart[k] = q; saveCart(); }
  function saveCart() { store.set("lt_cart", cart); renderCart(); }

  function cartLines() {
    return Object.entries(cart).map(([k, qty]) => {
      const [id, unit] = k.split("|");
      const p = PRODUCTS.find((x) => x.id === id);
      return p ? { k, p, unit, qty, total: priceOf(p, unit) * qty } : null;
    }).filter(Boolean);
  }

  function renderCart() {
    const lines = cartLines();
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const total = lines.reduce((s, l) => s + l.total, 0);
    $("#cart-count").textContent = count;
    $("#cart-total").textContent = fmt(total);
    $("#cart-items").innerHTML = lines.length ? lines.map((l) => `
      <div class="cart-item">
        <div class="info"><strong>${l.p.name}</strong><br><small>${fmt(priceOf(l.p, l.unit))} / ${unitLabel[l.unit]}</small></div>
        <div class="qty">
          <button data-k="${l.k}" data-d="-1" aria-label="Giảm">−</button>
          <span>${l.qty}</span>
          <button data-k="${l.k}" data-d="1" aria-label="Tăng">+</button>
        </div>
      </div>`).join("") : `<p class="muted center">Giỏ hàng đang trống.</p>`;
  }
  $("#cart-items").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-k]");
    if (b) setQty(b.dataset.k, (cart[b.dataset.k] || 0) + Number(b.dataset.d));
  });

  const cartEl = $("#cart"), backdrop = $("#cart-backdrop");
  function openCart(open) {
    cartEl.classList.toggle("open", open);
    cartEl.setAttribute("aria-hidden", !open);
    backdrop.hidden = !open;
  }
  $("#cart-open").addEventListener("click", () => openCart(true));
  $("#cart-close").addEventListener("click", () => openCart(false));
  backdrop.addEventListener("click", () => openCart(false));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") openCart(false); });

  function buildOrder() {
    const lines = cartLines();
    const err = $("#cart-error");
    const name = $("#cust-name").value.trim();
    const phone = $("#cust-phone").value.trim();
    let msg = "";
    if (!lines.length) msg = "Giỏ hàng đang trống.";
    else if (!name || !/^[0-9+\s.]{9,15}$/.test(phone)) msg = "Vui lòng nhập họ tên và số điện thoại hợp lệ.";
    else if (!$("#cust-age").checked) msg = "Vui lòng xác nhận bạn đủ 18 tuổi.";
    err.textContent = msg; err.hidden = !msg;
    if (msg) return null;
    const total = lines.reduce((s, l) => s + l.total, 0);
    return [
      `ĐƠN ĐẶT HÀNG – ${SHOP.name}`,
      `Khách: ${name} – ${phone}`,
      "",
      ...lines.map((l) => `• ${l.p.name}: ${l.qty} ${unitLabel[l.unit]} = ${fmt(l.total)}`),
      "",
      `Tạm tính: ${fmt(total)}`,
      "Nhận hàng tại cửa hàng. Tôi xác nhận đủ 18 tuổi."
    ].join("\n");
  }

  $("#send-zalo").addEventListener("click", async () => {
    const text = buildOrder();
    if (!text) return;
    try { await navigator.clipboard.writeText(text); toast("Đã sao chép đơn – dán vào Zalo để gửi"); }
    catch { window.prompt("Sao chép nội dung đơn hàng:", text); }
    window.open("https://zalo.me/" + SHOP.zalo, "_blank", "noopener");
  });

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(t) {
    const el = $("#toast");
    el.textContent = t; el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
  }

  renderProducts();
  renderCart();
})();
