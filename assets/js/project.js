import { PROJECTS } from './data.js';
import { initCommon, nav, ph, footnote, esc, sp, icon, reduceMotion } from './common.js';

const slug = new URLSearchParams(location.search).get('p');
const idx = Math.max(0, PROJECTS.findIndex((p) => p.slug === slug));
const p = PROJECTS[idx];
const next = PROJECTS[(idx + 1) % PROJECTS.length];
const dark = p.theme === 'ink';

document.title = `${p.title}, Anand Krishna`;
document.body.className = `t-${p.theme}`;
document.querySelector('meta[name="theme-color"]').content = dark ? '#000000' : '#EFEFEB';

const img = ({ src, w, h, alt }, extra = '') =>
  `<img src="${src}" width="${w}" height="${h}" alt="${esc(alt)}" decoding="async" ${extra || 'loading="lazy"'}>`;
const behanceLink = (cls) => p.behance
  ? `<a class="cs-cta ${cls}" href="${p.behance}" target="_blank" rel="noopener noreferrer">View full case study on Behance${icon('arrow-up-right')}<span class="sr"> (opens in a new tab)</span></a>`
  : '';
const num = (i) => String(i + 1).padStart(2, '0');

/* ---------- glimpse format: at-a-glance, numbered section rail, short sections ---------- */
function figure(f) {
  const cap = f.cap ? `<figcaption>${esc(f.cap)}</figcaption>` : '';
  if (f.pair) return `<figure class="cs-fig"><div class="cs-pair">${f.pair.map((x) => img(x)).join('')}</div>${cap}</figure>`;
  return `<figure class="cs-fig${f.narrow ? ' cs-fig--narrow' : ''}">${img(f)}${cap}</figure>`;
}

// Simple comparison bars drawn from the data; the project's own row is set in ink, the rest in grey.
function bars(groups) {
  return `<div class="cs-bars">${groups.map((g) => {
    const max = Math.max(...g.rows.map((r) => r[1]));
    return `<figure class="cs-bars__g"><figcaption>${esc(g.label)}</figcaption><dl>${g.rows.map(([k, v], i) =>
      `<div class="cs-bar${i === g.ours ? ' is-ours' : ''}"><dt>${esc(k)}</dt><dd><span class="cs-bar__fill" style="--w:${(v / max) * 100}%"></span><span class="cs-bar__v">${v} ${esc(g.unit)}</span></dd></div>`).join('')}</dl></figure>`;
  }).join('')}</div>`;
}

function sectionBody(s, i) {
  const out = [
    `<p class="cs-num"><span>${num(i)}</span>${esc(s.label)}</p>`,
    `<h2 class="cs-h" id="h-${s.id}" tabindex="-1">${esc(s.title)}</h2>`,
  ];
  if (s.quote) out.push(`<blockquote class="cs-quote"><p>${esc(s.quote)}</p></blockquote>`);
  if (s.body) out.push(`<div class="cs-text">${s.body.map((t) => `<p>${esc(t)}</p>`).join('')}</div>`);
  if (s.bullets) out.push(`<ul class="cs-bullets">${s.bullets.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`);
  if (s.steps) out.push(`<ol class="cs-steps">${s.steps.map(([k, v]) => `<li><span class="cs-steps__k">${esc(k)}</span><p>${esc(v)}</p></li>`).join('')}</ol>`);
  if (s.rows) out.push(`<ol class="cs-rows">${s.rows.map(([k, v, im]) =>
    `<li><div class="cs-rows__t"><h3>${esc(k)}</h3><p>${esc(v)}</p></div>${im ? `<figure class="cs-rows__img${im.narrow ? ' cs-rows__img--narrow' : ''}">${img(im)}</figure>` : ''}</li>`).join('')}</ol>`);
  if (s.bigstats) out.push(`<dl class="cs-big">${s.bigstats.map(([v, k, d]) =>
    `<div><dd class="cs-big__v">${esc(v)}</dd><dt class="cs-big__k">${esc(k)}</dt>${d ? `<dd class="cs-big__d">${esc(d)}</dd>` : ''}</div>`).join('')}</dl>`);
  if (s.bars) out.push(bars(s.bars));
  if (s.stats) out.push(`<dl class="cs-stats">${s.stats.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>`);
  if (s.figs) out.push(s.figs.map(figure).join(''));
  if (s.note) out.push(`<p class="cs-note">${esc(s.note)}</p>`);
  if (s.after) out.push(`<div class="cs-text">${s.after.map((t) => `<p>${esc(t)}</p>`).join('')}</div>`);
  if (s.takeaway) out.push(`<div class="cs-takeaway"><p class="cs-takeaway__k">Key takeaway</p>${s.takeaway.map((t, i) => `<p class="${i ? 'cs-takeaway__s' : 'cs-takeaway__t'}">${esc(t)}</p>`).join('')}</div>`);
  if (s.fn) out.push(footnote(s.fn));
  return out.join('');
}

