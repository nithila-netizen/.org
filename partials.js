/* ==========================================================================
   Shared header + footer markup, injected on every page so there's one place
   to edit them. Requires icons.js (for icon()).
   ========================================================================== */

function renderHeader() {
  return `
  <header class="site-header">
    <div class="wrap">
      <a class="brand" href="index.html">
        <span class="logo">${icon("pulse")}</span>
        Nithila <span class="accent">Notes</span>
      </a>
      <nav class="nav">
        <a href="index.html#industries">Industries</a>
        <a href="index.html#products">Products</a>
        <a href="index.html#about">About</a>
      </nav>
      <div class="search">
        ${icon("search")}
        <input type="search" placeholder="Search industries, sub-industries, products..." aria-label="Search" />
      </div>
    </div>
  </header>`;
}

function renderFooter() {
  return `
  <footer class="site-footer">
    <div class="wrap">
      <span>© ${esc(SITE.brand)} — the map of AI across healthcare.</span>
      <span>A portfolio of ideas for AI in healthcare.</span>
    </div>
  </footer>`;
}

// Mount into placeholders present on each page.
function mountChrome() {
  const h = document.getElementById("header-slot");
  const f = document.getElementById("footer-slot");
  if (h) h.innerHTML = renderHeader();
  if (f) f.innerHTML = renderFooter();
}
