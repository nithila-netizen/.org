/* ==========================================================================
   Shared masthead + footer, injected on every page. Requires icons.js + data.js.
   A non-personal news publication. Rename in data.js → SITE.
   ========================================================================== */

function siteName() { return (typeof SITE !== "undefined" && SITE.brand) || "The AI Health Brief"; }
function siteTag()  { return (typeof SITE !== "undefined" && SITE.tagline) || ""; }

function followCount() {
  try { return (JSON.parse(localStorage.getItem("aihb_follows") || "{}").companies || []).length
    + (JSON.parse(localStorage.getItem("aihb_follows") || "{}").topics || []).length; }
  catch (e) { return 0; }
}

function renderHeader() {
  const n = followCount();
  return `
  <header class="site-header">
    <div class="wrap">
      <a class="brand" href="index.html">${esc(siteName())}</a>
      <nav class="nav">
        <a href="reviews.html?sort=new">Latest</a>
        <a href="reviews.html">Browse</a>
        <a href="reviews.html?view=specialty">Specialties</a>
        <a href="following.html">Following${n ? ` <span class="nav-badge">${n}</span>` : ""}</a>
      </nav>
    </div>
  </header>`;
}

function renderFooter() {
  return `
  <footer class="site-footer">
    <div class="wrap">
      <div class="foot-top">
        <div>
          <div class="foot-brand">${esc(siteName())}</div>
          <p class="foot-lead">${esc(siteTag())}</p>
        </div>
        <nav class="foot-nav">
          <a href="index.html">Latest</a>
          <a href="reviews.html">Browse industries</a>
          <a href="reviews.html?view=specialty">By specialty</a>
          <a href="following.html">Following</a>
        </nav>
      </div>
      <div class="foot-bottom">
        <span>© ${esc(siteName())}</span>
        <span>Independent reviews of AI in healthcare. Not medical or purchasing advice.</span>
      </div>
    </div>
  </footer>`;
}

function mountChrome() {
  const h = document.getElementById("header-slot");
  const f = document.getElementById("footer-slot");
  if (h) h.innerHTML = renderHeader();
  if (f) f.innerHTML = renderFooter();
}
