import { useState, useRef, useEffect } from 'react';
import { useReveal, useScroll } from './hooks.js';
import { PROJECTS, DECK, SERVICES } from './data/projects.js';
import { SITE } from './data/site.js';

const Arrow = () => <svg aria-hidden="true"><use href="#arr" /></svg>;
const Label = ({ dot, children, ...r }) => <p className={`label dot-${dot}`} {...r}><i />{children}</p>;
const NAV = [['home','HOME'],['about','ABOUT'],['services','SERVICES','opt'],['projects','PROJECTS'],['space','SPACE','opt'],['contact','CONTACT']];

/* ---------- Contact form ----------
   Works with a form service (set VITE_FORM_ENDPOINT, e.g. a Formspree URL) so it also works on static hosting.
   Without it, it falls back to the bundled Node API at /api/contact. */
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || '/api/contact';
function ContactForm() {
  const [st, setSt] = useState({ kind: '', msg: '' }), [busy, setBusy] = useState(false);
  const submit = async e => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data.website) { form.reset(); setSt({ kind: 'ok', msg: 'Thanks! Your message was sent. I’ll get back to you soon.' }); return; } // honeypot: bots fill this
    setBusy(true); setSt({ kind: '', msg: '' });
    try {
      const res = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data) });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || j.errors?.[0]?.message || 'Something went wrong.');
      form.reset(); setSt({ kind: 'ok', msg: 'Thanks! Your message was sent. I’ll get back to you soon.' });
    } catch (err) { setSt({ kind: 'err', msg: `${err.message} Please try again or email me at ${SITE.email}.` }); }
    setBusy(false);
  };
  return (
    <form className="form" onSubmit={submit} data-r="left">
      <div className="g2">
        <label>First Name<input name="first_name" placeholder="Juan" required autoComplete="given-name" /></label>
        <label>Last Name<input name="last_name" placeholder="Dela Cruz" required autoComplete="family-name" /></label>
        <label>Email<input type="email" name="email" placeholder="DcruzJuan@gmail.com" required autoComplete="email" /></label>
        <label>Contact Number<input type="tel" name="phone" placeholder="09123456789" autoComplete="tel" /></label>
      </div>
      <label>Message<textarea name="message" rows="5" placeholder="Tell me about your idea…" required /></label>
      <input type="text" name="website" tabIndex="-1" autoComplete="off" style={{ display: 'none' }} />
      <button className="send" disabled={busy}>{busy ? 'Sending…' : 'Send message'}</button>
      <p className={`status ${st.kind}`} role="status" aria-live="polite">{st.msg}</p>
    </form>
  );
}

/* ---------- Project case-study modal ---------- */
function Modal({ p, onClose }) {
  const panel = useRef(null);
  useEffect(() => {
    if (!p) return;
    const opener = document.activeElement;
    document.documentElement.style.overflow = 'hidden';          // lock background scroll
    panel.current?.focus();
    const onKey = e => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab' || !panel.current) return;              // focus trap
      const f = [...panel.current.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')];
      if (!f.length) { e.preventDefault(); return; }
      const first = f[0], last = f[f.length - 1], cur = document.activeElement;
      if (e.shiftKey && (cur === first || cur === panel.current)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && cur === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); document.documentElement.style.overflow = ''; opener?.focus?.(); };
  }, [p]);
  if (!p) return null;
  const ph = <span className="ph-note">Add screenshot</span>;
  return (
    <div className="modal">
      <div className="modal-bg" onClick={onClose} />
      <div className={`modal-panel modal-${p.color}`} role="dialog" aria-modal="true" aria-labelledby="mt" tabIndex="-1" ref={panel}>
        <button className="modal-x" onClick={onClose} aria-label="Close case study">×</button>
        <div className="cs-img">{p.image ? <img src={p.image} alt="" /> : ph}</div>
        <div className="cs-head"><p className="cs-cat">{p.category}</p><h2 id="mt">{p.title}</h2>
          <div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div></div>
        <div className="cs-body"><div className="modal-grid">
          <section className="cs-sec wide"><h3>Overview</h3><p>{p.overview}</p></section>
          <section className="cs-sec"><h3>My Role</h3><p>{p.role}</p></section>
          <section className="cs-sec"><h3>Tools</h3><ul className="tl">{p.tools.map(t => <li key={t}>{t}</li>)}</ul></section>
          <section className="cs-sec wide"><h3>Process</h3><ol>{p.process.map(s => <li key={s}>{s}</li>)}</ol></section>
          <section className="cs-sec wide"><h3>Result</h3><p>{p.result}</p></section>
        </div>
        <div className="cs-links"><a className="btn light" href={p.live} target="_blank" rel="noopener">Live site <Arrow /></a>
          <a className="btn dark" href={p.github} target="_blank" rel="noopener">GitHub</a></div></div>
      </div>
    </div>
  );
}

