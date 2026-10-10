import { FACTS, PROJECTS, FOOTNOTE_TOTAL } from './data.js';
import { initCommon, nav, footer, ph, esc, reduceMotion } from './common.js';
import { hoverPreview } from './preview.js';

document.querySelector('[data-nav]').innerHTML = nav({ ctx: 'Selected work, 2026', current: 'Work' });

document.querySelector('[data-index-hook]').textContent =
  `${FOOTNOTE_TOTAL} small facts are hidden in these pages, from medieval medicine to Jaws.`;

const list = document.querySelector('[data-index]');
list.innerHTML = PROJECTS.map((p) => `
  <li class="row" data-slug="${p.slug}">
    <a href="project.html?p=${p.slug}">
      <span class="row__title"><span class="row__t" style="view-transition-name:t-${p.slug}">${esc(p.title)}</span><span class="row__num">${p.n}</span></span>
      <span class="row__meta"><span class="row__field">${esc(p.field)}</span><span class="row__disc">${esc(p.disc)}</span></span>
      <span class="row__inline">${p.hero && p.hero.src
        ? `<img src="${p.hero.src}" alt="" loading="lazy" decoding="async">`
        : ph(p.preview[0], '16/9')}</span>
    </a>
  </li>`).join('');

hoverPreview({
  list,
  rowSelector: '.row',
  frames: (row) => PROJECTS.find((p) => p.slug === row.dataset.slug).preview,
  label: (row) => `Open ${PROJECTS.find((p) => p.slug === row.dataset.slug).title}`,
});

document.querySelector('[data-footer]').outerHTML = footer({ note: 15 });

/* ---------- Things to know: a deck of lines with a progress counter ----------
   Line 01 always opens. Each round shows every line once in random order,
   the counter shows how many this visitor has seen, and after the last one
   the link reads "Start over". */
const line = document.querySelector('[data-fact]');
const btn = document.querySelector('[data-shuffle]');
const digits = [...document.querySelectorAll('[data-digit]')];
const srCount = document.querySelector('[data-fact-sr]');
const N = FACTS.length;
document.querySelector('[data-fact-total]').textContent = String(N).padStart(2, '0');
const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
let current = 0;
let seen = 1;
let deck = shuffle(FACTS.map((_, i) => i).filter((i) => i !== 0));

// Odometer counter: only digits that change roll. Up on Next, down on reset.
function rollCount(n, dir) {
  const s = String(n).padStart(2, '0');
  srCount.textContent = String(n);
  digits.forEach((d, i) => {
    if (d.textContent === s[i]) return;
    if (reduceMotion || !d.animate) { d.textContent = s[i]; return; }
    d.getAnimations().forEach((a) => a.cancel());
    d.animate([{ transform: 'translateY(0)' }, { transform: `translateY(${-100 * dir}%)` }], { duration: 110, easing: 'ease-in', fill: 'forwards' });
    setTimeout(() => {
      d.getAnimations().forEach((a) => a.cancel());
      d.textContent = s[i];
      d.animate([{ transform: `translateY(${100 * dir}%)` }, { transform: 'translateY(0)' }], { duration: 180, easing: 'cubic-bezier(.2,.7,.2,1)' });
    }, 110);
  });
}

const render = () => {
  line.textContent = FACTS[current];
  btn.textContent = seen === N ? 'Start over' : 'Next';
};
render();

