import { EMAIL, LINKS, FOOTNOTES, FOOTNOTE_TOTAL, UPDATED } from './data.js';

export const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export const sp = (n) => 118 * n - 24; // column span width at 1440px
export const pad2 = (n) => String(n).padStart(2, '0');

// Image / video placeholder. Swap for <img> or <video> when the real assets exist.
export function ph(caption, ratio, extra = '') {
  return `<div class="ph ${extra}" role="img" aria-label="${esc(caption)}" style="aspect-ratio:${ratio}">` +
    `<span class="ph__cap">${esc(caption)}</span><span class="ph__mark" aria-hidden="true">+</span></div>`;
}

export function footnote(n) {
  return `<div class="fn" data-fn="${n}"><span class="fn__mark" aria-hidden="true"></span>` +
    `<span class="fn__label">Fact ${pad2(n)}</span><p class="fn__text">${esc(FOOTNOTES[n])}</p></div>`;
}

// The site is still growing; this says so without making a fuss.
export const wip = () => `<span class="wip"><span class="wip__dot" aria-hidden="true"></span>Work in progress · Last updated ${esc(UPDATED)}</span>`;

export function nav({ ctx, current }) {
  // Sidequests is hidden until it has real work in it (the page still exists at sidequests.html).
  const links = [['Work', 'index.html#work'], ['Info', 'index.html#info'], ['Contact', 'index.html#contact']];
  return `<nav class="nav" aria-label="Main">
    <a class="nav__name" href="index.html">Anand Krishna</a>
    <span class="nav__ctx">${ctx === 'wip' ? wip() : esc(ctx)}</span>
    <div class="nav__links">${links.map(([l, h]) => `<a href="${h}"${l === current ? ' aria-current="page"' : ''}>${l}</a>`).join('')}</div>
    <button class="nav__menu" type="button" aria-haspopup="dialog" data-menu-open>Menu</button>
  </nav>`;
}

// Tabler outline icons (MIT), 24px grid, drawn with the current text colour.
const ICONS = {
  mail: '<path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"/><path d="M3 7l9 6l9 -6"/>',
  linkedin: '<path d="M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"/><path d="M8 11l0 5"/><path d="M8 8l0 .01"/><path d="M12 16l0 -5"/><path d="M16 16v-3a2 2 0 0 0 -4 0"/>',
  behance: '<path d="M3 18v-12h4.5a3 3 0 0 1 0 6a3 3 0 0 1 0 6h-4.5"/><path d="M3 12l4.5 0"/><path d="M14 13h7a3.5 3.5 0 0 0 -7 0v2a3.5 3.5 0 0 0 6.64 1"/><path d="M16 6l3 0"/>',
  'arrow-up-right': '<path d="M17 7l-10 10"/><path d="M8 7l9 0l0 9"/>',
  'arrow-left': '<path d="M5 12l14 0"/><path d="M5 12l6 6"/><path d="M5 12l6 -6"/>',
};
export function icon(name, cls = 'icon') {
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;
}

// Profiles open in a new tab so visitors keep the portfolio open; email stays as a normal link.
const ext = (h) => (h.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : '');

export function linksRow(cls = '') {
  return LINKS.map(([l, h]) => `<a class="${cls}" href="${h}"${ext(h)}>${l}</a>`).join('');
}

// The same links as one consistent icon family. Each keeps a real name for screen readers and a tooltip.
export function iconLinks() {
  return LINKS.map(([l, h, ic]) => {
    const name = l === 'Email' ? `Email ${EMAIL}` : `${l} (opens in a new tab)`;
    return `<a class="icon-link" href="${h}"${ext(h)} aria-label="${esc(name)}" data-tip="${esc(l)}">${icon(ic)}</a>`;
  }).join('');
}

export function footer({ note } = {}) {
  return `<footer class="footer t-ink" id="contact">
    <div class="wrap">
      ${note ? `<div class="footer__note">${footnote(note)}</div>` : ''}
      <p class="footer__q" data-cta-label>Got a project, a role or an odd idea?</p>
      <button class="footer__cta" type="button" data-copy-email aria-label="Copy my email address">
        <span><span class="l">Write</span> <span class="l">to me</span></span>
      </button>
      <div class="footer__bottom grid">
        <span class="footer__copy">© 2026 Anand Krishna<span class="footer__wip">${wip()}</span></span>
        <div class="footer__icons">${iconLinks()}</div>
        <a class="footer__top" href="#top">Back to top</a>
      </div>
    </div>
  </footer>`;
}

