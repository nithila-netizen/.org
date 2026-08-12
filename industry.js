/* ==========================================================================
   Industry page: lists an industry's sub-industries and the products in each.
   Reads ?id=<industry-id> from the URL.
   ========================================================================== */

mountChrome();

function param(name) {
  return new URLSearchParams(location.search).get(name);
}

function productCard(p) {
  const cls = p.status === "has-ai" ? "has-ai" : "adds-ai";
  const label = p.status === "has-ai" ? "AI product" : "Idea: add AI";
  return `
    <a class="tile" href="product.html?id=${encodeURIComponent(p.id)}">
      <span class="pill ${cls}">${label}</span>
      <h3>${esc(p.name)}</h3>
      <p>${esc(p.tagline)}</p>
      <span class="go">Read the review →</span>
    </a>`;
}

function render() {
  const ind = INDUSTRIES.find(i => i.id === param("id"));
  const el = document.getElementById("industry");

  if (!ind) {
    el.innerHTML = `<p class="crumb"><a href="index.html">← Home</a></p>
      <h2>Industry not found</h2>
      <p class="sub">That industry doesn't exist yet. <a href="index.html">Browse all industries →</a></p>`;
    return;
  }

  document.title = `${ind.name} — Nithila Notes`;

  const sections = ind.subIndustries.map(sub => {
    const items = PRODUCTS.filter(p => p.industry === ind.id && p.subIndustry === sub.id);
    const body = items.length
      ? `<div class="grid-cards">${items.map(productCard).join("")}</div>`
      : `<p class="sub">No products reviewed here yet — coming soon.</p>`;
    return `
      <div style="margin-top:40px">
        <p class="section-eyebrow">${esc(sub.name)}</p>
        ${body}
      </div>`;
  }).join("");

  el.innerHTML = `
    <p class="crumb"><a href="index.html">Home</a> &nbsp;/&nbsp; ${esc(ind.name)}</p>
    <div class="section-title-row">
      <div>
        <h2>${esc(ind.name)}</h2>
        <p class="sub">${esc(ind.blurb)}</p>
      </div>
    </div>
    ${sections}`;
}

render();
