/* ==========================================================================
   Idea review page: one catalog item, presented by its idea.
   Reads a CATALOG entry by ?id=<slug>. Requires icons.js + data.js.
   ========================================================================== */

mountChrome();

const el = document.getElementById("review");
const slug = new URLSearchParams(location.search).get("id");
const item = (typeof CATALOG !== "undefined") ? CATALOG.find(c => c.slug === slug) : null;

// Which sector / sub-sector does this idea live in? (for the breadcrumb)
function locate(s) {
  if (typeof SECTORS === "undefined") return null;
  for (const sec of SECTORS)
    for (const sub of sec.subsectors)
      if ((sub.items || []).includes(s)) return { sec, sub };
  return null;
}

function list(items, cls) {
  return (items && items.length)
    ? `<ul class="${cls}">${items.map(x => `<li>${wrapTerms(esc(x), new Set())}</li>`).join("")}</ul>` : "";
}

function metaRow(k, v, isLink) {
  if (!v) return "";
  const val = isLink
    ? `<a href="${esc(v)}" target="_blank" rel="noopener">${esc(v.replace(/^https?:\/\//, ""))} ${icon("external")}</a>`
    : esc(v);
  return `<div class="rv-meta-row"><dt>${esc(k)}</dt><dd>${val}</dd></div>`;
}

function render(p) {
  const loc = locate(p.slug);
  const crumb = loc
    ? `<a href="reviews.html?ind=${encodeURIComponent(loc.sec.id)}#${encodeURIComponent(loc.sub.id)}">← ${esc(loc.sub.name)}</a>`
    : `<a href="reviews.html">← Industries</a>`;

  const deep = p.full
    ? `<a class="rv-deep" href="product.html?id=${encodeURIComponent(p.full)}">Read the full deep-dive review ${icon("arrow")}</a>` : "";

  const dateStr = p.date ? fmtDate(p.date) : "";
  el.innerHTML = `
    <p class="crumb">${crumb}</p>
    <p class="rv-eyebrow">${esc(p.field)}${dateStr ? ` · ${esc(dateStr)}` : ""}</p>
    <h1 class="rv-idea">${wrapTerms(esc(p.idea), new Set())}</h1>
    <div class="rv-who-row">
      <p class="rv-who">${esc(p.company)}${p.name && p.name !== p.company ? ` · ${esc(p.name)}` : ""}</p>
      <div class="rv-actions">
        ${followBtn("companies", p.company, "Follow " + p.company)}
        ${loc ? followBtn("topics", "sub:" + loc.sub.id, "Follow topic") : ""}
      </div>
    </div>

    <div class="rv-strip">
      <div><span class="rv-k">Category</span><span class="rv-v">${esc(p.field)}</span></div>
      <div><span class="rv-k">Status</span><span class="signal ${esc(p.status)}">${esc(statusLabel(p.status))}</span></div>
    </div>

    ${p.summary ? `<p class="rv-summary">${wrapTerms(esc(p.summary), new Set())}</p>` : ""}

    ${p.capabilities && p.capabilities.length ? `<h2 class="rv-h">What it does</h2>${list(p.capabilities, "rv-caps")}` : ""}

    ${(p.pros && p.pros.length) || (p.cons && p.cons.length) ? `
      <div class="rv-pc">
        ${p.pros && p.pros.length ? `<div class="rv-pros"><h3>Strengths</h3>${list(p.pros, "rv-ul")}</div>` : ""}
        ${p.cons && p.cons.length ? `<div class="rv-cons"><h3>Watch-outs</h3>${list(p.cons, "rv-ul")}</div>` : ""}
      </div>` : ""}

    ${p.verdict ? `<div class="rv-verdict"><span class="rv-k">Verdict</span><p>${wrapTerms(esc(p.verdict), new Set())}</p></div>` : ""}

    <dl class="rv-meta">
      ${metaRow("Best for", p.bestFor)}
      ${metaRow("Regulatory", p.regulatory)}
      ${metaRow("Founded", p.founded)}
      ${metaRow("Headquarters", p.hq)}
      ${metaRow("Pricing", p.pricing)}
      ${metaRow("Website", p.website, true)}
    </dl>

    ${deep}

    <p class="rv-disclaimer">Independent review for general information, not medical, legal, or purchasing advice. No affiliation with the company. Rating and verdict are opinions.</p>
  `;
  document.title = `${p.company} · Vitai`;
}

if (!item) {
  el.innerHTML = `<p class="crumb"><a href="reviews.html">← Industries</a></p>
    <h1 class="ind-title">Review not found</h1>
    <p class="ind-blurb">That idea does not exist yet. <a href="reviews.html">Browse the industries →</a></p>`;
} else {
  render(item);
}
