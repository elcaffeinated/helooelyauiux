import { useEffect, useState } from 'react';

/* Continuous reveal: .in is ADDED when an element enters the viewport and REMOVED when it leaves,
   so the animation replays scrolling down AND up. MutationObserver catches elements React adds later. */
export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      es => es.forEach(e => e.target.classList.toggle('in', e.isIntersecting)),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    const scan = () => document.querySelectorAll('[data-r]').forEach(el => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
}

/* One rAF-throttled scroll loop: nav shrink, parallax, active nav link. Returns the active section id. */
export function useScroll(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    let tick = false;
    const run = () => {
      if (tick) return; tick = true;
      requestAnimationFrame(() => {
        document.getElementById('nav')?.classList.toggle('sm', scrollY > 40);
        document.querySelectorAll('[data-par]').forEach(el => {
          const r = el.getBoundingClientRect();
          let o = (r.top + r.height / 2 - innerHeight / 2) * parseFloat(el.dataset.par);
          if (el.dataset.clamp) { const l = el.parentElement.offsetHeight * parseFloat(el.dataset.clamp); o = Math.max(-l, Math.min(l, o)); }
          el.style.transform = `translateY(${o.toFixed(1)}px)`;
        });
        let cur = ids[0];
        ids.forEach(id => { const s = document.getElementById(id); if (s && s.getBoundingClientRect().top < innerHeight * 0.4) cur = id; });
        if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) cur = ids[ids.length - 1];
        setActive(cur);
        document.getElementById('ctaFloat')?.classList.toggle('show', scrollY > 500);
        tick = false;
      });
    };
    addEventListener('scroll', run, { passive: true });
    addEventListener('resize', run);
    run();
    return () => { removeEventListener('scroll', run); removeEventListener('resize', run); };
  }, []);
  return active;
}
