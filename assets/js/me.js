/* ---------- The little me: a head with glasses that watches, blinks and reacts ----------
   Flat, one-colour drawing in the spirit of the Love, Death & Robots title glyphs.
   The head is drawn in the text colour; the glasses and mouth are cut out in the
   background colour, so it adapts to every section (orange, green, paper, black).
   Layers move by different amounts as the pointer moves, so the face seems to turn. */
import { reduceMotion, finePointer } from './common.js';

const SVG = `<svg class="me__svg" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
  <g class="me__tilt">
    <g class="me__turn">
      <g class="me__ears" data-l="ears"><rect x="12" y="52" width="10" height="16" rx="5"/><rect x="78" y="52" width="10" height="16" rx="5"/></g>
      <rect x="19" y="26" width="62" height="68" rx="21"/>
      <g data-l="hair"><g class="me__hair">
        <path d="M17 52V38C17 22 30 11 50 11s33 11 33 27v4c-7-4-16-6-27-5l-7 9-3-7-10 8-2-6c-8 3-13 7-17 11z"/>
        <path class="me__cut me__hairline" d="M18.5 51c4-4 9-7 15.5-9.5l2 6 10-8 3 7 7-9c11-1 19 1 26 5"/>
      </g></g>
      <g data-l="face">
        <g class="me__push">
          <g class="me__specs">
            <rect x="22" y="48" width="26" height="18" rx="5"/><rect x="52" y="48" width="26" height="18" rx="5"/>
            <rect x="46" y="53" width="8" height="3.2" rx="1.6"/>
            <rect x="12" y="53" width="11" height="3.2" rx="1.6"/><rect x="77" y="53" width="11" height="3.2" rx="1.6"/>
          </g>
          <g class="me__eyes" data-l="eyes">
            <g class="me__eye"><rect class="me__pill" x="32.5" y="52.5" width="5" height="9" rx="2.5"/><path class="me__hap" d="M31 59l4-4 4 4"/></g>
            <g class="me__eye"><rect class="me__pill" x="62.5" y="52.5" width="5" height="9" rx="2.5"/><path class="me__hap" d="M61 59l4-4 4 4"/></g>
          </g>
        </g>
        <g class="me__mouth">
          <path class="me__cut me__m-idle" d="M46 80h8"/>
          <path class="me__cut me__m-happy" d="M44 78.5q6 5.5 12 0"/>
          <ellipse class="me__m-ooh" cx="50" cy="80.5" rx="2.6" ry="3.2"/>
        </g>
      </g>
    </g>
  </g>
</svg>`;

export function me(variant) {
  return `<span class="me me--${variant}" data-me aria-hidden="true">${SVG}</span>`;
}

// A damped spring sampled at 60 fps: values go 1 → 0, overshooting once or twice.
function spring(stiffness, damping) {
  const w0 = Math.sqrt(stiffness);
  const z = damping / (2 * w0);
  const wd = w0 * Math.sqrt(1 - z * z);
  const end = Math.log(400) / (z * w0);
  const pts = [];
  for (let t = 0; t < end; t += 1 / 60) pts.push(Math.exp(-z * w0 * t) * (Math.cos(wd * t) + ((z * w0) / wd) * Math.sin(wd * t)));
  pts.push(0);
  return { pts, duration: (pts.length - 1) * (1000 / 60) };
}
const WOBBLE = spring(260, 9);
const BOUNCE = spring(320, 14);
const play = (el, fn, s) => {
  if (reduceMotion || !el.animate) return;
  el.getAnimations().forEach((a) => a.cancel());
  el.animate(s.pts.map((x, i) => ({ transform: fn(x), offset: i / (s.pts.length - 1) })), { duration: s.duration, easing: 'linear' });
};

// How far each layer travels at full turn (in drawing units). The eyes travel most, the ears go the other way.
const DEPTH = { ears: [-2, 0], hair: [1.2, 0.8], face: [3.5, 2.5], eyes: [4.5, 3] };

