/* ==========================================================================
   The database: search + filter + sort over CATALOG, with editorial ratings.
   ========================================================================== */

mountChrome();

const fields = Array.from(new Set(CATALOG.map(c => c.field))).sort();
let activeField = "All";
let query = "";
let sortBy = "rating";

// header sub + filter chips
document.getElementById("db-sub").textContent =
  `${CATALOG.length} companies reviewed and rated across ${fields.length} fields of healthcare. Search, filter, and sort — deep-dive analyses are linked where available.`;

function renderFilters() {
  const all = ["All"].concat(fields);
  document.getElementById("filters").innerHTML = all.map(f =>
    `<button class="db-chip${f === activeField ? " on" : ""}" data-field="${esc(f)}">${esc(f)}</button>`
  ).join("");
  document.querySelectorAll(".db-chip").forEach(b =>
    b.addEventListener("click", () => { activeField = b.dataset.field; renderFilters(); render(); }));
}

function matches(c) {
  if (activeField !== "All" && c.field !== activeField) return false;
  if (!query) return true;
  const hay = [c.name, c.company, c.field, c.take, (c.tags || []).join(" ")].join(" ").toLowerCase();
  return hay.includes(query);
}

function sortList(a, b) {
  if (sortBy === "az") return a.name.localeCompare(b.name);
  if (sortBy === "field") return a.field.localeCompare(b.field) || b.rating - a.rating;
  return b.rating - a.rating || a.name.localeCompare(b.name);
}

function row(c) {
  const href = c.full ? `product.html?id=${encodeURIComponent(c.full)}` : null;
  const tag = c.full ? `<span class="db-deep">Deep-dive analysis →</span>` : `<span class="db-track">Tracking</span>`;
  const inner = `
      <div class="db-main">
        <div class="db-top">
          <span class="db-field">${esc(c.field)}</span>
          <span class="db-status s-${esc(c.status)}">${esc(statusLabel(c.status))}</span>
        </div>
        <h3>${esc(c.name)} <span class="db-co">· ${esc(c.company)}</span></h3>
        <p>${esc(c.take)}</p>
        <div class="db-tags">${(c.tags || []).map(t => `<span>${esc(t)}</span>`).join("")}</div>
      </div>
      <div class="db-side">
        <span class="db-rating">${stars(c.rating)}</span>
        ${tag}
      </div>`;
  return href
    ? `<a class="db-row" href="${href}">${inner}</a>`
    : `<div class="db-row static">${inner}</div>`;
}

function render() {
  const items = CATALOG.filter(matches).sort(sortList);
  document.getElementById("count").textContent =
    `${items.length} result${items.length === 1 ? "" : "s"}${activeField !== "All" ? " in " + activeField : ""}${query ? ` for “${query}”` : ""}`;
  document.getElementById("list").innerHTML = items.length
    ? items.map(row).join("")
    : `<p class="db-empty">No matches. Try a different search or clear the filter.</p>`;
}

document.getElementById("q").addEventListener("input", e => { query = e.target.value.trim().toLowerCase(); render(); });
document.getElementById("sort").addEventListener("change", e => { sortBy = e.target.value; render(); });

renderFilters();
render();
