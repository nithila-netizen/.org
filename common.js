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

/* ---- Company logos: pulled live from a logo service by website domain,
        with a lettered fallback when a logo is missing ---- */
function companyDomain(c) {
  if (!c || !c.website) return "";
  try { return new URL(c.website).hostname.replace(/^www\./, ""); } catch (e) { return ""; }
}
function logoBadge(c, size) {
  size = size || 36;
  const initial = esc((((c && c.company) || "?").trim().charAt(0) || "?").toUpperCase());
  const fs = Math.round(size * 0.44);
  const fb = `<span class="logo-fb" style="width:${size}px;height:${size}px;font-size:${fs}px">${initial}</span>`;
  const d = companyDomain(c);
  if (!d) return `<span class="logo" style="width:${size}px;height:${size}px">${fb}</span>`;
  // Try Clearbit; on failure fall back to the site favicon; then to a letter.
  const onerr = "if(this.dataset.s==='1'){this.style.display='none';this.nextElementSibling.style.display='flex';}" +
    "else{this.dataset.s='1';this.src='https://www.google.com/s2/favicons?domain=" + d + "&sz=128';}";
  return `<span class="logo" style="width:${size}px;height:${size}px">` +
    `<img src="https://logo.clearbit.com/${d}?size=${size * 2}" alt="${esc((c && c.company) || "")} logo" width="${size}" height="${size}" loading="lazy" onerror="${onerr}">` +
    `<span class="logo-fb" style="display:none;width:${size}px;height:${size}px;font-size:${fs}px">${initial}</span></span>`;
}

/* ---- Generated cover art: unique, colorful, branded per industry ---- */
const IND_STYLE = {
  "Hospitals & Health Systems":                 ["#E15A3D", "#B83B22", "pulse"],
  "Diagnostics & Imaging":                      ["#2FA69A", "#1C7167", "scan"],
  "Primary & Ambulatory Care":                  ["#3FA45C", "#2A7541", "heart"],
  "Pharma & Life Sciences":                     ["#7C6BD6", "#54459E", "flask"],
  "Payers & Health Insurance":                  ["#E8A13C", "#BE7C1C", "shield"],
  "Healthcare Administration & Revenue Cycle":  ["#5B7CB0", "#3C577F", "layers"],
  "Medical Devices & MedTech":                  ["#4E63C8", "#33429A", "pulse"],
  "Mental & Behavioral Health":                 ["#D65A86", "#A83A63", "heart"],
  "Senior Care & Post-Acute":                   ["#E07B3C", "#B85B1E", "compass"],
  "Pharmacy & Medication Management":           ["#2FA57C", "#1C7757", "flask"],
  "Dental":                                     ["#3AA0C8", "#24728F", "scan"],
  "Public & Population Health":                 ["#4C8AD6", "#3163A0", "compass"],
};
function indStyle(field) { return IND_STYLE[field] || ["#E15A3D", "#B83B22", "pulse"]; }
function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = (h * 16777619) >>> 0; } return h; }
function coverArt(c, tall) {
  const [c1, c2, ic] = indStyle(c.field); const h = hashStr(c.slug || c.company || c.field || "x");
  const id = "g" + (h % 1000000);
  const cx1 = 40 + (h % 90), cy1 = 20 + ((h >>> 3) % 90), r1 = 55 + ((h >>> 5) % 55);
  const cx2 = 360 - ((h >>> 7) % 120), cy2 = 150 - ((h >>> 9) % 90), r2 = 30 + ((h >>> 11) % 55);
  const yb = 120 + ((h >>> 13) % 40);
  return `<div class="cover${tall ? " cover-tall" : ""}">
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
      <rect width="400" height="200" fill="url(#${id})"/>
      <circle cx="${cx1}" cy="${cy1}" r="${r1}" fill="#fff" opacity="0.10"/>
      <circle cx="${cx2}" cy="${cy2}" r="${r2}" fill="#fff" opacity="0.07"/>
      <circle cx="${cx2}" cy="${cy2}" r="${r2 * 0.5}" fill="#000" opacity="0.05"/>
      <path d="M-10 ${yb} H110 l9 0 l6 -30 l9 52 l7 -22 l6 0 H420" fill="none" stroke="#fff" stroke-width="2.6" opacity="0.55" stroke-linecap="round"/>
    </svg>
    <span class="cover-ico">${icon(ic)}</span>
  </div>`;
}

/* ---- The article card (used on the home feed and in listings) ---- */
function feedCard(c) {
  return `<a class="fcard" href="${articleHref(c)}">
    ${coverArt(c)}
    <div class="fcard-body">
      <div class="fcard-top"><span class="fcard-cat">${esc(c.field)}</span><span class="signal ${esc(c.status)}">${esc(statusLabel(c.status))}</span></div>
      <h3 class="fcard-idea">${wrapTerms(esc(c.idea), new Set())}</h3>
      <div class="fcard-foot">
        <span class="fcard-co">${esc(c.company)}${c.full ? ' <span class="idea-deep">Deep dive</span>' : ""}</span>
        <span class="fcard-meta"><span class="fcard-date">${fmtDate(c.date)}</span></span>
      </div>
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
