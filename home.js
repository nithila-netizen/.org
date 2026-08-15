/* ==========================================================================
   News homepage: What's New feed, Most notable, browse by industry,
   specialty chips, and patient body-system chips.
   ========================================================================== */

mountChrome();

const byDate = (a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : b.rating - a.rating);

/* Featured carousel: several strong stories, auto-advancing */
const featured = [...CATALOG].sort((a, b) => b.rating - a.rating || byDate(a, b)).slice(0, 6);
function leadSlide(c) {
  return `<a class="lead" href="${articleHref(c)}">
    <div class="lead-logo-cover" style="--ic:${indStyle(c.field)[0]}">${logoBadge(c, 96)}</div>
    <div class="lead-body">
      <span class="lead-kicker">Featured · ${esc(c.field)}</span>
      <h2 class="lead-idea">${wrapTerms(esc(c.idea), new Set())}</h2>
      <p class="lead-sum">${esc((c.summary || "").slice(0, 220))}…</p>
      <div class="lead-foot">
        <span class="signal ${esc(c.status)}">${esc(statusLabel(c.status))}</span>
        <span class="fcard-co">${esc(c.company)}${c.full ? ' <span class="idea-deep">Deep dive</span>' : ""}</span>
        <span class="idea-score">${Number(c.rating).toFixed(1)}</span>
        <span class="fcard-date">${fmtDate(c.date)}</span>
      </div>
    </div>
  </a>`;
}
(function carousel() {
  const track = document.getElementById("ctrack"), dotsEl = document.getElementById("cdots");
  if (!track) return;
  track.innerHTML = featured.map(c => `<div class="slide">${leadSlide(c)}</div>`).join("");
  dotsEl.innerHTML = featured.map((_, i) => `<button class="cdot${i === 0 ? " on" : ""}" data-i="${i}" aria-label="Slide ${i + 1}"></button>`).join("");
  let idx = 0; const n = featured.length;
  function go(i) {
    idx = (i + n) % n;
    track.style.transform = `translateX(-${idx * 100}%)`;
    dotsEl.querySelectorAll(".cdot").forEach((d, j) => d.classList.toggle("on", j === idx));
  }
  document.getElementById("cnext").addEventListener("click", () => { go(idx + 1); reset(); });
  document.getElementById("cprev").addEventListener("click", () => { go(idx - 1); reset(); });
  dotsEl.addEventListener("click", e => { const d = e.target.closest(".cdot"); if (d) { go(+d.dataset.i); reset(); } });
  let timer = setInterval(() => go(idx + 1), 5500);
  function reset() { clearInterval(timer); timer = setInterval(() => go(idx + 1), 5500); }
  const car = document.getElementById("carousel");
  car.addEventListener("mouseenter", () => clearInterval(timer));
  car.addEventListener("mouseleave", reset);
})();

/* What's new — most recent articles, horizontal scroll */
document.getElementById("whatsnew").innerHTML =
  [...CATALOG].sort(byDate).slice(0, 12).map(feedCard).join("");

/* Ticker — scrolling recent headlines (rendered twice for a seamless loop) */
const tickItems = [...CATALOG].sort(byDate).slice(0, 16).map(c =>
  `<a class="tick" href="${articleHref(c)}"><span class="tick-co">${esc(c.company)}</span> ${esc(c.idea)}</a>`).join("");
document.getElementById("ticker-track").innerHTML = tickItems + tickItems;

/* Animated stats band */
const newThisMonth = CATALOG.filter(c => c.date >= "2026-07-15").length;
const stats = [
  [CATALOG.length, "companies reviewed"],
  [SECTORS.length, "industries mapped"],
  [SECTORS.reduce((n, s) => n + s.subsectors.length, 0), "sub-sectors"],
  [newThisMonth, "new this month"],
];
document.getElementById("stats").innerHTML = stats.map(([n, label]) =>
  `<div class="stat"><span class="stat-n" data-target="${n}">0</span><span class="stat-l">${esc(label)}</span></div>`).join("");
(function countUp() {
  const io = new IntersectionObserver(ents => ents.forEach(e => {
    if (!e.isIntersecting) return; io.unobserve(e.target);
    const el = e.target, target = +el.dataset.target; let cur = 0;
    const step = Math.max(1, Math.round(target / 40));
    const tick = () => { cur = Math.min(target, cur + step); el.textContent = cur; if (cur < target) requestAnimationFrame(tick); };
    tick();
  }), { threshold: 0.6 });
  document.querySelectorAll(".stat-n").forEach(el => io.observe(el));
})();

/* Top rated — ranked list (distinct from the card grids) */
document.getElementById("topranked").innerHTML =
  [...CATALOG].sort((a, b) => b.rating - a.rating).slice(0, 6).map((c, i) =>
    `<a class="rank-row" href="${articleHref(c)}">
      <span class="rank-no">${String(i + 1).padStart(2, "0")}</span>
      <span class="rank-body"><span class="rank-idea">${esc(c.idea)}</span>
        <span class="rank-meta">${esc(c.company)} · ${esc(c.field)}</span></span>
      <span class="rank-score">${Number(c.rating).toFixed(1)}</span>
    </a>`).join("");

/* Explore chooser — the one clear, obvious way to navigate */
const nSub = SECTORS.reduce((n, s) => n + s.subsectors.length, 0);
const nSpec = new Set(CATALOG.flatMap(c => c.specialties || [])).size;
const nSys = new Set(CATALOG.flatMap(c => c.systems || [])).size;
const choices = [
  ["#E15A3D", "layers",   "Browse by industry", `${SECTORS.length} industries · ${nSub} sub-sectors`, "reviews.html"],
  ["#2FA69A", "pulse",    "By your specialty",  `${nSpec} specialties, radiology to nursing`,          "reviews.html?view=specialty"],
  ["#D65A86", "heart",    "For patients",       `${nSys} body systems, browse by symptom`,             "reviews.html?view=patient"],
  ["#7C6BD6", "calendar", "Latest reviews",     `${CATALOG.length} articles, newest first`,            "reviews.html?sort=new"],
];
document.getElementById("explore").innerHTML = choices.map(([c, ic, title, desc, href]) =>
  `<a class="xcard" href="${href}" style="--ic:${c}">
    <span class="xico">${icon(ic)}</span>
    <span class="xtitle">${esc(title)}</span>
    <span class="xdesc">${esc(desc)}</span>
    <span class="xgo">${icon("arrow")}</span>
  </a>`).join("");
