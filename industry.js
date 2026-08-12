/* ==========================================================================
   Industry page: lists an industry's sub-industries and the reviews in each.
   Reads ?id=<industry-id> from the URL.
   ========================================================================== */

mountChrome();

function param(name) { return new URLSearchParams(location.search).get(name); }

function reviewCard(p) {
  return `
    <a class="card" href="product.html?id=${encodeURIComponent(p.id)}">
      <span class="cat">Review</span>
      <h3>${esc(p.name)}</h3>
      <p>${esc(p.tagline)}</p>
      <span class="go">Read the review →</span>
    </a>`;
}

function render() {
  const ind = INDUSTRIES.find(i => i.id === param("id"));
  const el = document.getElementById("industry");

  if (!ind) {
    el.innerHTML = `<p class="crumb"><a href="index.html">← Home</a></p>
      <h2>Area not found</h2>
      <p>That area doesn't exist yet. <a href="index.html">Back home →</a></p>`;
    return;
  }

  document.title = `${ind.name} — Nithila Notes`;

  const sections = ind.subIndustries.map(sub => {
    const items = PRODUCTS.filter(p => p.industry === ind.id && p.subIndustry === sub.id);
    const body = items.length
      ? `<div class="grid-cards">${items.map(reviewCard).join("")}</div>`
      : `<p style="color:var(--muted);font-family:var(--sans);font-size:14px;letter-spacing:0.02em">No reviews here yet — coming soon.</p>`;
    return `<div style="margin-top:40px"><p class="eyebrow">${esc(sub.name)}</p>${body}</div>`;
  }).join("");

  el.innerHTML = `
    <p class="crumb"><a href="index.html">Home</a> &nbsp;·&nbsp; ${esc(ind.name)}</p>
    <p class="eyebrow">Sector</p>
    <h1 style="font-family:var(--display);font-weight:500;font-size:clamp(32px,5vw,46px);letter-spacing:-0.025em;margin:0 0 14px">${esc(ind.name)}</h1>
    <p style="font-size:20px;color:var(--ink-2);max-width:640px;margin:0">${esc(ind.blurb)}</p>
    ${sections}`;
}

render();