export function initMe() {
  const all = [...document.querySelectorAll('[data-me]')].map((el) => ({
    el,
    tilt: el.querySelector('.me__tilt'),
    turn: el.querySelector('.me__turn'),
    push: el.querySelector('.me__push'),
    hair: el.querySelector('.me__hair'),
    layers: [...el.querySelectorAll('[data-l]')].map((g) => [g, DEPTH[g.dataset.l]]),
    x: 0, y: 0, tx: 0, ty: 0,
    visible: false,
    mood: '',
    hold: 0,
  }));
  if (!all.length) return;
  let focusEl = null; // an element that caught its eye (the Behance link)
  let px = null;
  let py = null;
  let lastMove = 0;
  let raf = 0;
  let last = 0;
  let glanceAt = 0;

  const setMood = (m, mood, ms = 0) => {
    m.mood = mood;
    m.el.classList.toggle('is-happy', mood === 'happy');
    m.el.classList.toggle('is-ooh', mood === 'ooh');
    clearTimeout(m.moodT);
    if (ms) m.moodT = setTimeout(() => setMood(m, m.hover ? 'happy' : (focusEl ? 'ooh' : '')), ms);
  };
  const blink = (m) => {
    if (m.mood === 'happy') return;
    m.el.classList.add('is-blink');
    setTimeout(() => m.el.classList.remove('is-blink'), 120);
  };
  const tiltSpring = (m, deg) => play(m.tilt, (x) => `rotate(${(x * deg).toFixed(2)}deg)`, WOBBLE);
  const hairBounce = (m) => play(m.hair, (x) => `translateY(${(x * -3).toFixed(2)}px)`, WOBBLE);
  // Click: push the glasses back up the nose, like I do forty times a day.
  const pushSpecs = (m) => play(m.push, (x) => `translateY(${(x * 4).toFixed(2)}px)`, BOUNCE);

  all.forEach((m) => {
    m.el.addEventListener('pointerenter', () => { m.hover = true; setMood(m, 'happy'); tiltSpring(m, -7); hairBounce(m); });
    m.el.addEventListener('pointerleave', () => { m.hover = false; setMood(m, focusEl ? 'ooh' : ''); });
    m.el.addEventListener('click', () => { pushSpecs(m); hairBounce(m); setMood(m, 'ooh', 420); });
  });

  // Blinks: each head on its own random rhythm, now and then a double blink.
  if (!reduceMotion) {
    all.forEach((m) => {
      const next = () => {
        m.blinkT = setTimeout(() => {
          if (m.visible) { blink(m); if (Math.random() < 0.2) setTimeout(() => blink(m), 220); }
          next();
        }, 2200 + Math.random() * 3800);
      };
      next();
    });
  }

  // Say hello the first time each head scrolls into view.
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    const m = all.find((n) => n.el === e.target);
    m.visible = e.isIntersecting;
    if (m.visible && !m.greeted && e.intersectionRatio > 0.9) {
      m.greeted = true;
      setTimeout(() => { setMood(m, 'happy', 900); tiltSpring(m, 6); hairBounce(m); }, 350);
    }
    if (m.visible) wake();
  }), { threshold: [0, 0.95] });
  all.forEach((m) => io.observe(m.el));

  if (reduceMotion) return;

  // Where to look: the pointer, an element that caught its eye, or (when idle) somewhere random.
  addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse') { px = e.clientX; py = e.clientY; lastMove = performance.now(); wake(); } }, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => { px = null; });

  document.querySelectorAll('[data-me-look]').forEach((t) => {
    t.addEventListener('pointerenter', () => { focusEl = t; all.forEach((m) => { if (!m.hover) setMood(m, 'ooh'); }); });
    t.addEventListener('pointerleave', () => { focusEl = null; all.forEach((m) => { if (!m.hover) setMood(m, ''); }); });
  });

  const aim = (m, x, y) => {
    const r = m.el.getBoundingClientRect();
    const dx = x - (r.left + r.width / 2);
    const dy = y - (r.top + r.height / 2);
    const d = Math.hypot(dx, dy) + 140;
    m.tx = dx / d;
    m.ty = dy / d;
  };

  function wake() { if (!reduceMotion && !raf) { last = performance.now(); raf = requestAnimationFrame(tick); } }
  function tick(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const idle = !finePointer || px === null || now - lastMove > 3500;
    if (idle && !focusEl && now > glanceAt) {
      // Glance somewhere, hold it, sometimes come back to the middle.
      glanceAt = now + 1600 + Math.random() * 2600;
      const back = Math.random() < 0.35;
      all.forEach((m) => { m.gx = back ? 0 : (Math.random() * 2 - 1) * 0.75; m.gy = back ? 0 : (Math.random() * 2 - 1) * 0.5; });
    }
    let moving = false;
    all.forEach((m) => {
      if (!m.visible) return;
      if (focusEl) { const r = focusEl.getBoundingClientRect(); aim(m, r.left + r.width / 2, r.top + r.height / 2); }
      else if (!idle) aim(m, px, py);
      else { m.tx = m.gx || 0; m.ty = m.gy || 0; }
      // Eyes catch up fast, the way real eyes snap to things.
      const k = 1 - Math.exp(-dt * (idle ? 7 : 12));
      m.x += (m.tx - m.x) * k;
      m.y += (m.ty - m.y) * k;
      if (Math.abs(m.tx - m.x) > 0.001 || Math.abs(m.ty - m.y) > 0.001) moving = true;
      m.turn.style.transform = `rotate(${(m.x * 4).toFixed(2)}deg)`;
      m.layers.forEach(([g, [ax, ay]]) => { g.style.transform = `translate(${(m.x * ax).toFixed(2)}px, ${(m.y * ay).toFixed(2)}px)`; });
    });
    // Keep running while anything is on screen and either moving or waiting to glance.
    raf = all.some((m) => m.visible) && (moving || idle || focusEl) ? requestAnimationFrame(tick) : 0;
  }
  wake();
}
