/* ==========================================================================
   Homepage rendering. Reads SITE / SECTIONS / IDEAS from data.js and builds
   the hero, the section/subsection structure, and the idea cards.
   You should not need to edit this file to add content — edit data.js instead.
   ========================================================================== */

// Small helper: safely escape text before inserting into HTML.
function esc(s) {
  return String(s == null ? "" : s)
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

// --- Hero + footer ----------------------------------------------------------
document.getElementById("hero-title").textContent = SITE.title;
document.getElementById("hero-lede").textContent = SITE.lede;
document.getElementById("year").textContent = "© " + SITE.author;

// --- Top nav: one link per section -----------------------------------------
document.getElementById("nav").innerHTML = SECTIONS
  .map(s => `<a href="#${esc(s.id)}">${esc(s.title.split(" & ")[0])}</a>`)
  .join("");

// --- Build each section -----------------------------------------------------
const ideasFor = (sectionId, subId) =>
  IDEAS.filter(i => i.section === sectionId && i.subsection === subId);

function cardHTML(idea) {
  const tagClass = idea.hasAI ? "has-ai" : "no-ai";
  const tagText  = idea.hasAI ? "Extending existing AI" : "Adding AI";
  return `
    <a class="card" href="article.html?id=${encodeURIComponent(idea.id)}">
      <span class="tag ${tagClass}">${tagText}</span>
      <h4>${esc(idea.title)}</h4>
      <p class="company">${esc(idea.company && idea.company.name || "")}</p>
      <p class="summary">${esc(idea.summary)}</p>
      <span class="read">Read the idea →</span>
    </a>`;
}

function subsectionHTML(sectionId, sub) {
  const ideas = ideasFor(sectionId, sub.id);
  if (ideas.length === 0) {
    return `
      <div class="subsection">
        <h3>${esc(sub.title)}</h3>
        <p style="color:var(--muted);font-size:15px;margin:0">No ideas here yet — coming soon.</p>
      </div>`;
  }
  return `
    <div class="subsection">
      <h3>${esc(sub.title)}</h3>
      <div class="card-grid">${ideas.map(cardHTML).join("")}</div>
    </div>`;
}

function sectionHTML(section) {
  return `
    <section class="section" id="${esc(section.id)}">
      <div class="wrap">
        <div class="section-head">
          <h2>${esc(section.title)}</h2>
          <p>${esc(section.blurb)}</p>
        </div>
        ${section.subsections.map(sub => subsectionHTML(section.id, sub)).join("")}
      </div>
    </section>`;
}

document.getElementById("sections").innerHTML =
  SECTIONS.map(sectionHTML).join("");
