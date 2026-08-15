/* ==========================================================================
   Following: companies + topics saved on this device, with a filter bar so
   you can jump straight to one follow. Requires common.js.
   ========================================================================== */

mountChrome();
const el = document.getElementById("following");
let activeFilter = { type: "all" };

// resolve a topic id ("sub:x" | "specialty:y" | "role:y" | "patient:y") to label + link + articles
function resolveTopic(id) {
  const [kind, ...rest] = id.split(":"); const val = rest.join(":");
  if (kind === "sub") {
    for (const sec of SECTORS) for (const sub of sec.subsectors)
      if (sub.id === val) return { label: sub.name, context: sec.name,
        href: `reviews.html?ind=${encodeURIComponent(sec.id)}#${encodeURIComponent(sub.id)}`, slugs: sub.items || [] };
    return null;
  }
  const key = kind === "specialty" ? "specialties" : kind === "role" ? "roles" : "systems";
  const ctx = { specialty: "Specialty", role: "Audience", patient: "Body system" }[kind] || kind;
  return { label: val, context: ctx, href: `reviews.html?view=${kind}&f=${encodeURIComponent(val)}`,
    slugs: CATALOG.filter(c => (c[key] || []).includes(val)).map(c => c.slug) };
}

const byDate = (a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : b.rating - a.rating);

function render() {
  const f = getFollows();
  const companies = f.companies.map(n => CBY_COMPANY[n]).filter(Boolean);
  const topics = f.topics.map(id => { const t = resolveTopic(id); return t ? { id, ...t } : null; }).filter(Boolean);

  if (!companies.length && !topics.length) {
    el.innerHTML = `<div class="follow-empty">
      <h2>You're not following anything yet.</h2>
      <p>Tap <strong>Follow</strong> on any company or topic and it shows up here, newest first.</p>
      <a class="btn btn-solid" href="reviews.html">Browse the industries</a></div>`;
    return;
  }

  // which slugs to show for the active filter
  let slugs;
  if (activeFilter.type === "company") slugs = [CBY_COMPANY[activeFilter.name]?.slug].filter(Boolean);
  else if (activeFilter.type === "topic") slugs = (topics.find(t => t.id === activeFilter.id) || {}).slugs || [];
  else { const s = new Set(companies.map(c => c.slug)); topics.forEach(t => t.slugs.forEach(x => s.add(x))); slugs = [...s]; }
  const articles = slugs.map(s => CBY_SLUG[s]).filter(Boolean).sort(byDate);

  // filter bar
  const chip = (label, on, attrs) => `<button class="fbar-chip${on ? " on" : ""}" ${attrs}>${esc(label)}</button>`;
  let bar = `<div class="fbar">`;
  bar += chip("All", activeFilter.type === "all", `data-fl="all"`);
  companies.forEach(c => bar += chip(c.company, activeFilter.type === "company" && activeFilter.name === c.company, `data-fl="company" data-v="${esc(c.company)}"`));
  topics.forEach(t => bar += chip(t.label, activeFilter.type === "topic" && activeFilter.id === t.id, `data-fl="topic" data-v="${esc(t.id)}"`));
  bar += `</div>`;

  let html = `<div class="foll-stat">${companies.length} compan${companies.length === 1 ? "y" : "ies"} · ${topics.length} topic${topics.length === 1 ? "" : "s"} followed</div>`;
  html += bar;
  html += `<div class="feed-grid">${articles.map(feedCard).join("") || '<p class="db-empty">Nothing here yet.</p>'}</div>`;

  html += `<details class="foll-manage" open><summary>Manage follows</summary>`;
  html += `<h3 class="foll-h">Companies (${companies.length})</h3><div class="foll-chips">` +
    (companies.map(c => `<span class="foll-chip"><a href="${articleHref(c)}">${esc(c.company)}</a>${followBtn("companies", c.company)}</span>`).join("") || "<span class='db-empty'>None yet.</span>") + `</div>`;
  html += `<h3 class="foll-h">Topics (${topics.length})</h3><div class="foll-chips">` +
    (topics.map(t => `<span class="foll-chip"><a href="${t.href}">${esc(t.label)}</a>${followBtn("topics", t.id)}</span>`).join("") || "<span class='db-empty'>None yet.</span>") + `</div></details>`;

  el.innerHTML = html;
}

// filter-bar clicks
el.addEventListener("click", e => {
  const c = e.target.closest(".fbar-chip"); if (!c) return;
  const fl = c.dataset.fl;
  activeFilter = fl === "company" ? { type: "company", name: c.dataset.v }
    : fl === "topic" ? { type: "topic", id: c.dataset.v } : { type: "all" };
  render();
});
// re-render after any follow toggle
document.addEventListener("click", e => { if (e.target.closest(".follow-btn")) setTimeout(render, 0); });
render();
