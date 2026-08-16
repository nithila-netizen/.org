/* ==========================================================================
   Review article page: one company, presented as a crafted editorial piece.
   Reads a CATALOG entry by ?id=<slug>. Requires icons.js, data.js, common.js.
   ========================================================================== */

mountChrome();

const el = document.getElementById("review");
const slug = new URLSearchParams(location.search).get("id");
const item = (typeof CATALOG !== "undefined") ? CATALOG.find(c => c.slug === slug) : null;

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
    ? `<a href="${esc(v)}" target="_blank" rel="noopener">${esc(String(v).replace(/^https?:\/\//, "").replace(/\/$/, ""))} ${icon("external")}</a>`
    : esc(v);
  return `<div class="rv-meta-row"><dt>${esc(k)}</dt><dd>${val}</dd></div>`;
}

function render(p) {
  const loc = locate(p.slug);
  const st = indStyle(p.field);
  const dateStr = p.date ? fmtDate(p.date) : "";
  const crumb = loc
    ? `<a href="reviews.html?ind=${encodeURIComponent(loc.sec.id)}&sub=${encodeURIComponent(loc.sub.id)}">${esc(loc.sub.name)}</a>`
    : `<a href="reviews.html">Industries</a>`;

  // "More in this sub-sector" — keeps readers moving through the site
  let related = "";
  if (loc) {
    const others = (loc.sub.items || []).filter(s => s !== p.slug).map(s => CBY_SLUG[s]).filter(Boolean).slice(0, 3);
    if (others.length) related = `<section class="rv-related">
      <div class="rv-related-head"><h2>More in ${esc(loc.sub.name)}</h2>
        <a class="link" href="reviews.html?ind=${encodeURIComponent(loc.sec.id)}&sub=${encodeURIComponent(loc.sub.id)}">See all →</a></div>
      <div class="feed-grid">${others.map(feedCard).join("")}</div></section>`;
  }

  const deep = p.full
    ? `<a class="rv-deep" href="product.html?id=${encodeURIComponent(p.full)}">Read the deep-dive ${icon("arrow")}</a>` : "";

  el.innerHTML = `
    <article class="rv">
      <header class="rv-hero" style="--ic:${st[0]};--ic2:${st[1]}">
        <div class="rv-hero-body">
          <p class="rv-crumb"><a href="reviews.html">Vitai</a> <span>›</span> ${crumb}</p>
          <span class="signal ${esc(p.status)} rv-badge">${esc(statusLabel(p.status))}</span>
          <h1 class="rv-idea">${wrapTerms(esc(p.idea), new Set())}</h1>
          <p class="rv-byline">${esc(p.company)}${p.name && p.name !== p.company ? ` · ${esc(p.name)}` : ""}${dateStr ? ` · ${esc(dateStr)}` : ""}</p>
        </div>
        <div class="rv-hero-logo">${logoBadge(p, 92)}</div>
      </header>

      <div class="rv-cols">
        <div class="rv-article">
          ${p.summary ? `<p class="rv-lede">${wrapTerms(esc(p.summary), new Set())}</p>` : ""}
          ${p.capabilities && p.capabilities.length ? `<h2 class="rv-h">What it does</h2>${list(p.capabilities, "rv-caps")}` : ""}
          ${(p.pros && p.pros.length) || (p.cons && p.cons.length) ? `
            <div class="rv-pc">
              ${p.pros && p.pros.length ? `<div class="rv-pros"><h3>Strengths</h3>${list(p.pros, "rv-ul")}</div>` : ""}
              ${p.cons && p.cons.length ? `<div class="rv-cons"><h3>Watch-outs</h3>${list(p.cons, "rv-ul")}</div>` : ""}
            </div>` : ""}
          ${p.verdict ? `<figure class="rv-verdict"><span class="rv-quote-mark" style="color:${st[0]}">“</span>
            <blockquote>${wrapTerms(esc(p.verdict), new Set())}</blockquote>
            <figcaption>The Vitai verdict</figcaption></figure>` : ""}
        </div>

        <aside class="rv-side">
          <div class="rv-glance">
            <p class="rv-glance-h">At a glance</p>
            <dl class="rv-meta">
              <div class="rv-meta-row"><dt>Category</dt><dd>${esc(p.field)}</dd></div>
              ${metaRow("Best for", p.bestFor)}
              ${metaRow("Regulatory", p.regulatory)}
              ${metaRow("Founded", p.founded)}
              ${metaRow("HQ", p.hq)}
              ${metaRow("Pricing", p.pricing)}
              ${metaRow("Website", p.website, true)}
            </dl>
            ${p.website ? `<a class="rv-visit" href="${esc(p.website)}" target="_blank" rel="noopener">Visit ${esc(p.company)} ${icon("external")}</a>` : ""}
          </div>
          <div class="rv-follow-box">
            <p class="rv-glance-h">Follow</p>
            <div class="rv-follow-btns">
              ${followBtn("companies", p.company, "Follow " + p.company)}
              ${loc ? followBtn("topics", "sub:" + loc.sub.id, "Follow " + loc.sub.name) : ""}
            </div>
          </div>
          ${deep}
        </aside>
      </div>

      ${related}
      <p class="rv-disclaimer">An independent Vitai review for general information, not medical, legal, or purchasing advice. No affiliation with, sponsorship by, or endorsement from the company. Views are opinions.</p>
    </article>
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