let busy = false;
btn.addEventListener('click', () => {
  if (busy) return;
  const reset = seen === N;
  if (reset) {
    // Every round opens on line 01 (the orange one), then the rest in random order.
    current = 0;
    seen = 1;
    deck = shuffle(FACTS.map((_, i) => i).filter((i) => i !== 0));
  } else {
    current = deck.pop();
    seen += 1;
  }
  rollCount(seen, reset ? -1 : 1);
  if (reduceMotion || !line.animate) { render(); return; }
  // The swap runs on a timer, so a stalled animation can never lock the button.
  busy = true;
  line.animate([{ transform: 'translateY(0)', opacity: 1 }, { transform: 'translateY(-60%)', opacity: 0 }], { duration: 110, easing: 'ease-in', fill: 'forwards' });
  setTimeout(() => {
    line.getAnimations().forEach((a) => a.cancel());
    render();
    line.animate([{ transform: 'translateY(60%)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }], { duration: 180, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'forwards' });
    busy = false;
  }, 110);
});

/* ---------- Hero entrance: the name springs in letter by letter ---------- */
const nameEl = document.querySelector('.hero__name');
nameEl.querySelectorAll('.l').forEach((word) => {
  word.setAttribute('aria-hidden', 'true'); // the h1 carries the name as its aria-label
  word.innerHTML = [...word.textContent].map((c) => `<span class="ch">${esc(c)}</span>`).join('');
});
const letters = [...nameEl.querySelectorAll('.ch')];

// A real damped spring (stiffness, damping), sampled at 60 fps.
// Returns displacement values going 1 → 0, overshooting past 0 before settling.
function spring(stiffness, damping) {
  const w0 = Math.sqrt(stiffness);
  const z = damping / (2 * w0);
  const wd = w0 * Math.sqrt(1 - z * z);
  const end = Math.log(500) / (z * w0); // until the wobble is under 0.2%
  const pts = [];
  for (let t = 0; t < end; t += 1 / 60) {
    pts.push(Math.exp(-z * w0 * t) * (Math.cos(wd * t) + ((z * w0) / wd) * Math.sin(wd * t)));
  }
  pts.push(0);
  return { pts, duration: (pts.length - 1) * (1000 / 60) };
}

function playIntro() {
  const root = document.documentElement;
  if (reduceMotion || !nameEl.animate) { root.classList.remove('intro'); return; }
  const { pts, duration } = spring(180, 15);
  const frames = pts.map((x, i) => ({
    transform: `translateY(${(x * 105).toFixed(2)}%) rotate(${(x * 8).toFixed(2)}deg)`,
    offset: i / (pts.length - 1),
  }));
  nameEl.classList.add('is-entering');
  const anims = letters.map((ch, i) => ch.animate(frames, { duration, delay: 80 + i * 42, easing: 'linear', fill: 'backwards' }));
  root.classList.remove('intro');
  // The rest of the hero follows once the name has mostly landed.
  [document.querySelector('.hero .nav'), document.querySelector('.hero__intro'), document.querySelector('.facts')]
    .filter(Boolean)
    .forEach((el, i) => el.animate(
      [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }],
      { duration: 520, delay: 560 + i * 90, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' },
    ));
  Promise.all(anims.map((a) => a.finished))
    .then(() => nameEl.classList.remove('is-entering'))
    .catch(() => nameEl.classList.remove('is-entering'));
}

/* ---------- Opening curtain: "Designer, engineer, filmmaker" decodes, then lifts ---------- */
// The <html> element carries the "curtain" state class; the screen itself is .curtain-screen.
const curtain = document.querySelector('.curtain-screen');

function runCurtain(onLift) {
  const root = document.documentElement;
  try { sessionStorage.setItem('ak-curtain', '1'); } catch { /* plays again next time, which is fine */ }
  // One word at a time in the same spot: each decodes in, holds, scrambles out, then the next arrives.
  const WORDS = ['Designer', 'Engineer', 'Filmmaker'];
  const slot = curtain.querySelector('[data-word]');
  const POOL = 'abcdefghijklmnopqrstuvwxyz';
  const TICK = 24;
  const rand = (c) => { const r = POOL[Math.floor(Math.random() * POOL.length)]; return c === c.toUpperCase() ? r.toUpperCase() : r; };
  const build = (word) => {
    slot.textContent = '';
    const list = [...word].map((c) => { const s = document.createElement('span'); s.className = 'cc'; s.textContent = c; slot.append(s); return { s, c }; });
    // Lock each letter's box to its final width so the word never jitters while it scrambles.
    list.forEach((o) => { o.s.style.width = `${o.s.getBoundingClientRect().width}px`; o.s.textContent = ''; });
    return list;
  };
  const decodeIn = (list, done) => {
    let f = 0;
    const id = setInterval(() => {
      f += 1;
      list.forEach((o, k) => {
        if (f >= k + 2) { o.s.textContent = o.c; o.s.classList.remove('is-scr'); }
        else if (f >= k / 2) { o.s.textContent = rand(o.c); o.s.classList.add('is-scr'); }
      });
      if (f >= list.length + 2) { clearInterval(id); done(); }
    }, TICK);
  };
  const scrambleOut = (list, done) => {
    let f = 0;
    const id = setInterval(() => {
      f += 1;
      list.forEach((o, k) => {
        const fromEnd = list.length - 1 - k;
        if (f >= fromEnd + 2) o.s.textContent = '';
        else if (f >= fromEnd / 2) { o.s.textContent = rand(o.c); o.s.classList.add('is-scr'); }
      });
      if (f >= list.length + 2) { clearInterval(id); done(); }
    }, TICK * 0.6);
  };

  let lifted = false;
  const lift = () => {
    if (lifted) return;
    lifted = true;
    root.classList.add('curtain-leaving');
    setTimeout(onLift, 260); // the name starts springing while the curtain is still rising
    setTimeout(() => { root.classList.remove('curtain', 'curtain-leaving'); curtain.remove(); }, 900);
  };
  const play = (i) => {
    if (lifted) return;
    const list = build(WORDS[i]);
    curtain.classList.add('is-ready');
    decodeIn(list, () => {
      if (i === WORDS.length - 1) { setTimeout(lift, 200); return; }
      setTimeout(() => scrambleOut(list, () => play(i + 1)), 80);
    });
  };
  setTimeout(() => play(0), 40);
  curtain.addEventListener('click', lift);
  addEventListener('keydown', lift, { once: true });
}

initCommon({ current: 'Work' });
// Start after the web font has loaded and the name has been sized to the page width.
(document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
  if (curtain && document.documentElement.classList.contains('curtain')) runCurtain(() => requestAnimationFrame(playIntro));
  else { if (curtain) curtain.remove(); requestAnimationFrame(playIntro); }
});
