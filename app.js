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
function overlayPhoto(src, lab, title, text, cls, extra) {
  return `<figure class="photo overlay-photo ${cls || ""}" data-label="${esc(title || lab || "Photo")}">
    <img src="${esc(src)}" alt="${esc(title || "")}" loading="lazy"
         onerror="this.closest('.photo').classList.add('missing')" />
    <figcaption class="overlay-caption">
      ${lab ? `<p class="lab">${esc(lab)}</p>` : ""}
      ${title ? `<h3>${esc(title)}</h3>` : ""}
      ${text ? `<p>${esc(text)}</p>` : ""}
      ${extra || ""}
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
(function () {
  const hp = document.getElementById("hero-portrait");
  if (hp && PROFILE.portrait) hp.innerHTML = `<div class="pf"><img src="${esc(PROFILE.portrait)}" alt="${esc(PROFILE.name)}" /></div>`;
})();

/* ---- Reviews -------------------------------------------------------------- */
const _rate = {};
if (typeof CATALOG !== "undefined") CATALOG.forEach(c => { if (c.full) _rate[c.full] = c.rating; });
document.getElementById("reviews").innerHTML = PRODUCTS.map(p => {
  const ind = INDUSTRIES.find(i => i.id === p.industry);
  const r = _rate[p.id];
  return `<a class="review-row" href="product.html?id=${encodeURIComponent(p.id)}">
      <span class="cat">${esc(ind ? ind.name : "Review")}</span>
      <span><h3>${esc(p.name)}</h3><p>${esc(p.tagline)}</p></span>
      <span class="review-meta">${r ? `<span class="db-rating">${stars(r)}</span>` : ""}<span class="arrow">→</span></span>
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

/* ---- Instagram profile card (live link to the public account) ------------- */
function igGlyph() {
  return `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>`;
}
function igCard(handle, url, note) {
  const h = handle || "Instagram";
  const u = url || ("https://instagram.com/" + String(handle || "").replace(/^@/, ""));
  return `<a class="ig-card" href="${esc(u)}" target="_blank" rel="noopener">
    <span class="ig-glyph">${igGlyph()}</span>
    <span class="ig-body"><span class="ig-handle">${esc(h)}</span><span class="ig-note">${esc(note || "View the latest posts on Instagram")}</span></span>
    <span class="ig-go">Open →</span>
  </a>`;
}

/* ---- ONSET (featured project inside Projects) ----------------------------- */
if (typeof ONSET !== "undefined") {
  const ofBlock = (k, t) => t ? `<div class="of-item"><span class="of-k">${esc(k)}</span><p>${esc(t)}</p></div>` : "";
  document.getElementById("onset-feature").innerHTML = `
    <div class="onset-feature">
      <div class="of-media"><img src="assets/onset-brand.png" alt="Onset — a Word of the Week post" loading="lazy" /></div>
      <div class="of-content">
        <div class="of-head"><p class="of-eyebrow">Flagship project · Founder</p><span class="of-badge">Independent media brand</span></div>
        <h3>Onset</h3>
        <p class="of-lead">${esc(ONSET.oneLiner)}</p>
        <div class="of-grid">
          ${ofBlock("Why I built it", ONSET.why)}
          ${ofBlock("Who it's for", ONSET.who)}
          ${ofBlock("How it works", ONSET.how)}
          ${ofBlock("What I built", ONSET.impact)}
        </div>
        ${ONSET.widget ? `<div class="ig-widget">${ONSET.widget}</div>` : igCard(ONSET.ig && ONSET.ig.handle, ONSET.ig && ONSET.ig.url, "Weekly on Instagram. See the latest posts.")}
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
    const head = m.headshot
      ? `<img class="mkt-headshot" src="${esc(m.headshot)}" alt="${esc(m.name)}" loading="lazy" onerror="this.style.display='none'" />`
      : "";
    return `<div class="mkt">
        <div class="mkt-head">${head}<div><h3>${esc(m.name)}</h3><p class="role">${esc(m.role)}</p></div></div>
        ${m.widget ? `<div class="ig-widget">${m.widget}</div>` : igCard(m.ig && m.ig.handle, m.ig && m.ig.url, "See my work. Latest posts on Instagram.")}
      </div>`;
  }).join("");
}

/* ---- Involvement ---------------------------------------------------------- */
if (typeof INVOLVEMENT !== "undefined") {
  document.getElementById("involvement-slot").innerHTML = INVOLVEMENT.map(v => {
    const links = (v.links || (v.link ? [v.link] : []))
      .map(l => `<a class="inv-link" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("");
    return `<div class="inv">${overlayPhoto(v.photo, v.role, v.title, v.text, "", links)}</div>`;
  }).join("");
}

/* ---- Research ------------------------------------------------------------- */
if (typeof RESEARCH !== "undefined") {
  const pics = RESEARCH.photos.map(src => photo(src, RESEARCH.lab)).join("");
  const link = RESEARCH.url
    ? `<a class="btn btn-ghost" href="${esc(RESEARCH.url)}" target="_blank" rel="noopener">Visit the lab site →</a>` : "";
  document.getElementById("research-slot").innerHTML = `
    <div class="research-grid">${pics}</div>
    <div class="research-desc">
      <p class="eyebrow" style="margin-bottom:10px">${esc(RESEARCH.lab)} · ${esc(RESEARCH.field)}</p>
      <p class="body">${esc(RESEARCH.text)}</p>
      ${link}
    </div>`;
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
  const portraitHTML = PROFILE.portrait
    ? `<div class="portrait photo-cut"><img src="${esc(PROFILE.portrait)}" alt="${esc(PROFILE.name)}" loading="lazy" /></div>`
    : `<div class="portrait" aria-hidden="true"><svg viewBox="0 0 100 120" fill="none" stroke="#16130F" stroke-width="1.4"><circle cx="50" cy="42" r="22"/><path d="M14 112 c0 -26 16 -40 36 -40 s36 14 36 40"/></svg></div>`;
  document.getElementById("about-slot").innerHTML = `
    <p class="eyebrow">About</p>
    ${originHTML}
    <div class="about-body" style="max-width:820px">
      ${aboutParas}
      <div class="skills">${skills}</div>
      ${edu ? `<div class="edu">${edu}</div>` : ""}
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