/* ---------- fit text to its container width ---------- */
export function fitAll() {
  document.querySelectorAll('[data-fit]').forEach((el) => {
    el.style.fontSize = '';
    const parent = el.closest('[data-fit-box]') || el.parentElement;
    const cs = getComputedStyle(parent);
    const avail = parent.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) - (parseFloat(el.dataset.reserve) || 0);
    const w = el.getBoundingClientRect().width;
    if (!w || !avail) return;
    const base = parseFloat(getComputedStyle(el).fontSize);
    if (el.dataset.fit === 'fill' || w > avail) el.style.fontSize = `${(base * avail) / w}px`;
  });
}

/* ---------- footnotes: draw the mark in once, count what has been found ---------- */
const FN_KEY = 'ak-footnotes-found';
function loadFound() { try { return new Set(JSON.parse(localStorage.getItem(FN_KEY) || '[]')); } catch { return new Set(); } }
function saveFound(set) { try { localStorage.setItem(FN_KEY, JSON.stringify([...set])); } catch { /* storage unavailable */ } }

function initFootnotes() {
  const found = loadFound();
  const nodes = document.querySelectorAll('.fn');
  if (!('IntersectionObserver' in window)) { nodes.forEach((n) => n.classList.add('is-seen')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-seen');
      found.add(Number(e.target.dataset.fn));
      saveFound(found);
      updateFoundCount(found.size);
      io.unobserve(e.target);
    });
  }, { threshold: 0.6 });
  nodes.forEach((n) => io.observe(n));
  updateFoundCount(found.size);
}
function updateFoundCount(n) {
  document.querySelectorAll('[data-fn-count]').forEach((el) => { el.textContent = `Facts found: ${n} of ${FOOTNOTE_TOTAL}`; });
}

/* ---------- mobile menu ---------- */
function initMenu(current) {
  const d = document.createElement('dialog');
  d.className = 'menu t-ink';
  d.setAttribute('aria-label', 'Menu');
  const items = [['Work', 'index.html#work', '5'], ['Info', 'index.html#info', ''], ['Contact', 'index.html#contact', '']];
  d.innerHTML = `<div class="menu__top"><span class="nav__name">Anand Krishna</span><button type="button" class="menu__close" data-menu-close>Close</button></div>
    <ul class="menu__list">${items.map(([l, h, n]) => `<li><a href="${h}" class="${l === current ? 'is-current' : ''}">${l}${n ? `<sup>${n}</sup>` : ''}</a></li>`).join('')}</ul>
    <div class="menu__foot"><p class="mute" data-fn-count></p><div class="menu__links">${iconLinks()}</div></div>`;
  document.body.append(d);
  document.querySelectorAll('[data-menu-open]').forEach((b) => b.addEventListener('click', () => d.showModal()));
  d.querySelector('[data-menu-close]').addEventListener('click', () => d.close());
  d.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => d.close()));
}

/* ---------- "Write to me": hover shows the address, click copies it ---------- */
function initEmail() {
  const btn = document.querySelector('[data-copy-email]');
  const label = document.querySelector('[data-cta-label]');
  if (!btn || !label) return;
  const idle = label.textContent;
  const show = () => { label.textContent = `${EMAIL}  (click to copy)`; };
  const hide = () => { label.textContent = idle; };
  btn.addEventListener('pointerenter', show);
  btn.addEventListener('focus', show);
  btn.addEventListener('pointerleave', hide);
  btn.addEventListener('blur', hide);
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      label.textContent = 'Copied. Talk soon.';
    } catch {
      location.href = `mailto:${EMAIL}`;
    }
  });
}

export function initCommon({ current } = {}) {
  initMenu(current);
  initEmail();
  initFootnotes();
  const run = () => fitAll();
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(run);
  let t;
  addEventListener('resize', () => { clearTimeout(t); t = setTimeout(run, 80); });
  run();
}
