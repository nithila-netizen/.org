/* ==========================================================================
   Industries explorer: industry grid → sector detail, plus topic search.
   Search matches sector/sub-sector text, keywords, and companies (so
   "hip replacement" surfaces Surgical AI, etc.).
   ========================================================================== */

mountChrome();

const view = document.getElementById("view");
const qInput = document.getElementById("q");
let query = "";

document.getElementById("db-sub").textContent =
  `${SECTORS.length} industries · ${SECTORS.reduce((n, s) => n + s.subsectors.length, 0)} sub-sectors. ` +
  `Browse how AI is reshaping each, or search a condition, sector, or company.`;

// Link a company to its deep-dive review if one exists.
function companyLink(name) {
  const c = (typeof CATALOG !== "undefined")
    ? CATALOG.find(x => x.company === name || x.name === name ||
        (x.company && name && x.company.indexOf(name) === 0)) : null;
  if (c && c.full) {
    return `<a class="comp-chip has-review" href="product.html?id=${encodeURIComponent(c.full)}">${esc(name)}<span class="comp-go">Review →</span></a>`;
  }
  return `<span class="comp-chip">${esc(name)}</span>`;
}

function adoptionMeter(a) {
  const levels = ["Early", "Emerging", "Scaling", "Mainstream"];
  const idx = levels.indexOf(a.level);
  const dots = levels.map((l, i) =>
    `<span class="ad-dot${i <= idx ? " on" : ""}" title="${esc(l)}"></span>`).join("");
  return `<div class="adoption">
    <div class="ad-top"><span class="ss-eyebrow" style="margin:0">Adoption</span><span class="ad-level">${esc(a.level)}</span></div>
    <div class="ad-track">${dots}</div>
    <p class="ad-note">${esc(a.note)}</p>
  </div>`;
}

function subsectorBlock(sub) {
  const trends = (sub.trends || []).map(t => `<li>${wrapTerms(esc(t), new Set())}</li>`).join("");
  const comps = (sub.companies || []).length
    ? `<div class="comp-chips">${sub.companies.map(companyLink).join("")}</div>`
    : `<p class="ss-coming">Company coverage coming soon.</p>`;
  return `<section class="subsector" id="${esc(sub.id)}">
    <h3>${esc(sub.name)}</h3>
    <div class="ss-grid">
      <div class="ss-main">
        <p class="ss-eyebrow">How AI is reshaping this</p>
        <p class="ss-reshaping">${wrapTerms(esc(sub.reshaping), new Set())}</p>
        <p class="ss-eyebrow" style="margin-top:26px">Trends to watch</p>
        <ul class="ss-trends">${trends}</ul>
      </div>
      <aside class="ss-side">
        ${adoptionMeter(sub.adoption)}
        <p class="ss-eyebrow" style="margin-top:24px">Companies</p>
        ${comps}
      </aside>
    </div>
  </section>`;
}

function industryGrid() {
  const cards = SECTORS.map(s => {
    const subs = s.subsectors.map(x => x.name).join(" · ");
    return `<a class="ind-card" href="reviews.html?ind=${encodeURIComponent(s.id)}">
      <h3>${esc(s.name)}</h3>
      <p>${esc(s.blurb)}</p>
      <span class="ind-subs">${esc(subs)}</span>
      <span class="ind-go">${s.subsectors.length} sub-sector${s.subsectors.length === 1 ? "" : "s"} →</span>
    </a>`;
  }).join("");
  return `<div class="ind-grid">${cards}</div>`;
}

function industryDetail(sec) {
  return `<p class="crumb"><a href="reviews.html">← All industries</a></p>
    <h2 class="ind-title">${esc(sec.name)}</h2>
    <p class="ind-blurb">${esc(sec.blurb)}</p>
    ${sec.subsectors.map(subsectorBlock).join("")}`;
}

function searchResults(q) {
  const secHits = [];
  SECTORS.forEach(sec => sec.subsectors.forEach(sub => {
    const hay = [sec.name, sub.name, sub.reshaping, (sub.trends || []).join(" "),
      (sub.keywords || []).join(" "), (sub.companies || []).join(" ")].join(" ").toLowerCase();
    if (hay.includes(q)) secHits.push({ sec, sub });
  }));
  const compHits = (typeof CATALOG !== "undefined")
    ? CATALOG.filter(c => [c.name, c.company, c.field, (c.tags || []).join(" "), c.take]
        .join(" ").toLowerCase().includes(q)) : [];

  if (!secHits.length && !compHits.length) {
    return `<p class="db-empty">No matches for “${esc(q)}”. Try a broader term, or browse the industries below.</p>${industryGrid()}`;
  }
  let html = `<p class="db-count">${secHits.length} sub-sector${secHits.length === 1 ? "" : "s"} and ${compHits.length} compan${compHits.length === 1 ? "y" : "ies"} match “${esc(q)}”.</p>`;
  if (secHits.length) {
    html += `<div class="sr-list">` + secHits.map(r =>
      `<a class="sr-row" href="reviews.html?ind=${encodeURIComponent(r.sec.id)}#${encodeURIComponent(r.sub.id)}">
        <span class="sr-cat">${esc(r.sec.name)}</span>
        <span><h3>${esc(r.sub.name)}</h3><p>${esc(r.sub.reshaping.slice(0, 140))}…</p></span>
        <span class="arrow">→</span>
      </a>`).join("") + `</div>`;
  }
  if (compHits.length) {
    html += `<p class="ss-eyebrow" style="margin-top:38px">Companies</p><div class="comp-chips">` +
      compHits.map(c => companyLink(c.company) ).join("") + `</div>`;
  }
  return html;
}

function render() {
  const ind = new URLSearchParams(location.search).get("ind");
  if (query) { view.innerHTML = searchResults(query); return; }
  if (ind) {
    const sec = SECTORS.find(s => s.id === ind);
    view.innerHTML = sec ? industryDetail(sec) : industryGrid();
    if (sec && location.hash) {
      const t = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (t) setTimeout(() => t.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
    }
    return;
  }
  view.innerHTML = industryGrid();
}

qInput.addEventListener("input", e => { query = e.target.value.trim().toLowerCase(); render(); });
render();
