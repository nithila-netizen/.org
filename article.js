/* ==========================================================================
   Article page rendering. Reads the ?id=... from the URL, finds the matching
   idea in data.js, and lays out the article. Edit data.js to change content.
   ========================================================================== */

function esc(s) {
  return String(s == null ? "" : s)
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

// Turn an array of paragraph strings into <p> tags.
function paras(arr) {
  return (arr || []).map(p => `<p>${esc(p)}</p>`).join("");
}

// A titled prose section (e.g. "The problem"), skipped if empty.
function block(title, arr) {
  if (!arr || arr.length === 0) return "";
  return `<h2>${esc(title)}</h2>${paras(arr)}`;
}

function mockupHTML(m) {
  const inner = m.src
    ? `<div class="mockup-frame"><img src="${esc(m.src)}" alt="${esc(m.caption || "")}" /></div>`
    : `<div class="mockup-frame"><div class="mockup-placeholder">
         Mockup coming soon${m.caption ? " — " + esc(m.caption) : ""}
       </div></div>`;
  const cap = m.caption ? `<figcaption>${esc(m.caption)}</figcaption>` : "";
  return `<figure class="mockup">${inner}${cap}</figure>`;
}

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function render() {
  const id = getParam("id");
  const idea = IDEAS.find(i => i.id === id);
  const el = document.getElementById("article");

  if (!idea) {
    el.innerHTML = `
      <a class="back-link" href="index.html">← Back to all ideas</a>
      <div class="article-header">
        <h1>Idea not found</h1>
        <p class="prose">That idea doesn't exist yet. <a href="index.html">Browse all ideas →</a></p>
      </div>`;
    return;
  }

  document.title = idea.title + " — AI × Healthcare";

  const section = (typeof SECTIONS !== "undefined")
    ? SECTIONS.find(s => s.id === idea.section) : null;
  const sub = section && section.subsections.find(s => s.id === idea.subsection);
  const kicker = [section && section.title, sub && sub.title].filter(Boolean).join("  ·  ");

  const tagText = idea.hasAI
    ? "This company already uses AI — here's how I'd extend it."
    : "This company doesn't use AI yet — here's how I'd add it.";

  const companyName = idea.company && idea.company.name || "";
  const companyLink = idea.company && idea.company.url
    ? `<a href="${esc(idea.company.url)}" target="_blank" rel="noopener">${esc(companyName)} ↗</a>`
    : `<strong>${esc(companyName)}</strong>`;

  const mockups = (idea.mockups && idea.mockups.length)
    ? `<div class="mockups">
         <h2 style="font-family:var(--display);font-weight:600;font-size:26px;margin:0 0 8px">
           How it could look
         </h2>
         ${idea.mockups.map(mockupHTML).join("")}
       </div>`
    : "";

  el.innerHTML = `
    <a class="back-link" href="index.html">← Back to all ideas</a>
    <div class="article-header">
      <p class="kicker">${esc(kicker)}</p>
      <h1>${esc(idea.title)}</h1>
      <div class="credit">
        <span>💡 ${esc(tagText)}</span>
        <span>Credit: ${companyLink}</span>
      </div>
    </div>
    <div class="prose">
      <p class="lead">${esc(idea.summary)}</p>
      ${block("The problem", idea.problem)}
      ${block("Where AI fits", idea.opportunity)}
      ${block("How I'd build it", idea.approach)}
      ${mockups}
      ${block("Why it matters", idea.impact)}
    </div>`;
}

render();
