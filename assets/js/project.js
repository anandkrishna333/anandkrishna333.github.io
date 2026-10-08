import { PROJECTS } from './data.js';
import { initCommon, nav, ph, footnote, esc, sp, linksRow } from './common.js';

const slug = new URLSearchParams(location.search).get('p');
const idx = Math.max(0, PROJECTS.findIndex((p) => p.slug === slug));
const p = PROJECTS[idx];
const next = PROJECTS[(idx + 1) % PROJECTS.length];
const dark = p.theme === 'ink';

document.title = `${p.title}, Anand Krishna`;
document.body.className = `t-${p.theme}`;
document.querySelector('meta[name="theme-color"]').content = dark ? '#000000' : '#EFEFEB';

/* ---------- blocks ---------- */
const ratio = (span, h) => `${sp(span)}/${h}`;
const cap = (t) => (t ? `<figcaption>${esc(t)}</figcaption>` : '');

function block(op) {
  const [k, ...a] = op;
  switch (k) {
    case 'statement': {
      const [t, size = 40, c = 3, s = 8] = a;
      return { min: c, html: `<p class="blk st" style="--r:%R%;--c:${c + 1};--s:${s};--fs:${size}">${esc(t)}</p>` };
    }
    case 'para': {
      const [t, c = 3, s = 5] = a;
      return { min: c, html: `<p class="blk para" style="--r:%R%;--c:${c + 1};--s:${s}">${esc(t)}</p>` };
    }
    case 'row': {
      const items = a[0];
      return {
        min: Math.min(...items.map((i) => i[0])),
        html: `<div class="blk sub" style="--r:%R%">${items.map(([c, s, h, caption, below, dy = 0]) =>
          `<figure class="it${s <= 3 ? ' it--sm' : ''}" style="--c:${c + 1};--s:${s};--dy:${dy}">${ph(caption, ratio(s, h))}${cap(below)}</figure>`).join('')}</div>`,
      };
    }
    case 'full': {
      const [h, caption, below] = a;
      return { min: 0, html: `<figure class="blk full" style="--r:%R%">${ph(caption, `1440/${h}`)}${below ? `<figcaption class="wrap">${esc(below)}</figcaption>` : ''}</figure>` };
    }
    case 'cols':
      return {
        min: Math.min(...a[0].map((i) => i[0])),
        html: `<div class="blk sub" style="--r:%R%">${a[0].map(([c, s, h, b]) =>
          `<div class="col" style="--c:${c + 1};--s:${s}"><h3>${esc(h)}</h3><p>${esc(b)}</p></div>`).join('')}</div>`,
      };
    case 'list':
      return {
        min: 3,
        html: `<dl class="blk list" style="--r:%R%;--c:4;--s:9">${a[0].map(([l, t]) =>
          `<div class="list__row"><dt>${esc(l)}</dt><dd>${esc(t)}</dd></div>`).join('')}</dl>`,
      };
    case 'swatches': {
      const [sw, c = 0] = a;
      return {
        min: c,
        html: `<div class="blk sub" style="--r:%R%">${sw.map(([hex, l], i) =>
          `<figure class="sw" style="--c:${c + 1 + i * 2};--s:2"><span style="background:${hex}"></span><figcaption>${esc(l)}</figcaption></figure>`).join('')}</div>`,
      };
    }
    default:
      return { min: 0, html: '' };
  }
}

function chapter(ch) {
  const blocks = ch.ops.map(block);
  // Blocks that leave the left margin free share the first row with the chapter label.
  let r = blocks[0] && blocks[0].min >= 3 ? 1 : 2;
  const body = blocks.map((b) => b.html.replace('%R%', r++)).join('');
  return `<section class="chapter${ch.fill ? ` chapter--band t-${ch.fill}` : ''}" aria-label="${esc(ch.label)}">
    <div class="wrap ch-grid grid">
      <div class="ch-aside"><p class="ch-n">${ch.n}</p><h2 class="ch-l">${esc(ch.label)}</h2>${ch.fn ? footnote(ch.fn) : ''}</div>
      ${body}
    </div>
  </section>`;
}

/* ---------- title + hero ---------- */
const metaHTML = `<dl class="ctitle__meta">${p.meta.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>`;

let top;
if (p.overlayTitle) {
  top = `
    <section class="ohero">
      ${ph(p.heroCaption, '1440/900')}
      <div class="ohero__title wrap"><span class="sup">${p.n}</span><h1 data-fit-box><span class="ctitle__t" data-fit="fill" style="view-transition-name:t-${p.slug}">${esc(p.title)}</span></h1></div>
    </section>
    <section class="ctitle ctitle--after wrap">
      <div class="ctitle__row grid">
        <div class="ctitle__sum"><p>${esc(p.summary)}</p><p class="ctitle__play"><span>Play film</span><span class="mute">Sound on</span></p></div>
        ${metaHTML}
      </div>
    </section>`;
} else {
  const hero = p.hero;
  const heroBlocks = hero.ops.map(block);
  top = `
    <section class="ctitle wrap">
      <h1 class="ctitle__h" data-fit-box><span class="ctitle__t" data-fit="shrink" data-reserve="48" style="view-transition-name:t-${p.slug}">${esc(p.title)}</span><span class="sup">${p.n}</span></h1>
      <div class="ctitle__row grid"><p class="ctitle__sum">${esc(p.summary)}</p>${metaHTML}</div>
    </section>
    <section class="chero${hero.fill ? ` chero--band t-${hero.fill}` : ''}" aria-label="Hero images">
      <div class="wrap ch-grid grid">${heroBlocks.map((b, i) => b.html.replace('%R%', i + 1)).join('')}</div>
    </section>`;
}

const nextTheme = dark ? 'paper' : 'ink';
const nextHTML = `
  <section class="next t-${nextTheme}" aria-label="Next project">
    <div class="wrap">
      <p class="next__label">${idx === PROJECTS.length - 1 ? 'Back to the start' : 'Next project'}</p>
      <div class="next__row grid">
        <a class="next__link" href="project.html?p=${next.slug}" data-fit-box>
          <span class="next__t" data-fit="shrink" data-reserve="40" style="view-transition-name:t-${next.slug}">${esc(next.title)}</span><span class="sup">${next.n}</span>
        </a>
        <a class="next__img" href="project.html?p=${next.slug}" tabindex="-1" aria-hidden="true">${ph(`${next.title} preview`, '330/230')}</a>
      </div>
      <div class="footer__bottom grid">
        <span class="footer__copy">© 2026 Anand Krishna</span>
        <div class="footer__links"><a href="index.html#work">All projects</a><a href="index.html#contact">Write to me</a></div>
        <a class="footer__top" href="#top">Back to top</a>
      </div>
    </div>
  </section>`;

document.querySelector('[data-nav]').innerHTML = nav({ ctx: `Project ${p.n} of 0${PROJECTS.length}`, current: '' });
document.querySelector('[data-page]').innerHTML = top + p.chapters.map(chapter).join('') + nextHTML;

initCommon({ current: 'Work' });
