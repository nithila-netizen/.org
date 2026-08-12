/* ==========================================================================
   Product review page. Reads ?id=<product-id> and renders the review:
   an independent-review header, prototype hero, blog-style body, key
   capabilities, the Nithila verdict, editorial quote, "at a glance" sidebar,
   and related reviews. Edit data.js for content.
   ========================================================================== */

mountChrome();

function param(name) { return new URLSearchParams(location.search).get(name); }

function capHTML(text) {
  return `<div class="cap">${icon("check")}<span>${esc(text)}</span></div>`;
}
function heroHTML(hero) {
  if (!hero || !hero.img) return "";
  const cap = hero.caption ? `<figcaption>${esc(hero.caption)}</figcaption>` : "";
  return `<figure class="hero-shot"><div class="frame"><img src="${esc(hero.img)}" alt="${esc(hero.caption || "")}" /></div>${cap}</figure>`;
}
// --- Glossary tooltips: auto-wrap known terms (first use per article) -------
const _terms = (typeof GLOSSARY !== "undefined")
  ? Object.keys(GLOSSARY).sort((a, b) => b.length - a.length) : [];
function _reEsc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
function wrapTerms(escaped, used) {
  let out = escaped;
  for (const term of _terms) {
    const key = term.toLowerCase();
    if (used.has(key)) continue;
    try {
      const re = new RegExp("(^|[^A-Za-z0-9])(" + _reEsc(term) + ")(?![A-Za-z0-9])", "i");
      const m = re.exec(out);
      if (!m) continue;
      const start = m.index + m[1].length;
      const span = `<span class="term" tabindex="0" data-def="${esc(GLOSSARY[term])}">${m[2]}</span>`;
      out = out.slice(0, start) + span + out.slice(start + m[2].length);
      used.add(key);
    } catch (e) { /* older browsers: skip this term */ }
  }
  return out;
}

function articleHTML(blocks) {
  if (!blocks || !blocks.length) return "";
  const used = new Set();
  const parts = blocks.map((b, i) => {
    const h = b.heading ? `<h2>${esc(b.heading)}</h2>` : "";
    const ps = (b.body || []).map((p, j) => {
      const html = wrapTerms(esc(p), used);
      return (i === 0 && j === 0) ? `<p class="lead">${html}</p>` : `<p>${html}</p>`;
    }).join("");
    const fig = (b.image && b.image.src)
      ? `<figure><img src="${esc(b.image.src)}" alt="${esc(b.image.caption || "")}" />${b.image.caption ? `<figcaption>${esc(b.image.caption)}</figcaption>` : ""}</figure>`
      : "";
    return h + ps + fig;
  }).join("");
  return `<div class="article-prose">${parts}</div>`;
}

function exploreHTML(list) {
  if (!list || !list.length) return "";
  const chips = list.map(item => {
    const label = typeof item === "string" ? item : item.label;
    const url = (item && item.url) ? item.url
      : "https://www.google.com/search?q=" + encodeURIComponent(label);
    return `<a class="explore-chip" href="${esc(url)}" target="_blank" rel="noopener">${esc(label)}</a>`;
  }).join("");
  return `<div class="explore">
    <p class="block-label">Terms &amp; tools to explore</p>
    <p style="font-family:var(--sans);font-size:13px;color:var(--muted);margin:-8px 0 16px">Tap a highlighted word in the article for a quick definition — or click any of these to research it yourself.</p>
    <div class="explore-chips">${chips}</div>
  </div>`;
}
function vItem(iconName, text) { return `<li>${icon(iconName)}<span>${esc(text)}</span></li>`; }
function glanceRow(iconName, key, value) {
  if (!value) return "";
  return `<div class="row">${icon(iconName)}<div><div class="k">${esc(key)}</div><div class="v">${esc(value)}</div></div></div>`;
}
function relatedRow(p) {
  const ind = INDUSTRIES.find(i => i.id === p.industry);
  return `
    <a class="review-row" href="product.html?id=${encodeURIComponent(p.id)}">
      <span class="cat">${esc(ind ? ind.name : "Review")}</span>
      <span><h3>${esc(p.name)}</h3><p>${esc(p.tagline)}</p></span>
      <span class="arrow">→</span>
    </a>`;
}

function render() {
  const p = PRODUCTS.find(x => x.id === param("id"));
  const el = document.getElementById("product");

  if (!p) {
    el.innerHTML = `<p class="crumb"><a href="index.html">← Home</a></p>
      <div class="measure"><h1>Review not found</h1>
      <p class="tagline">That review doesn't exist yet. <a href="index.html">Back home →</a></p></div>`;
    return;
  }

  document.title = `${p.name} — Nithila Notes`;

  const ind = INDUSTRIES.find(i => i.id === p.industry);
  const sub = ind && ind.subIndustries.find(s => s.id === p.subIndustry);
  const crumb = [
    `<a href="index.html">Home</a>`,
    ind ? `<a href="industry.html?id=${encodeURIComponent(ind.id)}">${esc(ind.name)}</a>` : "",
    sub ? esc(sub.name) : "",
  ].filter(Boolean).join(" &nbsp;·&nbsp; ");

  const g = p.glance || {};
  const website = g.website
    ? `<a class="visit" href="${esc(g.website)}" target="_blank" rel="noopener">Visit website ${icon("external")}</a>` : "";
  const related = PRODUCTS.filter(x => x.industry === p.industry && x.id !== p.id);

  el.innerHTML = `
    <p class="crumb">${crumb}</p>

    <div class="measure">
      <p class="kicker">Nithila Notes · Independent review</p>
      <h1>${esc(p.name)}</h1>
      <p class="tagline">${esc(p.tagline)}</p>
      <div class="disclaimer-bar">An independent review and personal product opinion — not affiliated with, sponsored by, or endorsed by the companies discussed.</div>
    </div>

    <div class="product-layout">
      <div>
        ${heroHTML(p.hero)}
        ${articleHTML(p.article)}

        <p class="block-label">Key capabilities</p>
        <div class="cap-grid">${(p.capabilities || []).map(capHTML).join("")}</div>

        <p class="eyebrow">Our verdict</p>
        <h2 style="font-family:var(--display);font-weight:500;font-size:32px;letter-spacing:-0.02em;margin:0 0 22px">The Nithila verdict</h2>
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

        ${p.quote ? `<div class="quote"><p>“${esc(p.quote)}”</p><div class="attrib">My take · Nithila Notes</div></div>` : ""}
        ${exploreHTML(p.explore)}
      </div>

      <aside>
        <div class="glance">
          <h3>At a glance</h3>
          ${glanceRow("building", "Subject", g.company)}
          ${glanceRow("calendar", "Founded", g.founded)}
          ${glanceRow("pin", "Headquarters", g.headquarters)}
          ${glanceRow("shield", "Regulatory", g.regulatory)}
          ${glanceRow("tag", "Pricing model", g.pricing)}
          ${website}
          <p class="note">Details reflect my own editorial research and may be outdated. Verify capabilities, pricing, and regulatory claims directly with the vendor.</p>
        </div>
      </aside>
    </div>

    ${related.length ? `
    <div style="margin-top:72px">
      <p class="eyebrow">More in ${esc(ind ? ind.name : "this area")}</p>
      <h2 style="font-family:var(--display);font-weight:500;font-size:28px;letter-spacing:-0.02em;margin:0 0 8px">Related reviews</h2>
      <div class="reviews">${related.map(relatedRow).join("")}</div>
    </div>` : ""}
  `;
}

render();
