import { SIDEQUESTS } from './data.js';
import { initCommon, nav, footer, ph, esc, sp } from './common.js';
import { hoverPreview } from './preview.js';

document.querySelector('[data-nav]').innerHTML = nav({ ctx: 'Branding, coursework and experiments', current: 'Sidequests' });
document.querySelector('[data-count]').textContent = SIDEQUESTS.length;

const cats = ['All', ...new Set(SIDEQUESTS.map((s) => s.cat))];
const count = (c) => (c === 'All' ? SIDEQUESTS.length : SIDEQUESTS.filter((s) => s.cat === c).length);
const filters = document.querySelector('[data-filters]');
filters.innerHTML = cats.map((c, i) =>
  `<button type="button" class="flt" aria-pressed="${i === 0}" data-cat="${c}">${c}<sup>${count(c)}</sup></button>`).join('');

const grid = document.querySelector('[data-grid]');
grid.innerHTML = SIDEQUESTS.map((s, i) => `
  <li class="sq" data-cat="${s.cat}" style="--s:${s.span}">
    <button type="button" class="sq__btn" data-open="${i}">
      ${ph('Cover image', `${sp(s.span)}/${s.h}`)}
      <span class="sq__meta"><span class="sq__t">${esc(s.title)}</span><span class="sq__c">${esc(s.cat)}</span></span>
    </button>
  </li>`).join('');

const list = document.querySelector('[data-list]');
list.innerHTML = `<li class="sql__head" aria-hidden="true"><span>Title</span><span>Category</span><span>Made for</span></li>` +
  SIDEQUESTS.map((s, i) => `
  <li class="sql" data-cat="${s.cat}" data-i="${i}">
    <button type="button" data-open="${i}"><span class="sql__t">${esc(s.title)}</span><span>${esc(s.cat)}</span><span>${esc(s.made)}</span></button>
  </li>`).join('');

hoverPreview({
  list,
  rowSelector: '.sql',
  frames: (row) => [`Preview: ${SIDEQUESTS[row.dataset.i].title}`, `${SIDEQUESTS[row.dataset.i].title}, detail`],
  label: () => 'Open',
  dim: false,
});

/* filters */
filters.addEventListener('click', (e) => {
  const b = e.target.closest('.flt');
  if (!b) return;
  filters.querySelectorAll('.flt').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  const c = b.dataset.cat;
  document.querySelectorAll('.sq, .sql').forEach((el) => { el.hidden = c !== 'All' && el.dataset.cat !== c; });
});

/* grid / list */
const views = document.querySelector('[data-views]');
views.addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (!b) return;
  views.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  const isList = b.dataset.view === 'list';
  grid.hidden = isList;
  list.hidden = !isList;
});

/* lightweight overlay */
const dlg = document.querySelector('[data-dialog]');
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-open]');
  if (!b) return;
  const s = SIDEQUESTS[b.dataset.open];
  dlg.querySelector('[data-dialog-body]').innerHTML = `
    <p class="sqd__meta">${esc(s.cat)}<span class="mute">${esc(s.made)}</span></p>
    <h2 class="sqd__t">${esc(s.title)}</h2>
    <p class="sqd__p">A few lines about this piece go here: what it was for, what you made and one thing you’d do differently.</p>
    <div class="sqd__imgs">${ph('Image 1', '16/10')}${ph('Image 2', '4/5')}${ph('Image 3', '4/5')}</div>`;
  dlg.showModal();
});
dlg.querySelector('[data-dialog-close]').addEventListener('click', () => dlg.close());
dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });

document.querySelector('[data-footer]').outerHTML = footer();
initCommon({ current: 'Sidequests' });
