/* ==========================================================================
   Homepage (portfolio) rendering. Builds every section from data.js.
   Edit data.js for content; this file just lays it out.
   ========================================================================== */

mountChrome();

/* ---- shared bits ---------------------------------------------------------- */
function photo(src, label, cls) {
  return `<figure class="photo ${cls || ""}" data-label="${esc(label || "Photo")}">
    <img src="${esc(src)}" alt="${esc(label || "")}" loading="lazy"
         onerror="this.closest('.photo').classList.add('missing')" />
  </figure>`;
}
function overlayPhoto(src, lab, title, text, cls) {
  return `<figure class="photo overlay-photo ${cls || ""}" data-label="${esc(title || lab || "Photo")}">
    <img src="${esc(src)}" alt="${esc(title || "")}" loading="lazy"
         onerror="this.closest('.photo').classList.add('missing')" />
    <figcaption class="overlay-caption">
      ${lab ? `<p class="lab">${esc(lab)}</p>` : ""}
      ${title ? `<h3>${esc(title)}</h3>` : ""}
      ${text ? `<p>${esc(text)}</p>` : ""}
    </figcaption>
  </figure>`;
}
function carousel(posts, label) {
  const slides = posts.map(src => `<div class="slide">${photo(src, label || "Instagram post")}</div>`).join("");
  return `<div class="carousel" data-carousel>
    <div class="carousel-viewport"><div class="carousel-track">${slides}</div></div>
    <button class="c-btn c-prev" aria-label="Previous">‹</button>
    <button class="c-btn c-next" aria-label="Next">›</button>
    <div class="c-dots"></div>
  </div>`;
}

/* ---- Hero ----------------------------------------------------------------- */
document.getElementById("hero-role").textContent = PROFILE.role;
document.getElementById("hero-title").innerHTML = PROFILE.heroTitle;
document.getElementById("hero-intro").textContent = PROFILE.heroIntro;

/* ---- Reviews -------------------------------------------------------------- */
document.getElementById("reviews").innerHTML = PRODUCTS.map(p => {
  const ind = INDUSTRIES.find(i => i.id === p.industry);
  return `<a class="review-row" href="product.html?id=${encodeURIComponent(p.id)}">
      <span class="cat">${esc(ind ? ind.name : "Review")}</span>
      <span><h3>${esc(p.name)}</h3><p>${esc(p.tagline)}</p></span>
      <span class="arrow">→</span>
    </a>`;
}).join("");

/* ---- Areas ---------------------------------------------------------------- */
const countIn = id => PRODUCTS.filter(p => p.industry === id).length;
document.getElementById("areas-grid").innerHTML = INDUSTRIES.map((ind, i) => {
  const subs = ind.subIndustries.map(s => s.name).join(" · ");
  const n = countIn(ind.id);
  return `<a class="area" href="industry.html?id=${encodeURIComponent(ind.id)}">
      <span class="no">${String(i + 1).padStart(2, "0")}</span>
      <span class="body"><h3>${esc(ind.name)}</h3><p>${esc(ind.blurb)}</p>
        <span class="subs">${esc(subs)} — ${n ? n + " review" + (n === 1 ? "" : "s") : "coming soon"}</span></span>
    </a>`;
}).join("");

/* ---- ONSET ---------------------------------------------------------------- */
if (typeof ONSET !== "undefined") {
  const igLink = ONSET.ig && ONSET.ig.url
    ? `<a class="onset-ig" href="${esc(ONSET.ig.url)}" target="_blank" rel="noopener">Follow ONSET on Instagram ${icon("external")}</a>`
    : (ONSET.ig && ONSET.ig.handle ? `<span class="onset-ig">${esc(ONSET.ig.handle)}</span>` : "");
  const block = (h, t) => t ? `<div class="onset-block"><h4>${esc(h)}</h4><p>${esc(t)}</p></div>` : "";
  document.getElementById("onset-slot").innerHTML = `
    <p class="eyebrow">My venture${ONSET.founded ? " · " + esc(ONSET.founded) : ""}</p>
    <h2>ONSET</h2>
    <p class="lede">${esc(ONSET.oneLiner)}</p>
    <div class="onset-grid">
      <div class="onset-story">
        ${block("Why I made it", ONSET.why)}
        ${block("Who it helps", ONSET.who)}
        ${block("How it works", ONSET.how)}
        ${block("Why it matters", ONSET.impact)}
      </div>
      <div>
        ${carousel(ONSET.posts, "ONSET post")}
        ${igLink}
      </div>
    </div>`;
}

