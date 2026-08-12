/* ==========================================================================
   UI behaviors: scroll-reveal motion + slide carousels.
   Called by app.js after the page is built.
   ========================================================================== */

// Fade/slide elements in as they enter the viewport.
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  els.forEach(e => io.observe(e));
}

// Auto-advancing carousels with arrows + dots. Pauses on hover.
function initCarousels() {
  document.querySelectorAll("[data-carousel]").forEach(c => {
    const track = c.querySelector(".carousel-track");
    const slides = Array.from(track.children);
    const dotsWrap = c.querySelector(".c-dots");
    let i = 0, timer = null;
    if (slides.length <= 1 && dotsWrap) dotsWrap.style.display = "none";

    slides.forEach((_, idx) => {
      const d = document.createElement("button");
      d.className = "c-dot";
      d.setAttribute("aria-label", "Go to slide " + (idx + 1));
      d.addEventListener("click", () => { go(idx); restart(); });
      dotsWrap.appendChild(d);
    });
    const dots = Array.from(dotsWrap.children);

    function render() {
      track.style.transform = `translateX(-${i * 100}%)`;
      dots.forEach((d, idx) => d.classList.toggle("on", idx === i));
    }
    function go(n) { i = (n + slides.length) % slides.length; render(); }
    function start() { if (slides.length > 1) timer = setInterval(() => go(i + 1), 4500); }
    function stop() { clearInterval(timer); }
    function restart() { stop(); start(); }

    const prev = c.querySelector(".c-prev"), next = c.querySelector(".c-next");
    if (prev) prev.addEventListener("click", () => { go(i - 1); restart(); });
    if (next) next.addEventListener("click", () => { go(i + 1); restart(); });
    c.addEventListener("mouseenter", stop);
    c.addEventListener("mouseleave", start);

    render();
    start();
  });
}

function initUI() { initReveal(); initCarousels(); }
