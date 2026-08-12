/* ==========================================================================
   Product review page. Reads ?id=<product-id>, renders Key capabilities,
   The Nithila verdict (strengths / watch-outs), the editorial quote, the
   "At a glance" sidebar, and Related products.
   ========================================================================== */

mountChrome();

function param(name) {
  return new URLSearchParams(location.search).get(name);
}

function capHTML(text) {
  return `<div class="cap">${icon("check")}<span>${esc(text)}</span></div>`;
}
function vItem(iconName, text) {
  return `<li>${icon(iconName)}<span>${esc(text)}</span></li>`;
}
function glanceRow(iconName, key, value) {
  if (!value) return "";
  return `<div class="row">${icon(iconName)}<div><div class="k">${esc(key)}</div><div class="v">${esc(value)}</div></div></div>`;
}

function relatedCard(p) {
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
  const p = PRODUCTS.find(x => x.id === param("id"));
  const el = document.getElementById("product");

  if (!p) {
    el.innerHTML = `<p class="crumb"><a href="index.html">← Home</a></p>
      <h1>Product not found</h1>
      <p class="tagline">That review doesn't exist yet. <a href="index.html">Browse all products →</a></p>`;
    return;
  }

  document.title = `${p.name} — Nithila Notes`;

  const ind = INDUSTRIES.find(i => i.id === p.industry);
  const sub = ind && ind.subIndustries.find(s => s.id === p.subIndustry);
  const crumb = [
    `<a href="index.html">Home</a>`,
    ind ? `<a href="industry.html?id=${encodeURIComponent(ind.id)}">${esc(ind.name)}</a>` : "",
    sub ? esc(sub.name) : "",
  ].filter(Boolean).join(" &nbsp;/&nbsp; ");

  const g = p.glance || {};
  const website = g.website
    ? `<a class="visit" href="${esc(g.website)}" target="_blank" rel="noopener">Visit website ${icon("external")}</a>`
    : "";

  const related = PRODUCTS.filter(x => x.industry === p.industry && x.id !== p.id);

  el.innerHTML = `
    <p class="crumb">${crumb}</p>
    <div class="product-head">
      <h1>${esc(p.name)}</h1>
      <p class="tagline">${esc(p.tagline)}</p>
    </div>

    <div class="product-layout">
      <div>
        <p class="block-title">Key capabilities</p>
        <div class="cap-grid">${(p.capabilities || []).map(capHTML).join("")}</div>

        <p class="section-eyebrow">Our review</p>
        <h2 style="font-size:30px;font-weight:800;letter-spacing:-0.02em;margin:0 0 20px">The Nithila verdict</h2>
        <div class="verdict-grid">
          <div class="vcard strengths">
            <h4>Strengths</h4>
            <ul class="vlist">${(p.strengths || []).map(s => vItem("check", s)).join("")}</ul>
          </div>
          <div class="vcard watchouts">
            <h4>Watch-outs</h4>
            <ul class="vlist">${(p.watchOuts || []).map(s => vItem("minus", s)).join("")}</ul>
          </div>
        </div>

        ${p.quote ? `
        <div class="quote">
          <p>“${esc(p.quote)}”</p>
          <div class="attrib">Nithila Notes editorial review</div>
        </div>` : ""}
      </div>

      <aside>
        <div class="glance">
          <h3>At a glance</h3>
          ${glanceRow("building", "Company", g.company)}
          ${glanceRow("calendar", "Founded", g.founded)}
          ${glanceRow("pin", "Headquarters", g.headquarters)}
          ${glanceRow("shield", "Regulatory", g.regulatory)}
          ${glanceRow("tag", "Pricing model", g.pricing)}
          ${website}
          <p class="disclaimer">Details reflect our editorial research and may be outdated. Verify capabilities, pricing, and regulatory claims directly with the vendor.</p>
        </div>
      </aside>
    </div>

    ${related.length ? `
    <div style="margin-top:64px">
      <p class="section-eyebrow">Compare</p>
      <h2 style="font-size:30px;font-weight:800;letter-spacing:-0.02em;margin:0 0 24px">Related products</h2>
      <div class="grid-cards">${related.map(relatedCard).join("")}</div>
    </div>` : ""}
  `;
}

render();
