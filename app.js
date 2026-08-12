/* ==========================================================================
   Homepage rendering. Builds the hero, stat tiles, industry cards, and a
   sample of product review cards from data.js. Edit data.js, not this file.
   ========================================================================== */

mountChrome();

// --- Hero -------------------------------------------------------------------
document.getElementById("hero-eyebrow").textContent = SITE.heroEyebrow;
document.getElementById("hero-title").innerHTML =
  `${esc(SITE.heroTitle)} <span class="hl">${esc(SITE.heroTitleHighlight)}</span> ${esc(SITE.heroTitleTail)}`;
document.getElementById("hero-lede").textContent = SITE.heroLede;

// --- Stat tiles -------------------------------------------------------------
document.getElementById("stats-grid").innerHTML = SITE.stats.map(s => `
  <div class="stat">
    <div class="ico">${icon(s.icon)}</div>
    <div>
      <div class="num">${esc(s.num)}</div>
      <div class="label">${esc(s.label)}</div>
    </div>
  </div>`).join("");

// --- Industry cards ---------------------------------------------------------
const productsIn = id => PRODUCTS.filter(p => p.industry === id);

document.getElementById("industries-grid").innerHTML = INDUSTRIES.map(ind => {
  const count = productsIn(ind.id).length;
  const subs = ind.subIndustries.slice(0, 3)
    .map(s => `<span class="chip">${esc(s.name)}</span>`).join("");
  return `
    <a class="tile" href="industry.html?id=${encodeURIComponent(ind.id)}">
      <div class="ico">${icon(ind.icon)}</div>
      <h3>${esc(ind.name)}</h3>
      <p>${esc(ind.blurb)}</p>
      <div class="meta">${subs}</div>
      <span class="go">${ind.subIndustries.length} sub-industries · ${count} product${count === 1 ? "" : "s"} →</span>
    </a>`;
}).join("");

// --- Product review cards ---------------------------------------------------
function productCard(p) {
  const cls = p.status === "has-ai" ? "has-ai" : "adds-ai";
  const label = p.status === "has-ai" ? "AI product" : "Idea: add AI";
  const ind = INDUSTRIES.find(i => i.id === p.industry);
  return `
    <a class="tile" href="product.html?id=${encodeURIComponent(p.id)}">
      <span class="pill ${cls}">${label}</span>
      <h3>${esc(p.name)}</h3>
      <p>${esc(p.tagline)}</p>
      <div class="meta">${ind ? `<span class="chip">${esc(ind.name)}</span>` : ""}</div>
      <span class="go">Read the review →</span>
    </a>`;
}

document.getElementById("products-grid").innerHTML =
  PRODUCTS.map(productCard).join("");
