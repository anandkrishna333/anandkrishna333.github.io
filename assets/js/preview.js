import { esc, reduceMotion, finePointer } from './common.js';

/*
  Hover preview shared by the home index and the Sidequests list.
  The hovered row turns ultramarine, a tilted preview trails the cursor,
  and the cursor becomes a blue dot with an "Open ..." label.
*/
export function hoverPreview({ list, rowSelector, frames, label, dim = true }) {
  const rows = [...list.querySelectorAll(rowSelector)];

  // Keyboard focus gets the same colour state, without the floating preview.
  rows.forEach((row) => {
    row.addEventListener('focusin', () => setActive(row));
    row.addEventListener('focusout', () => setActive(null));
  });

  function setActive(row) {
    rows.forEach((r) => r.classList.toggle('is-active', r === row));
    if (dim) list.classList.toggle('is-hovering', Boolean(row));
  }

  if (!finePointer) return; // touch: inline previews are shown in the markup instead

  list.classList.add('has-cursor');
  const pv = document.createElement('div');
  pv.className = `pv${reduceMotion ? ' pv--fixed' : ''}`;
  pv.setAttribute('aria-hidden', 'true');
  const cur = document.createElement('div');
  cur.className = 'cur';
  cur.setAttribute('aria-hidden', 'true');
  cur.innerHTML = '<span class="cur__dot"></span><span class="cur__label"></span>';
  document.body.append(pv, cur);

  let tx = 0, ty = 0, x = 0, y = 0, lastX = 0, rot = 0, raf = 0, timer = 0, i = 0, on = false;

  addEventListener('pointermove', (e) => {
    tx = e.clientX; ty = e.clientY;
    cur.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
  }, { passive: true });

  function loop() {
    const k = reduceMotion ? 1 : 0.12;
    x += (tx - x) * k; y += (ty - y) * k;
    const vx = x - lastX; lastX = x;
    rot += ((reduceMotion ? 0 : Math.max(-4, Math.min(4, vx * 0.5))) - rot) * 0.15;
    if (!reduceMotion) {
      const w = pv.offsetWidth, h = pv.offsetHeight;
      let px = x + 28;
      if (px + w > innerWidth - 16) px = x - w - 28; // flip to the left near the edge
      const py = Math.max(16, Math.min(innerHeight - h - 16, y - h / 2));
      pv.style.transform = `translate3d(${px}px, ${py}px, 0) rotate(${rot}deg)`;
    }
    raf = requestAnimationFrame(loop);
  }

  function show(row) {
    const fr = frames(row);
    // A frame is either a placeholder caption (string) or a real image ({ src, cap }).
    pv.innerHTML = fr.map((c, n) => `<div class="pv__f${n ? '' : ' on'}${c.src ? ' pv__f--img' : ''}">${
      c.src ? `<img src="${c.src}" alt="" decoding="async">` : `<span class="ph__cap">${esc(c)}</span>`}</div>`).join('');
    cur.querySelector('.cur__label').textContent = label(row);
    i = 0;
    clearInterval(timer);
    timer = setInterval(() => {
      const f = pv.children;
      if (!f.length) return;
      f[i].classList.remove('on');
      i = (i + 1) % f.length;
      f[i].classList.add('on');
    }, 600);
    if (!on) { x = tx; y = ty; lastX = x; on = true; cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); }
    pv.classList.add('is-on');
    cur.classList.add('is-on');
    setActive(row);
  }

  function hide() {
    on = false;
    clearInterval(timer);
    cancelAnimationFrame(raf);
    pv.classList.remove('is-on');
    cur.classList.remove('is-on');
    setActive(null);
  }

  rows.forEach((row) => {
    row.addEventListener('pointerenter', (e) => {
      tx = e.clientX; ty = e.clientY;
      cur.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      show(row);
    });
    row.addEventListener('pointerleave', hide);
  });
  addEventListener('scroll', () => { if (on && !rows.some((r) => r.matches(':hover'))) hide(); }, { passive: true });
}
