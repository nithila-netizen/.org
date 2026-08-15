/* ==========================================================================
   Shared helpers used on every page: follow state (localStorage), catalog
   lookups, and the article card. Loaded after data.js, before the page script.
   ========================================================================== */

/* ---- Follow: companies + topics, saved per-device in localStorage ---- */
const FKEY = "aihb_follows";
function getFollows() {
  try { const f = JSON.parse(localStorage.getItem(FKEY) || "{}");
    return { companies: f.companies || [], topics: f.topics || [] }; }
  catch (e) { return { companies: [], topics: [] }; }
}
function saveFollows(f) { localStorage.setItem(FKEY, JSON.stringify(f)); }
function isFollowing(type, id) { return (getFollows()[type] || []).includes(id); }
function toggleFollow(type, id) {
  const f = getFollows(); const a = f[type] || []; const i = a.indexOf(id);
  if (i < 0) a.push(id); else a.splice(i, 1);
  f[type] = a; saveFollows(f); return i < 0;
}
function followBtn(type, id, label) {
  const on = isFollowing(type, id); label = label || "Follow";
  return `<button class="follow-btn${on ? " on" : ""}" data-ft="${esc(type)}" data-fi="${esc(id)}" data-label="${esc(label)}">
    ${on ? "Following" : label}</button>`;
}
document.addEventListener("click", e => {
  const b = e.target.closest(".follow-btn"); if (!b) return;
  e.preventDefault(); e.stopPropagation();
  const on = toggleFollow(b.dataset.ft, b.dataset.fi);
  b.classList.toggle("on", on); b.textContent = on ? "Following" : (b.dataset.label || "Follow");
  const h = document.getElementById("header-slot");
  if (h && typeof renderHeader === "function") h.innerHTML = renderHeader();
});

/* ---- Catalog lookups ---- */
const CBY_SLUG = {}, CBY_COMPANY = {};
if (typeof CATALOG !== "undefined") CATALOG.forEach(c => {
  CBY_SLUG[c.slug] = c; if (!CBY_COMPANY[c.company]) CBY_COMPANY[c.company] = c;
});
function articleHref(c) {
  return c.full ? `product.html?id=${encodeURIComponent(c.full)}` : `review.html?id=${encodeURIComponent(c.slug)}`;
}
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function fmtDate(d) { if (!d) return ""; const [y, m, day] = d.split("-"); return `${MONTHS[+m - 1]} ${+day}, ${y}`; }

/* ---- The article card (used on the home feed and in listings) ---- */
function feedCard(c) {
  return `<a class="fcard" href="${articleHref(c)}">
    <div class="fcard-top"><span class="fcard-cat">${esc(c.field)}</span><span class="signal ${esc(c.status)}">${esc(statusLabel(c.status))}</span></div>
    <h3 class="fcard-idea">${wrapTerms(esc(c.idea), new Set())}</h3>
    <div class="fcard-foot">
      <span class="fcard-co">${esc(c.company)}${c.full ? ' <span class="idea-deep">Deep dive</span>' : ""}</span>
      <span class="fcard-meta"><span class="idea-score">${Number(c.rating).toFixed(1)}</span><span class="fcard-date">${fmtDate(c.date)}</span></span>
    </div>
  </a>`;
}

/* ---- Liveliness: reveal-on-scroll for cards & sections ---- */
(function () {
  if (typeof IntersectionObserver === "undefined") return;
  const io = new IntersectionObserver(ents => {
    ents.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -6% 0px" });
  const SEL = ".fcard,.facet-tile,.ind-card,.area,.acard,.subsector,.sr-row,.topic-chip,.foll-chip";
  let scheduled = false;
  function arm() {
    scheduled = false;
    document.querySelectorAll(SEL).forEach((el, i) => {
      if (el.dataset.rev) return;
      el.dataset.rev = "1"; el.classList.add("reveal");
      el.style.transitionDelay = (Math.min(i % 8, 7) * 35) + "ms";
      io.observe(el);
    });
  }
  function schedule() { if (!scheduled) { scheduled = true; requestAnimationFrame(arm); } }
  document.addEventListener("DOMContentLoaded", () => {
    schedule();
    new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
  });
})();
