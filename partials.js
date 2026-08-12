/* ==========================================================================
   Shared header + footer, injected on every page. Requires icons.js + data.js.
   ========================================================================== */

function renderHeader() {
  return `
  <header class="site-header">
    <div class="wrap">
      <a class="brand" href="index.html">Nithila <em>Neminathan</em></a>
      <nav class="nav">
        <a href="reviews.html">Coverage</a>
        <a href="index.html#work">Reviews</a>
        <a href="index.html#onset">ONSET</a>
        <a href="index.html#involvement">Experience</a>
        <a href="index.html#about">About</a>
        <a href="index.html#contact">Contact</a>
      </nav>
    </div>
  </header>`;
}

function renderFooter() {
  const c = (typeof PROFILE !== "undefined" && PROFILE.contact) || {};
  const links = [];
  if (c.email)    links.push(`<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>`);
  if (c.linkedin) links.push(`<a href="${esc(c.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>`);
  if (c.other)    links.push(`<a href="${esc(c.other)}" target="_blank" rel="noopener">More</a>`);

  return `
  <footer class="site-footer" id="contact">
    <div class="wrap">
      <div class="foot-top">
        <div class="foot-lead">Building products that make good healthcare reach further.</div>
        <div class="footcol">
          <h4>Get in touch</h4>
          ${links.join("") || '<a href="#">Add your contact links in data.js</a>'}
        </div>
      </div>
      <div class="foot-bottom">
        <span>© ${esc((typeof PROFILE !== "undefined" && PROFILE.name) || "Nithila Neminathan")}</span>
        <span>Nithila Notes — independent reviews of AI in healthcare</span>
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
