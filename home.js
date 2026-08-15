/* ==========================================================================
   News homepage: What's New feed, Most notable, browse by industry,
   specialty chips, and patient body-system chips.
   ========================================================================== */

mountChrome();

const byDate = (a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : b.rating - a.rating);

/* Featured lead story: strongest article, shown large */
const lead = [...CATALOG].sort((a, b) => b.rating - a.rating || byDate(a, b))[0];
if (lead) document.getElementById("lead").innerHTML =
  `<a class="lead" href="${articleHref(lead)}">
    ${coverArt(lead, true)}
    <div class="lead-body">
      <span class="lead-kicker">Featured · ${esc(lead.field)}</span>
      <h2 class="lead-idea">${wrapTerms(esc(lead.idea), new Set())}</h2>
      <p class="lead-sum">${esc((lead.summary || "").slice(0, 230))}…</p>
      <div class="lead-foot">
        <span class="signal ${esc(lead.status)}">${esc(statusLabel(lead.status))}</span>
        <span class="fcard-co">${esc(lead.company)}${lead.full ? ' <span class="idea-deep">Deep dive</span>' : ""}</span>
        <span class="idea-score">${Number(lead.rating).toFixed(1)}</span>
        <span class="fcard-date">${fmtDate(lead.date)}</span>
      </div>
    </div>
  </a>`;

/* What's new — most recent articles, horizontal scroll */
document.getElementById("whatsnew").innerHTML =
  [...CATALOG].sort(byDate).slice(0, 16).map(feedCard).join("");

/* Most notable — top rated */
document.getElementById("notable").innerHTML =
  [...CATALOG].sort((a, b) => b.rating - a.rating).slice(0, 6).map(feedCard).join("");

/* Browse by industry */
document.getElementById("areas-grid").innerHTML = SECTORS.map((s, i) => {
  const subs = s.subsectors.map(x => x.name).join(" · ");
  const n = s.subsectors.reduce((a, x) => a + ((x.items || []).length), 0);
  return `<a class="area" href="reviews.html?ind=${encodeURIComponent(s.id)}">
      <span class="no">${String(i + 1).padStart(2, "0")}</span>
      <span class="body"><h3>${esc(s.name)}</h3><p>${esc(s.blurb)}</p>
        <span class="subs">${esc(subs)} · ${n} idea${n === 1 ? "" : "s"}</span></span>
    </a>`;
}).join("");

/* Facet tallies */
function tally(key) {
  const m = {};
  CATALOG.forEach(c => (c[key] || []).forEach(v => m[v] = (m[v] || 0) + 1));
  return Object.entries(m).sort((a, b) => b[1] - a[1]);
}

/* Specialty tiles */
document.getElementById("specialty-chips").outerHTML =
  `<div class="facet-grid" id="specialty-chips">` + tally("specialties").map(([name, n]) =>
    `<a class="facet-tile" href="reviews.html?view=specialty&f=${encodeURIComponent(name)}">${esc(name)} <span class="n">${n}</span></a>`).join("") + `</div>`;

/* Patient body-system tiles */
document.getElementById("system-chips").outerHTML =
  `<div class="facet-grid" id="system-chips">` + tally("systems").map(([name, n]) =>
    `<a class="facet-tile" href="reviews.html?view=patient&f=${encodeURIComponent(name)}">${esc(name)} <span class="n">${n}</span></a>`).join("") + `</div>`;
