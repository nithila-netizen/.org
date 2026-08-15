/* ==========================================================================
   Browse + filter + search. Ways in:
     ?ind=<id>              industry → sub-sectors (leads with ideas)
     ?view=specialty|role|patient [&f=<value>]   faceted browse
     ?sort=new|top          all articles, sorted
     ?q=<text>              search (ideas first, then sub-sectors)
   Requires icons.js, data.js, common.js.
   ========================================================================== */

mountChrome();

const view = document.getElementById("view");
const qInput = document.getElementById("q");
const params = new URLSearchParams(location.search);
let query = (params.get("q") || "").trim().toLowerCase();
if (qInput && params.get("q")) qInput.value = params.get("q");

document.getElementById("db-sub").textContent =
  `${SECTORS.length} industries · ${SECTORS.reduce((n, s) => n + s.subsectors.length, 0)} sub-sectors · ` +
  `${CATALOG.length} articles. Browse by industry, filter by your specialty or a symptom, or search.`;

/* ---------- shared bits ---------- */
const FACET = {
  specialty: { key: "specialties", label: "Specialty", note: "Filter to your clinical field." },
  role:      { key: "roles",       label: "Who it's for", note: "Filter by who uses it." },
  patient:   { key: "systems",     label: "For patients", note: "What's new for a body system or condition." },
};