/* ---------- Click-the-cards deck ---------- */
function Deck({ order, setOrder }) {
  const [out, setOut] = useState(''), n = useRef(0);
  const next = () => {
    if (out) return;
    setOut(n.current++ % 2 ? 'out-r' : 'out-l');
    setTimeout(() => { setOrder(o => [...o.slice(1), o[0]]); setOut(''); }, 520);
  };
  return (
    <div className="deck" tabIndex="0" role="button" onClick={next}
      onKeyDown={e => ['Enter', ' ', 'ArrowRight'].includes(e.key) && (e.preventDefault(), next())}
      aria-label={`Card deck: ${DECK[order[0]].t}. Press Enter for the next card.`}>
      {DECK.map((c, i) => { const p = order.indexOf(i);
        return <div key={c.t} className={`dc pos${p}${p === 0 ? ` top ${out}` : ''}`} aria-hidden={p !== 0}>
          <img src={c.img} alt={c.t} loading="lazy" /><span>{c.t}</span></div>; })}
    </div>
  );
}

export default function App() {
  useReveal();
  const active = useScroll(NAV.map(n => n[0]));
  const [filter, setFilter] = useState('all'), [open, setOpen] = useState(null), [order, setOrder] = useState([0, 1, 2, 3]);
  const shown = PROJECTS.filter(p => filter === 'all' || p.type === filter);
  const [glow, setGlow] = useState(() => { try { return localStorage.getItem('glow') !== 'off'; } catch { return true; } });
  useEffect(() => {
    document.documentElement.classList.toggle('nolight', !glow);
    document.documentElement.classList.add('js');
    try { localStorage.setItem('glow', glow ? 'on' : 'off'); } catch {}
  }, [glow]);
  const toggleGlow = () => setGlow(g => !g);
  const pick = f => setFilter(f);

  return (<>
    <a className="skip" href="#main">Skip to content</a>
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true"><symbol id="arr" viewBox="0 0 38 28"><path d="M0 14h35M23 2l12 12-12 12" fill="none" stroke="currentColor" strokeWidth="2.5" /></symbol></svg>

    <header className="nav" id="nav">
      <a href="#home" className="nav-logo"><img src="/assets/logo-nav.png" alt="elya — back to top" width="121" height="97" /></a>
      <nav aria-label="Primary">
        {NAV.map(([id, t, c]) => <a key={id} href={`#${id}`} className={`${c || ''} ${active === id ? 'on' : ''}${id === 'home' ? ' opt-sm' : ''}`} aria-current={active === id ? 'true' : undefined}>{t}</a>)}
      </nav>
      <button className="nav-btn" type="button" aria-pressed={glow} onClick={toggleGlow} aria-label={`Glow: ${glow ? 'on' : 'off'}. Toggle the neon glow`}>
        <img src="/assets/sun.png" alt="" width="27" height="26" /><span id="lightsLabel">Glow: {glow ? 'on' : 'off'}</span></button>
    </header>

    <main id="main">
      {/* HERO — matches the reference: tag, stacked headline, pink italic "Personality." */}
      <section className="hero" id="home">
        <div className="blob-wrap" data-par="0.12"><img className="blob" src="/assets/blob.webp" alt="" width="729" height="850" fetchpriority="high" /></div>
        <Label dot="purple" data-r>STILL BECOMING</Label>
        <h1 data-r><span>I’m Designing</span><span>Interfaces</span><span>with</span><em>Personality.</em></h1>
        <p className="lead" data-r>Hey, I’m elya — a junior web developer with a UI/UX design edge. I love turning ideas into thoughtful, playful digital experiences!</p>
        <div className="hero-row" data-r>
          <div className="btns"><a href="#projects" className="btn light">Explore my work <Arrow /></a><a href="#contact" className="btn dark">Let’s Talk</a>{SITE.resume && <a href={SITE.resume} className="btn dark" download>Resume</a>}</div>
          <div className="socials">
            {[['figma', 'Figma', 20, 30], ['code', 'Code', 33, 25], ['github', 'GitHub', 30, 30], ['linkedin', 'LinkedIn', 30, 30]]
              .filter(([f]) => SITE.socials[f]).map(([f, al, w, h]) =>
              <a key={f} href={SITE.socials[f]} target="_blank" rel="noopener noreferrer" aria-label={al}><img src={`/assets/${f}.png`} alt="" width={w} height={h} /></a>)}
          </div>
        </div>
      </section>

      <section className="banner" data-r="scale">
        <div className="banner-bg" data-par="-0.05" data-clamp="0.07" />
        <p className="mono dot-pink"><i />SCROLL TO DISCOVER PROJECTS</p>
        <h2>Making the web feel <em>Less ordinary.</em></h2>
      </section>

      <section className="sec about" id="about">
        <div className="about-photo" data-r="left">
          <div className="photo-ph">
            <img src="/assets/photo.jpg" alt={`Portrait of ${SITE.fullName || SITE.name}`} />
          </div>
        </div>
        <div className="about-text" data-r="right">
          <Label dot="pink">ABOUT ME</Label><h2 className="big">A little about me.</h2>
          <p className="lead">I’m a 3rd-year BSIT student specializing in Web Development, with a growing interest in UI/UX design and app design. I enjoy exploring creative ideas, designing user interfaces, and finding ways to make digital experiences both visually appealing and easy to use. Outside of tech, I also enjoy photography, which allows me to express my creativity through a different lens.</p>
          <p className="status-badge"><i aria-hidden="true" />Currently open to: <b>internships / freelance</b></p>
          {(SITE.location || SITE.graduation) && <p className="about-meta">{[SITE.location, SITE.graduation].filter(Boolean).join(' · ')}</p>}
        </div>
      </section>

      <section className="sec" id="services">
        <Label dot="teal" data-r>WHAT I DO</Label><h2 className="big title-glow" data-r>Ideas, shaped into useful things.</h2>
        <div className="cards4">
          {SERVICES.map((s, i) => (
            <a key={s.n} href="#projects" className={`svc svc-${s.color} d${i}`} data-r onClick={() => pick(s.f)}>
              <span className="ic"><img src={`/assets/${s.ic}.png`} alt="" /></span><b>{s.n}</b><h3>{s.t}</h3><p>{s.p}</p>
              <span className="go" aria-hidden="true"><svg viewBox="0 0 29 21"><path d="M2 10.5h24M18 3l8 7.5-8 7.5" /></svg></span></a>))}
        </div>
      </section>

      <section className="sec" id="projects">
        <Label dot="amber" data-r>SELECTED WORK</Label><h2 className="big title-glow" data-r>Projects with purpose.</h2>
        <div className="filters" role="group" aria-label="Filter projects" data-r>
          {[['all', 'All'], ['ui-ux', 'UI-UX'], ['web', 'Web'], ['photo', 'Photo']].map(([f, t]) =>
            <button key={f} type="button" className="chip-f" aria-pressed={filter === f} onClick={() => pick(f)}>{t}</button>)}
        </div>
        <div className="bento" data-count={shown.length}>
          {shown.map((p, i) => (
            <article key={p.id} className={`proj proj-${p.color} d${i}`} data-slot={i + 1} data-r>
              <div className="proj-img"><span className="ph-note">Add screenshot</span></div>
              <div className="proj-body">
                <h3><button type="button" className="proj-btn" aria-haspopup="dialog" onClick={() => setOpen(p)}>{p.title}</button></h3>
                <p className="cat">{p.category}</p><div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div><Arrow />
              </div></article>))}
          {!shown.length && <p className="bento-empty">No projects in this category yet.</p>}
        </div>
      </section>

      <section className="sec tool" id="toolkit">
        <div className="cert" data-r="left">
          <div className="blk"><h3 className="blk-h">Education</h3>
            <ul className="edu">
              <li><span className="tag">DEGREE</span><h4>BSIT Web Development</h4><p>Holy Angel University · Angeles City</p></li>
              <li><span className="tag">UI/UX Design</span><h4>App interfaces and Wireframing</h4><p>Exploring app layouts, screen organization, and user-friendly interface design.</p></li>
              <li><span className="tag">INTEREST</span><h4>Photography</h4><p>Documenting moments and telling stories through the lens.</p></li>
            </ul></div>
          <hr />
          <div className="blk"><h3 className="blk-h">Skills</h3>
            {[['Design', ['FIGMA']], ['Frontend', ['HTML', 'CSS', 'JAVASCRIPT', 'REACT']], ['Backend & Tools', ['NODEJS', 'EXPRESS', 'MONGODB', 'PYTHON']]].map(([h, c]) =>
              <div className="skill-g" key={h}><h4>{h}</h4><div className="chips">{c.map(x => <span key={x}>{x}</span>)}</div></div>)}</div>
          <a href="#projects" className="btn amber">Explore my work <Arrow /></a>
        </div>
        <div className="tool-r" data-r="right"><Label dot="indigo">MY TOOLKIT</Label><h2 className="big">Designer Hands.</h2>
          <p className="lead">I care about the whole product — how it looks, how it works, and how it feels to use.</p></div>
      </section>

      <section className="sec off">
        <Label dot="amber" data-r>OFF THE CLOCK</Label><h2 className="big" data-r>Curious by Nature.</h2>
        <ul className="rows" data-r>
          {DECK.map((c, i) => <li key={c.t} tabIndex="0" className={order[0] === i ? 'on' : ''}
            onClick={() => { setOrder(o => [i, ...o.filter(x => x !== i)]); document.getElementById('space').scrollIntoView({ behavior: 'smooth', block: 'center' }); }}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), e.currentTarget.click())}><b>0{i + 1}</b><span>{c.t}</span></li>)}
        </ul>
      </section>

      <section className="space" id="space">
        <div className="space-t"><p className="mono pur" data-r>CLICK THE CARDS</p><h2 className="big" data-r>A little space for everything.</h2>
          <p className="lead" data-r>Click the folders to peek inside my practice, process and playful experiments.</p></div>
        <div className="deck-wrap" data-r="scale"><Deck order={order} setOrder={setOrder} />
          <p className="deck-meta"><span className="deck-count" aria-live="polite">{order[0] + 1} / {DECK.length}</span><span>Click the card for the next one</span></p></div>
      </section>

      <section className="sec contact" id="contact">
        <ContactForm />
        <div className="contact-r" data-r="right"><Label dot="teal">SAY HELLO :)</Label>
          <h2 className="big">Have something <em>interesting</em> in mind?</h2>
          <p className="lead">Tell me the rough idea. I’ll bring the curiosity, good questions, and probably a moodboard.</p>
          <a className="mail" href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
      </section>
    </main>

    <footer className="foot">
      <img className="flogo" src="/assets/logo-footer.png" alt="elya" width="176" height="151" loading="lazy" />
      <nav className="fnav" aria-label="Footer">{['home', 'about', 'services', 'projects', 'contact'].map(i => <a key={i} href={`#${i}`}>{i.toUpperCase()}</a>)}</nav>
      <p className="ft1">Junior web developer with a UI/UX design edge, based in the Philippines.</p>
      <p className="ft2">© {new Date().getFullYear()} {SITE.fullName || 'Elya creates'}. All rights reserved.</p>
    </footer>
    <a className="cta-float" id="ctaFloat" href="#contact">Let’s talk</a>
    <Modal p={open} onClose={() => setOpen(null)} />
  </>);
}
