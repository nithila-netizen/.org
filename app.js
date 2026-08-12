/* ==========================================================================
   Homepage (portfolio) rendering. Builds the hero, selected reviews, areas,
   experience, and about from PROFILE / INDUSTRIES / PRODUCTS / EXPERIENCE.
   Edit data.js, not this file.
   ========================================================================== */

mountChrome();

// --- Hero -------------------------------------------------------------------
document.getElementById("hero-role").textContent = PROFILE.role;
document.getElementById("hero-title").innerHTML = PROFILE.heroTitle;   // allows <em>
document.getElementById("hero-intro").textContent = PROFILE.heroIntro;

// --- Selected reviews -------------------------------------------------------
function reviewRow(p) {
  const ind = INDUSTRIES.find(i => i.id === p.industry);
  return `
    <a class="review-row" href="product.html?id=${encodeURIComponent(p.id)}">
      <span class="cat">${esc(ind ? ind.name : "Review")}</span>
      <span>
        <h3>${esc(p.name)}</h3>
        <p>${esc(p.tagline)}</p>
      </span>
      <span class="arrow">→</span>
    </a>`;
}
document.getElementById("reviews").innerHTML = PRODUCTS.map(reviewRow).join("");

// --- Areas I cover ----------------------------------------------------------
const countIn = id => PRODUCTS.filter(p => p.industry === id).length;
document.getElementById("areas-grid").innerHTML = INDUSTRIES.map((ind, i) => {
  const subs = ind.subIndustries.map(s => s.name).join(" · ");
  const n = countIn(ind.id);
  const tail = n ? `${n} review${n === 1 ? "" : "s"}` : "coming soon";
  return `
    <a class="area" href="industry.html?id=${encodeURIComponent(ind.id)}">
      <span class="no">${String(i + 1).padStart(2, "0")}</span>
      <span class="body">
        <h3>${esc(ind.name)}</h3>
        <p>${esc(ind.blurb)}</p>
        <span class="subs">${esc(subs)} — ${tail}</span>
      </span>
    </a>`;
}).join("");

// --- Experience / case competitions ----------------------------------------
function expRow(e) {
  const meta = [e.org, e.year].filter(Boolean).join(" · ");
  return `
    <div class="review-row" style="cursor:default">
      <span class="cat">${esc(e.type || "")}</span>
      <span>
        <h3>${esc(e.title)}${meta ? ` <span style="font-family:var(--sans);font-size:13px;color:var(--muted);letter-spacing:0.04em">— ${esc(meta)}</span>` : ""}</h3>
        <p>${esc(e.detail)}</p>
      </span>
      <span class="arrow"></span>
    </div>`;
}
if (typeof EXPERIENCE !== "undefined" && EXPERIENCE.length) {
  document.getElementById("experience-list").innerHTML = EXPERIENCE.map(expRow).join("");
}

// --- About ------------------------------------------------------------------
const aboutParas = [`<p class="lead">${esc(PROFILE.aboutLead)}</p>`]
  .concat(PROFILE.about.map(p => `<p>${esc(p)}</p>`))
  .join("");
const skills = (PROFILE.skills || []).map(s => `<span>${esc(s)}</span>`).join("");
document.getElementById("about-body").innerHTML =
  aboutParas + `<div class="skills">${skills}</div>`;
