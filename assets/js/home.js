import { FACTS, PROJECTS, FOOTNOTE_TOTAL } from './data.js';
import { initCommon, nav, footer, ph, esc, reduceMotion } from './common.js';
import { hoverPreview } from './preview.js';

document.querySelector('[data-nav]').innerHTML = nav({ ctx: 'Selected work, 2026', current: 'Work' });

document.querySelector('[data-index-hook]').textContent =
  `${FOOTNOTE_TOTAL} footnotes are hidden in these pages, from medieval medicine to Jaws.`;

const list = document.querySelector('[data-index]');
list.innerHTML = PROJECTS.map((p) => `
  <li class="row" data-slug="${p.slug}">
    <a href="project.html?p=${p.slug}">
      <span class="row__title"><span class="row__t" style="view-transition-name:t-${p.slug}">${esc(p.title)}</span><span class="row__num">${p.n}</span></span>
      <span class="row__meta"><span class="row__field">${esc(p.field)}</span><span class="row__disc">${esc(p.disc)}</span></span>
      <span class="row__inline">${ph(p.preview[0], '16/9')}</span>
    </a>
  </li>`).join('');

hoverPreview({
  list,
  rowSelector: '.row',
  frames: (row) => PROJECTS.find((p) => p.slug === row.dataset.slug).preview,
  label: (row) => `Open ${PROJECTS.find((p) => p.slug === row.dataset.slug).title}`,
});

document.querySelector('[data-footer]').outerHTML = footer({ note: 15 });

/* ---------- Things to know: deck shuffle, no repeats until all seen ---------- */
const line = document.querySelector('[data-fact]');
const btn = document.querySelector('[data-shuffle]');
let current = 0;
let deck = [];
const refill = () => {
  deck = FACTS.map((_, i) => i).filter((i) => i !== current);
  for (let i = deck.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [deck[i], deck[j]] = [deck[j], deck[i]]; }
};
line.textContent = FACTS[0];
btn.addEventListener('click', async () => {
  if (!deck.length) refill();
  current = deck.pop();
  if (reduceMotion || !line.animate) { line.textContent = FACTS[current]; return; }
  btn.disabled = true;
  await line.animate([{ transform: 'translateY(0)', opacity: 1 }, { transform: 'translateY(-60%)', opacity: 0 }], { duration: 110, easing: 'ease-in' }).finished;
  line.textContent = FACTS[current];
  await line.animate([{ transform: 'translateY(60%)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }], { duration: 180, easing: 'cubic-bezier(.2,.7,.2,1)' }).finished;
  btn.disabled = false;
});

initCommon({ current: 'Work' });