function tally(key) {
  const m = {};
  CATALOG.forEach(c => (c[key] || []).forEach(v => m[v] = (m[v] || 0) + 1));
  return Object.entries(m).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

// article card with a Follow control
function articleCard(c) {
  return `<div class="acard">
    <a class="acard-body" href="${articleHref(c)}">
      ${coverArt(c)}
      <div class="acard-inner">
        <div class="fcard-top"><span class="fcard-cat">${esc(c.field)}</span><span class="signal ${esc(c.status)}">${esc(statusLabel(c.status))}</span></div>
        <h3 class="fcard-idea">${wrapTerms(esc(c.idea), new Set())}</h3>
        <p class="acard-sum">${esc((c.summary || "").slice(0, 120))}${(c.summary || "").length > 120 ? "…" : ""}</p>
        <div class="fcard-foot"><span class="fcard-co">${esc(c.company)}${c.full ? ' <span class="idea-deep">Deep dive</span>' : ""}</span>
          <span class="fcard-meta"><span class="idea-score">${Number(c.rating).toFixed(1)}</span><span class="fcard-date">${fmtDate(c.date)}</span></span></div>
      </div>
    </a>
    ${followBtn("companies", c.company)}
  </div>`;
}

function tabBar(active) {
  const tabs = [
    ["Industries", "reviews.html"],
    ["By specialty", "reviews.html?view=specialty"],
    ["Who it's for", "reviews.html?view=role"],
    ["For patients", "reviews.html?view=patient"],
    ["Latest", "reviews.html?sort=new"],
  ];
  return `<div class="tabbar">${tabs.map(([t, h]) =>
    `<a class="tab${active === t ? " on" : ""}" href="${h}">${t}</a>`).join("")}</div>`;
}

/* ---------- idea rows (sub-sector detail) ---------- */
function ideaRow(slug) {
  const c = CBY_SLUG[slug]; if (!c) return "";
  return `<div class="idea-row-wrap">
    <a class="idea-row" href="${articleHref(c)}">
      <span class="idea-main">
        <span class="idea-text">${wrapTerms(esc(c.idea), new Set())}</span>
        <span class="idea-by">${esc(c.company)}${c.full ? ' <span class="idea-deep">Deep dive</span>' : ""}</span>
      </span>
      <span class="idea-meta"><span class="signal ${esc(c.status)}">${esc(statusLabel(c.status))}</span><span class="idea-score">${Number(c.rating).toFixed(1)}</span></span>
    </a>
    ${followBtn("companies", c.company)}
  </div>`;
}
function companyChip(name) {
  const c = CBY_COMPANY[name];
  if (c) return `<a class="comp-chip has-review" href="${articleHref(c)}">${esc(name)}</a>`;
  return `<span class="comp-chip">${esc(name)}</span>`;
}
function adoptionMeter(a) {
  const levels = ["Early", "Emerging", "Scaling", "Mainstream"];
  const idx = levels.indexOf(a.level);
  const dots = levels.map((l, i) => `<span class="ad-dot${i <= idx ? " on" : ""}" title="${esc(l)}"></span>`).join("");
  return `<div class="adoption">
    <div class="ad-top"><span class="ss-eyebrow" style="margin:0">Adoption</span><span class="ad-level">${esc(a.level)}</span></div>
    <div class="ad-track">${dots}</div><p class="ad-note">${esc(a.note)}</p></div>`;
}
function subsectorBlock(sub) {
  const trends = (sub.trends || []).map(t => `<li>${wrapTerms(esc(t), new Set())}</li>`).join("");
  const items = sub.items || [];
  const ideas = items.length ? `<div class="idea-list">${items.map(ideaRow).join("")}</div>` : `<p class="ss-coming">Coverage coming soon.</p>`;
  const comps = (sub.companies || []).length
    ? `<details class="ss-companies"><summary>Companies (${sub.companies.length})</summary><div class="comp-chips">${sub.companies.map(companyChip).join("")}</div></details>` : "";
  return `<section class="subsector" id="${esc(sub.id)}">
    <div class="ss-h"><h3>${esc(sub.name)}</h3>${followBtn("topics", "sub:" + sub.id)}</div>
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
    ${ideas}${comps}
  </section>`;
}

/* ---------- views ---------- */
function industryGrid() {
  const cards = SECTORS.map(s => {
    const subs = s.subsectors.map(x => x.name).join(" · ");
    const n = s.subsectors.reduce((a, x) => a + ((x.items || []).length), 0);
    return `<a class="ind-card" href="reviews.html?ind=${encodeURIComponent(s.id)}">
      <h3>${esc(s.name)}</h3><p>${esc(s.blurb)}</p>
      <span class="ind-subs">${esc(subs)}</span>
      <span class="ind-go">${s.subsectors.length} sub-sector${s.subsectors.length === 1 ? "" : "s"} · ${n} idea${n === 1 ? "" : "s"} →</span>
    </a>`;
  }).join("");
  return tabBar("Industries") + `<div class="ind-grid">${cards}</div>`;
}

function industryDetail(sec) {
  return `<p class="crumb"><a href="reviews.html">← All industries</a></p>
    <h2 class="ind-title">${esc(sec.name)}</h2>
    <p class="ind-blurb">${esc(sec.blurb)}</p>
    ${sec.subsectors.map(subsectorBlock).join("")}`;
}

function facetView(kind) {
  const cfg = FACET[kind]; const f = params.get("f");
  const tabName = kind === "specialty" ? "By specialty" : kind === "role" ? "Who it's for" : "For patients";
  if (f) {
    const items = CATALOG.filter(c => (c[cfg.key] || []).includes(f)).sort((a, b) => b.rating - a.rating);
    const backLabel = kind === "specialty" ? "specialties" : kind === "role" ? "audiences" : "body systems";
    return tabBar(tabName) +
      `<p class="crumb"><a href="reviews.html?view=${kind}">← All ${backLabel}</a></p>
       <div class="facet-head"><h2 class="ind-title">${esc(f)}</h2>${followBtn("topics", kind + ":" + f)}</div>
       <p class="ind-blurb">${items.length} article${items.length === 1 ? "" : "s"}.</p>
       <div class="feed-grid">${items.map(articleCard).join("")}</div>`;
  }
  const tiles = tally(cfg.key).map(([name, n]) =>
    `<a class="facet-tile" href="reviews.html?view=${kind}&f=${encodeURIComponent(name)}">${esc(name)} <span class="n">${n}</span></a>`).join("");
  return tabBar(tabName) + `<p class="facet-note">${esc(cfg.note)}</p><div class="facet-grid">${tiles}</div>`;
}

function sortedList(sort) {
  const items = [...CATALOG].sort(sort === "top"
    ? (a, b) => b.rating - a.rating
    : (a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : b.rating - a.rating));
  return tabBar(sort === "top" ? "" : "Latest") +
    `<h2 class="ind-title">${sort === "top" ? "Top rated" : "Latest articles"}</h2>
     <p class="ind-blurb">${items.length} articles.</p>
     <div class="feed-grid">${items.map(articleCard).join("")}</div>`;
}

function searchResults(q) {
  const secHits = []; const subMatchSlugs = new Set();
  SECTORS.forEach(sec => sec.subsectors.forEach(sub => {
    const hay = [sec.name, sub.name, sub.reshaping, (sub.trends || []).join(" "), (sub.keywords || []).join(" ")].join(" ").toLowerCase();
    if (hay.includes(q)) { secHits.push({ sec, sub }); (sub.items || []).forEach(s => subMatchSlugs.add(s)); }
  }));
  const ideaHits = CATALOG.filter(c => subMatchSlugs.has(c.slug) ||
    [c.name, c.company, c.field, (c.tags || []).join(" "), c.idea, c.summary,
     (c.specialties || []).join(" "), (c.systems || []).join(" "),
     (c.capabilities || []).join(" "), c.verdict].join(" ").toLowerCase().includes(q));

  if (!ideaHits.length && !secHits.length)
    return `<p class="db-empty">No matches for “${esc(q)}”. Try a broader term, or browse below.</p>${industryGrid()}`;

  let html = `<p class="db-count">${ideaHits.length} article${ideaHits.length === 1 ? "" : "s"} and ${secHits.length} sub-sector${secHits.length === 1 ? "" : "s"} match “${esc(q)}”.</p>`;
  if (ideaHits.length)
    html += `<div class="feed-grid">${ideaHits.sort((a, b) => b.rating - a.rating).map(articleCard).join("")}</div>`;
  if (secHits.length)
    html += `<p class="ss-eyebrow ss-ideas-h" style="margin-top:34px">Related sub-sectors</p><div class="sr-list">` +
      secHits.map(r => `<a class="sr-row" href="reviews.html?ind=${encodeURIComponent(r.sec.id)}#${encodeURIComponent(r.sub.id)}">
        <span class="sr-cat">${esc(r.sec.name)}</span>
        <span><h3>${esc(r.sub.name)}</h3><p>${esc(r.sub.reshaping.slice(0, 140))}…</p></span>
        <span class="arrow">→</span></a>`).join("") + `</div>`;
  return html;
}

/* ---------- router ---------- */
function render() {
  if (query) { view.innerHTML = searchResults(query); return; }
  const vw = params.get("view"), sort = params.get("sort"), ind = params.get("ind");
  if (vw && FACET[vw]) { view.innerHTML = facetView(vw); return; }
  if (sort) { view.innerHTML = sortedList(sort); return; }
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

if (qInput) qInput.addEventListener("input", e => {
  query = e.target.value.trim().toLowerCase();
  // reflect in URL without reload
  const u = new URL(location); if (query) u.searchParams.set("q", e.target.value); else u.searchParams.delete("q");
  history.replaceState({}, "", u);
  render();
});
render();
