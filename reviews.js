/* ==========================================================================
   Industries explorer: industry grid → sector detail, plus topic search.
   Each sub-sector leads with the IDEAS reviewed there (clickable), with the
   company list kept as a secondary reference. Search matches idea text,
   sub-sector text, keywords, and companies (so "hip replacement" surfaces
   Surgical AI, arthroplasty ideas, etc.).
   ========================================================================== */

mountChrome();

const view = document.getElementById("view");
const qInput = document.getElementById("q");
let query = "";

/* ---- catalog lookups ---- */
const CAT_BY_SLUG = {};
const CAT_BY_COMPANY = {};
if (typeof CATALOG !== "undefined") {
  CATALOG.forEach(c => {
    CAT_BY_SLUG[c.slug] = c;
    if (!CAT_BY_COMPANY[c.company]) CAT_BY_COMPANY[c.company] = c;
  });
}

const totalIdeas = (typeof CATALOG !== "undefined") ? CATALOG.length : 0;
document.getElementById("db-sub").textContent =
  `${SECTORS.length} industries · ${SECTORS.reduce((n, s) => n + s.subsectors.length, 0)} sub-sectors · ` +
  `${totalIdeas} ideas reviewed. Browse how AI is reshaping each, or search a condition, sector, or company.`;

function hrefFor(c) {
  return c.full ? `product.html?id=${encodeURIComponent(c.full)}` : `review.html?id=${encodeURIComponent(c.slug)}`;
}

// Primary: an idea, identified by its concept and clickable to its review.
function ideaRow(slug) {
  const c = CAT_BY_SLUG[slug];
  if (!c) return "";
  return `<a class="idea-row" href="${hrefFor(c)}">
    <span class="idea-main">
      <span class="idea-text">${wrapTerms(esc(c.idea), new Set())}</span>
      <span class="idea-by">${esc(c.company)}${c.full ? ' <span class="idea-deep">Deep dive</span>' : ""}</span>
    </span>
    <span class="idea-meta">
      <span class="signal ${esc(c.status)}">${esc(statusLabel(c.status))}</span>
      <span class="idea-score">${Number(c.rating).toFixed(1)}</span>
    </span>
  </a>`;
}

// Secondary: a company chip, clickable to its idea.
function companyChip(name) {
  const c = CAT_BY_COMPANY[name];
  if (c) return `<a class="comp-chip has-review" href="${hrefFor(c)}">${esc(name)}</a>`;
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
  const items = sub.items || [];
  const ideas = items.length
    ? `<div class="idea-list">${items.map(ideaRow).join("")}</div>`
    : `<p class="ss-coming">Coverage coming soon.</p>`;
  const comps = (sub.companies || []).length
    ? `<details class="ss-companies"><summary>Companies (${sub.companies.length})</summary>
        <div class="comp-chips">${sub.companies.map(companyChip).join("")}</div></details>`
    : "";
  return `<section class="subsector" id="${esc(sub.id)}">
    <h3>${esc(sub.name)}</h3>
    <div class="ss-grid">
      <div class="ss-main">
        <p class="ss-eyebrow">How AI is reshaping this</p>
        <p class="ss-reshaping">${wrapTerms(esc(sub.reshaping), new Set())}</p>
        <p class="ss-eyebrow" style="margin-top:26px">Trends to watch</p>
        <ul class="ss-trends">${trends}</ul>
      </div>
      <aside class="ss-side">${adoptionMeter(sub.adoption)}</aside>
    </div>
    <p class="ss-eyebrow ss-ideas-h">Ideas reviewed here${items.length ? ` (${items.length})` : ""}</p>
    ${ideas}
    ${comps}
  </section>`;
}

function industryGrid() {
  const cards = SECTORS.map(s => {
    const subs = s.subsectors.map(x => x.name).join(" · ");
    const n = s.subsectors.reduce((a, x) => a + ((x.items || []).length), 0);
    return `<a class="ind-card" href="reviews.html?ind=${encodeURIComponent(s.id)}">
      <h3>${esc(s.name)}</h3>
      <p>${esc(s.blurb)}</p>
      <span class="ind-subs">${esc(subs)}</span>
      <span class="ind-go">${s.subsectors.length} sub-sector${s.subsectors.length === 1 ? "" : "s"} · ${n} idea${n === 1 ? "" : "s"} →</span>
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
  // Sub-sectors: match name/reshaping/trends/keywords (keywords carry synonyms).
  const secHits = [];
  const subMatchSlugs = new Set();
  SECTORS.forEach(sec => sec.subsectors.forEach(sub => {
    const hay = [sec.name, sub.name, sub.reshaping, (sub.trends || []).join(" "),
      (sub.keywords || []).join(" ")].join(" ").toLowerCase();
    if (hay.includes(q)) { secHits.push({ sec, sub }); (sub.items || []).forEach(s => subMatchSlugs.add(s)); }
  }));

  // Ideas (primary): direct full-text matches, plus every idea in a matched
  // sub-sector — so a synonym hit (e.g. "hip replacement") surfaces the actual reviews.
  const ideaHits = (typeof CATALOG !== "undefined") ? CATALOG.filter(c =>
    subMatchSlugs.has(c.slug) ||
    [c.name, c.company, c.field, (c.tags || []).join(" "), c.idea, c.summary,
     (c.capabilities || []).join(" "), c.verdict].join(" ").toLowerCase().includes(q)) : [];

  if (!ideaHits.length && !secHits.length) {
    return `<p class="db-empty">No matches for “${esc(q)}”. Try a broader term, or browse the industries below.</p>${industryGrid()}`;
  }

  let html = `<p class="db-count">${ideaHits.length} idea${ideaHits.length === 1 ? "" : "s"} and ${secHits.length} sub-sector${secHits.length === 1 ? "" : "s"} match “${esc(q)}”.</p>`;
  if (ideaHits.length) {
    html += `<p class="ss-eyebrow ss-ideas-h">Ideas</p><div class="idea-list">` +
      ideaHits.sort((a, b) => b.rating - a.rating).map(c => ideaRow(c.slug)).join("") + `</div>`;
  }
  if (secHits.length) {
    html += `<p class="ss-eyebrow ss-ideas-h" style="margin-top:34px">Sub-sectors</p><div class="sr-list">` +
      secHits.map(r =>
        `<a class="sr-row" href="reviews.html?ind=${encodeURIComponent(r.sec.id)}#${encodeURIComponent(r.sub.id)}">
          <span class="sr-cat">${esc(r.sec.name)}</span>
          <span><h3>${esc(r.sub.name)}</h3><p>${esc(r.sub.reshaping.slice(0, 140))}…</p></span>
          <span class="arrow">→</span>
        </a>`).join("") + `</div>`;
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
