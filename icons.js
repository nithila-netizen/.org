/* ==========================================================================
   Inline SVG icons, so the site needs no image files or external libraries.
   icon("name") returns an <svg> string. Used across all pages.
   ========================================================================== */
const ICONS = {
  // brand pulse / activity
  pulse:   '<path d="M22 12h-4l-3 9L9 3l-3 9H2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  search:  '<circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M21 21l-4.3-4.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  arrow:   '<path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  external:'<path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  check:   '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8.5 12.5l2.5 2.5 4.5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  minus:   '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 12h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  // stat + glance icons
  compass: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  layers:  '<path d="M12 3l9 5-9 5-9-5 9-5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M3 13l9 5 9-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  package: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9" fill="none" stroke="currentColor" stroke-width="2"/>',
  sprout:  '<path d="M12 20v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 13c0-3-2-5-6-5 0 3 2 5 6 5zM12 13c0-3 2-5 6-5 0 3-2 5-6 5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  building:'<rect x="5" y="3" width="14" height="18" rx="1.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  calendar:'<rect x="4" y="5" width="16" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4 9h16M8 3v4M16 3v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  pin:     '<path d="M12 21s7-6.3 7-11a7 7 0 10-14 0c0 4.7 7 11 7 11z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="12" cy="10" r="2.5" fill="none" stroke="currentColor" stroke-width="2"/>',
  shield:  '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  tag:     '<path d="M3 12l8-8h8v8l-8 8-8-8z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="15" cy="9" r="1.6" fill="currentColor"/>',
  // industry icons
  flask:   '<path d="M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  scan:    '<path d="M4 8V6a2 2 0 012-2h2M16 4h2a2 2 0 012 2v2M20 16v2a2 2 0 01-2 2h-2M8 20H6a2 2 0 01-2-2v-2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M4 12h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  heart:   '<path d="M12 20s-7-4.5-9-9a4.5 4.5 0 019-2 4.5 4.5 0 019 2c-2 4.5-9 9-9 9z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
};

function icon(name) {
  const body = ICONS[name] || ICONS.package;
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${body}</svg>`;
}

// Star rating (out of 5, supports halves). Returns HTML.
function stars(r) {
  const path = "M12 2l2.9 6 6.6.6-5 4.3 1.5 6.5L12 16.9 5.9 20.5l1.5-6.5-5-4.3 6.6-.6z";
  let out = "";
  for (let i = 1; i <= 5; i++) {
    const type = r >= i ? "full" : (r >= i - 0.5 ? "half" : "empty");
    if (type === "full")  out += `<svg class="star" viewBox="0 0 24 24"><path d="${path}" fill="currentColor"/></svg>`;
    else if (type === "empty") out += `<svg class="star" viewBox="0 0 24 24"><path d="${path}" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`;
    else out += `<svg class="star" viewBox="0 0 24 24"><defs><linearGradient id="half"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs><path d="${path}" fill="url(#half)" stroke="currentColor" stroke-width="1.3"/></svg>`;
  }
  return `<span class="stars" role="img" aria-label="${r} out of 5">${out}</span><span class="rnum">${Number(r).toFixed(1)}</span>`;
}

// Short label for a catalog entry's status.
function statusLabel(s) {
  return s === "adds-ai" ? "Needs to be AI-ified" : (s === "watch" ? "One to watch" : "Already AI");
}

// Escape text before inserting into HTML.
function esc(s) {
  return String(s == null ? "" : s)
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