function glimpse() {
  const glance = p.glance.filter(([, v]) => v); // unfilled fields stay hidden
  return `
    <section class="ctitle cs-top wrap">
      <a class="cs-back" href="index.html#work">${icon('arrow-left')}All work</a>
      <h1 class="ctitle__h" data-fit-box><span class="ctitle__t" data-fit="shrink" data-reserve="48" style="view-transition-name:t-${p.slug}">${esc(p.title)}</span><span class="sup">${p.n}</span></h1>
      <div class="ctitle__row grid">
        <div class="cs-intro">
          <p class="ctitle__sum">${esc(p.summary)}</p>
          ${behanceLink('cs-cta--top')}
        </div>
        <dl class="ctitle__meta cs-glance">${glance.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
      </div>
    </section>
    <figure class="cs-hero wrap">${img(p.hero, 'fetchpriority="high"')}</figure>
    <div class="cs wrap">
      <nav class="cs-rail" aria-label="Sections of this case study">
        <ol>${p.sections.map((s, i) => `<li><a href="#s-${s.id}"><span class="cs-rail__n">${num(i)}</span>${esc(s.label)}</a></li>`).join('')}</ol>
        <span class="cs-rail__mark" aria-hidden="true"></span>
      </nav>
      <div class="cs-body">
        ${p.sections.map((s, i) => `<section class="cs-sec" id="s-${s.id}" aria-labelledby="h-${s.id}">${sectionBody(s, i)}</section>`).join('')}
      </div>
    </div>
    <section class="cs-end wrap" aria-labelledby="cs-end-h">
      <h2 class="cs-end__h" id="cs-end-h">That was the short version.</h2>
      <p class="cs-end__p">The full case study has the research, every iteration and the reasoning behind each decision.</p>
      ${behanceLink('cs-cta--end')}
    </section>`;
}
// Section rail: click to jump, and the mark follows the section you are reading.
function initRail() {
  const rail = document.querySelector('.cs-rail');
  if (!rail) return;
  const links = [...rail.querySelectorAll('a')];
  const secs = links.map((a) => document.querySelector(a.getAttribute('href')));
  const mark = rail.querySelector('.cs-rail__mark');
  const narrow = matchMedia('(max-width: 767px)');
  let active = -1;

  const place = () => {
    const a = links[active];
    if (!a) return;
    if (narrow.matches) {
      mark.style.transform = `translateX(${a.offsetLeft}px) scaleX(${a.offsetWidth / 100})`;
      const target = a.offsetLeft - 16;
      if (rail.scrollLeft > target || rail.scrollLeft + rail.clientWidth < a.offsetLeft + a.offsetWidth) {
        rail.scrollTo({ left: target, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    } else {
      mark.style.transform = `translateY(${a.offsetTop + a.offsetHeight / 2 - 1}px)`;
    }
  };
  const setActive = (i) => {
    if (i === active) return;
    active = i;
    links.forEach((a, j) => (j === i ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
    rail.classList.toggle('has-active', i >= 0);
    place();
  };
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const line = innerHeight * 0.35;
      let i = -1;
      secs.forEach((s, j) => { if (s.getBoundingClientRect().top <= line) i = j; });
      // At the very bottom, the last section counts as read even if it is short.
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) i = secs.length - 1;
      setActive(i);
    });
  };
  links.forEach((a, j) => a.addEventListener('click', (e) => {
    e.preventDefault();
    secs[j].scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', a.getAttribute('href'));
    secs[j].querySelector('.cs-h').focus({ preventScroll: true });
  }));
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', place);
  narrow.addEventListener('change', place);
  onScroll();
}

/* ---------- original chapter format (Loom and the films) ---------- */
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

function chapters() {
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
    const heroBlocks = p.hero.ops.map(block);
    top = `
      <section class="ctitle wrap">
        <h1 class="ctitle__h" data-fit-box><span class="ctitle__t" data-fit="shrink" data-reserve="48" style="view-transition-name:t-${p.slug}">${esc(p.title)}</span><span class="sup">${p.n}</span></h1>
        <div class="ctitle__row grid"><p class="ctitle__sum">${esc(p.summary)}</p>${metaHTML}</div>
      </section>
      <section class="chero${p.hero.fill ? ` chero--band t-${p.hero.fill}` : ''}" aria-label="Hero images">
        <div class="wrap ch-grid grid">${heroBlocks.map((b, i) => b.html.replace('%R%', i + 1)).join('')}</div>
      </section>`;
  }
  return top + p.chapters.map(chapter).join('');
}

/* ---------- next project ---------- */
const nextTheme = dark ? 'paper' : 'ink';
const nextImg = next.hero && next.hero.src
  ? `<img src="${next.hero.src}" width="${next.hero.w}" height="${next.hero.h}" alt="" loading="lazy" decoding="async">`
  : ph(`${next.title} preview`, '330/230');
const nextHTML = `
  <section class="next t-${nextTheme}" aria-label="Next project">
    <div class="wrap">
      <p class="next__label">${idx === PROJECTS.length - 1 ? 'Back to the start' : 'Next project'}</p>
      <div class="next__row grid">
        <a class="next__link" href="project.html?p=${next.slug}" data-fit-box>
          <span class="next__t" data-fit="shrink" data-reserve="40" style="view-transition-name:t-${next.slug}">${esc(next.title)}</span><span class="sup">${next.n}</span>
        </a>
        <a class="next__img" href="project.html?p=${next.slug}" tabindex="-1" aria-hidden="true">${nextImg}</a>
      </div>
      <div class="footer__bottom grid">
        <span class="footer__copy">© 2026 Anand Krishna</span>
        <div class="footer__links"><a href="index.html#work">All projects</a><a href="index.html#contact">Write to me</a></div>
        <a class="footer__top" href="#top">Back to top</a>
      </div>
    </div>
  </section>`;

document.querySelector('[data-nav]').innerHTML = nav({ ctx: `Project ${p.n} of 0${PROJECTS.length}`, current: '' });
document.querySelector('[data-page]').innerHTML = (p.sections ? glimpse() : chapters()) + nextHTML;

initCommon({ current: 'Work' });
initRail();