/* ---- Projects (nirmaa) ---------------------------------------------------- */
if (typeof PROJECTS !== "undefined") {
  document.getElementById("projects-slot").innerHTML = PROJECTS.map(pr => `
    <div class="spotlight">
      ${photo(pr.photo, pr.name)}
      <div>
        <h3>${esc(pr.name)}</h3>
        <p class="role">${esc(pr.role)}</p>
        <p>${esc(pr.blurb)}</p>
        ${pr.url ? `<a class="btn btn-ghost" href="${esc(pr.url)}" target="_blank" rel="noopener">Visit ${esc(pr.name)} →</a>` : ""}
      </div>
    </div>`).join("");
}

/* ---- Marketing carousels -------------------------------------------------- */
if (typeof MARKETING !== "undefined") {
  document.getElementById("marketing-slot").innerHTML = MARKETING.map(m => {
    const ig = m.ig && m.ig.url
      ? `<a class="onset-ig" style="color:var(--ink)" href="${esc(m.ig.url)}" target="_blank" rel="noopener">${esc(m.ig.handle || "Instagram")} ${icon("external")}</a>`
      : (m.ig && m.ig.handle ? `<span class="carousel-cap">${esc(m.ig.handle)}</span>` : "");
    return `<div class="mkt">
        <h3>${esc(m.name)}</h3>
        <p class="role">${esc(m.role)}</p>
        ${carousel(m.posts, m.name + " post")}
        ${ig ? `<div style="margin-top:12px">${ig}</div>` : ""}
      </div>`;
  }).join("");
}

/* ---- Involvement ---------------------------------------------------------- */
if (typeof INVOLVEMENT !== "undefined") {
  document.getElementById("involvement-slot").innerHTML = INVOLVEMENT.map(v =>
    `<div class="inv">${overlayPhoto(v.photo, v.role, v.title, v.text)}</div>`
  ).join("");
}

/* ---- About ---------------------------------------------------------------- */
(function () {
  const o = PROFILE.origin;
  const originHTML = o ? `
    <div class="spotlight" style="border-top:none;padding-top:0;margin-bottom:48px">
      ${photo(o.photo, o.title)}
      <div>
        <p class="eyebrow">${esc(o.title)}</p>
        <p style="font-family:var(--display);font-weight:500;font-size:clamp(22px,2.6vw,28px);line-height:1.35;letter-spacing:-0.01em;margin:0">${esc(o.text)}</p>
      </div>
    </div>` : "";
  const aboutParas = [`<p class="lead">${esc(PROFILE.aboutLead)}</p>`]
    .concat(PROFILE.about.map(p => `<p>${esc(p)}</p>`)).join("");
  const skills = (PROFILE.skills || []).map(s => `<span>${esc(s)}</span>`).join("");
  const edu = (PROFILE.education || []).map(e =>
    `<div class="item"><div class="school">${esc(e.school)}</div><div class="note">${esc(e.note)}</div></div>`
  ).join("");
  document.getElementById("about-slot").innerHTML = `
    <p class="eyebrow">About</p>
    ${originHTML}
    <div class="about-grid">
      <div class="portrait" aria-hidden="true">
        <svg viewBox="0 0 100 120" fill="none" stroke="#16130F" stroke-width="1.4">
          <circle cx="50" cy="42" r="22"/><path d="M14 112 c0 -26 16 -40 36 -40 s36 14 36 40"/>
        </svg>
      </div>
      <div class="about-body">
        ${aboutParas}
        <div class="skills">${skills}</div>
        ${edu ? `<div class="edu">${edu}</div>` : ""}
      </div>
    </div>`;
})();

/* ---- Fun facts ------------------------------------------------------------ */
if (typeof FUNFACTS !== "undefined") {
  document.getElementById("funfacts-slot").innerHTML = FUNFACTS.map((f, idx) => {
    let media;
    if (f.photos) {
      media = `<div class="ff-duo">${f.photos.map(src => photo(src, f.label)).join("")}</div>`;
    } else {
      const anns = (f.annotations || []).map(a => `
        <div class="anno" style="left:${a.x};top:${a.y}">
          <span class="anno-label">${esc(a.label)}</span>
          <svg class="anno-arrow" viewBox="0 0 20 30"><path d="M10 1 V21 M4 15 L10 23 L16 15" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>`).join("");
      media = `<figure class="photo" data-label="${esc(f.label)}">
        <img src="${esc(f.photo)}" alt="${esc(f.label)}" loading="lazy" onerror="this.closest('.photo').classList.add('missing')" />
        <div class="anno-layer">${anns}</div>
      </figure>`;
    }
    const flip = idx % 2 === 1 ? " flip" : "";
    return `<div class="funfact${flip}">
        <div>${media}</div>
        <div class="ff-text"><p class="lab">${esc(f.label)}</p><p>${esc(f.text)}</p></div>
      </div>`;
  }).join("");
}

/* ---- kick off motion + carousels ----------------------------------------- */
initUI();
