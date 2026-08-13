/* ==========================================================================
   Glossary page: an A–Z of every GLOSSARY term, with search.
   ========================================================================== */

mountChrome();

const gEl = document.getElementById("glossary");
let gq = "";

function render() {
  const terms = Object.keys(GLOSSARY).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  const filtered = gq
    ? terms.filter(t => t.toLowerCase().includes(gq) || GLOSSARY[t].toLowerCase().includes(gq))
    : terms;
  document.getElementById("db-sub") &&
    (document.getElementById("db-sub").textContent = `${terms.length} terms defined.`);
  gEl.innerHTML = filtered.length
    ? `<dl class="gloss-list">${filtered.map(t =>
        `<div class="gloss-item"><dt>${esc(t)}</dt><dd>${esc(GLOSSARY[t])}</dd></div>`).join("")}</dl>`
    : `<p class="db-empty">No terms match “${esc(gq)}”.</p>`;
}

document.getElementById("gq").addEventListener("input", e => { gq = e.target.value.trim().toLowerCase(); render(); });
render();
