import { EMAIL, LINKS, FOOTNOTES, FOOTNOTE_TOTAL } from './data.js';

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
    `<span class="fn__label">Footnote ${pad2(n)}</span><p class="fn__text">${esc(FOOTNOTES[n])}</p></div>`;
}

export function nav({ ctx, current }) {
  const links = [['Work', 'index.html#work'], ['Sidequests', 'sidequests.html'], ['Info', 'index.html#info'], ['Contact', 'index.html#contact']];
  return `<nav class="nav" aria-label="Main">
    <a class="nav__name" href="index.html">Anand Krishna</a>
    <span class="nav__ctx">${esc(ctx)}</span>
    <div class="nav__links">${links.map(([l, h]) => `<a href="${h}"${l === current ? ' aria-current="page"' : ''}>${l}</a>`).join('')}</div>
    <button class="nav__menu" type="button" aria-haspopup="dialog" data-menu-open>Menu</button>
  </nav>`;
}

export function linksRow(cls = '') {
  return LINKS.map(([l, h]) => `<a class="${cls}" href="${h}">${l}</a>`).join('');
}

export function footer({ note } = {}) {
  return `<footer class="footer t-ink" id="contact">
    <div class="wrap">
      ${note ? `<div class="footer__note">${footnote(note)}</div>` : ''}
      <p class="footer__q" data-cta-label>Got a project, a role or an odd idea?</p>
      <button class="footer__cta" type="button" data-copy-email aria-label="Copy my email address">
        <span data-fit="fill"><span class="l">Write</span> <span class="l">to me</span></span>
      </button>
      <div class="footer__bottom grid">
        <span class="footer__copy">© 2026 Anand Krishna</span>
        <div class="footer__links">${linksRow()}</div>
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
  document.querySelectorAll('[data-fn-count]').forEach((el) => { el.textContent = `Footnotes found: ${n} of ${FOOTNOTE_TOTAL}`; });
}

/* ---------- mobile menu ---------- */
function initMenu(current) {
  const d = document.createElement('dialog');
  d.className = 'menu t-ink';
  d.setAttribute('aria-label', 'Menu');
  const items = [['Work', 'index.html#work', '5'], ['Sidequests', 'sidequests.html', '12'], ['Info', 'index.html#info', ''], ['Contact', 'index.html#contact', '']];
  d.innerHTML = `<div class="menu__top"><span class="nav__name">Anand Krishna</span><button type="button" class="menu__close" data-menu-close>Close</button></div>
    <ul class="menu__list">${items.map(([l, h, n]) => `<li><a href="${h}" class="${l === current ? 'is-current' : ''}">${l}${n ? `<sup>${n}</sup>` : ''}</a></li>`).join('')}</ul>
    <div class="menu__foot"><p class="mute" data-fn-count></p><div class="menu__links">${linksRow()}</div></div>`;
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
