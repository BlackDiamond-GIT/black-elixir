/* ============================================================
   SHARED.JSX — Nav, Footer, hooks, common components
   ============================================================ */
const { useState, useEffect, useRef, useCallback } = React;

/* ── Hooks ─────────────────────────────────────────────── */
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return y;
}

function useReveal(threshold = 0.05) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    // Immediately visible check
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 80) { setVis(true); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.unobserve(el); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

/* ── Nav ───────────────────────────────────────────────── */
function Nav({ lang, setLang, page, setPage }) {
  const { T } = window;
  const t = T[lang];
  const y = useScrollY();
  const [open, setOpen] = useState(false);

  const go = (p) => { setPage(p); setOpen(false); window.scrollTo(0, 0); };

  const items = [
    { k:'home',      l:t.nav.home },
    { k:'masseuses', l:t.nav.masseuses },
    { k:'schedule',  l:t.nav.schedule },
    { k:'prices',    l:t.nav.prices },
    { k:'blog',      l:'Blog' },
    { k:'contacts',  l:t.nav.contacts },
  ];

  return (
    <>
      <nav className={`nav${y > 50 ? ' scrolled' : ''}`}>
        <button className="nav__logo" onClick={() => go('home')}>
          Black <span>Elixir</span>
        </button>

        <ul className="nav__links">
          {items.map(i => (
            <li key={i.k}>
              <button className={`nav__link${page === i.k ? ' active' : ''}`} onClick={() => go(i.k)}>
                {i.l}
              </button>
            </li>
          ))}
        </ul>

        <div className="nav__right">
          <div className="lang-switcher">
            {['cs','en','ru'].map(l => (
              <button key={l} className={`lang-btn${lang === l ? ' active' : ''}`} onClick={() => setLang(l)}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button className="btn btn--primary btn--sm nav-res-btn" onClick={() => go('reservation')}>
            {t.nav.reservation}
          </button>
          <button className="nav__hamburger" onClick={() => setOpen(v => !v)} aria-label="Menu">
            <span style={{ transform: open ? 'rotate(45deg) translate(4.5px, 4.5px)' : '' }}></span>
            <span style={{ opacity: open ? 0 : 1 }}></span>
            <span style={{ transform: open ? 'rotate(-45deg) translate(4.5px, -4.5px)' : '' }}></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${open ? ' open' : ''}`}>
        {items.map(i => (
          <button key={i.k} className={`mob-link${page === i.k ? ' active' : ''}`} onClick={() => go(i.k)}>
            {i.l}
          </button>
        ))}
        <button className="btn btn--primary" style={{ marginTop: '32px' }} onClick={() => go('reservation')}>
          {t.nav.reservation}
        </button>
        <div className="lang-switcher" style={{ marginTop: '24px' }}>
          {['cs','en','ru'].map(l => (
            <button key={l} className={`lang-btn${lang === l ? ' active' : ''}`} onClick={() => { setLang(l); }}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

/* ── Footer ────────────────────────────────────────────── */
function Footer({ lang, setPage }) {
  const { T, SERVICES } = window;
  const t = T[lang];
  const go = (p) => { setPage(p); window.scrollTo(0, 0); };

  const pages = [
    { k:'home',      l:t.nav.home },
    { k:'masseuses', l:t.nav.masseuses },
    { k:'schedule',  l:t.nav.schedule },
    { k:'prices',    l:t.nav.prices },
    { k:'contacts',  l:t.nav.contacts },
  ];

  return (
    <footer className="footer">
      <div className="footer__grid">
        <div>
          <div className="footer__brand">BLACK <span>ELIXIR</span></div>
          <p className="footer__tagline">{t.footer.tagline}</p>
          <div className="footer__socials">
            {[
              { id:'ig', label:'Instagram', path:'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
              { id:'fb', label:'Facebook',  path:'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
              { id:'tk', label:'TikTok',    path:'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' },
            ].map(s => (
              <div key={s.id} className="footer__social" title={s.label}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d={s.path}/>
                </svg>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="footer__heading">{t.footer.pages}</h4>
          <ul className="footer__links">
            {pages.map(p => (
              <li key={p.k}><button className="footer__link" onClick={() => go(p.k)}>{p.l}</button></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="footer__heading">{t.footer.massages}</h4>
          <ul className="footer__links">
            {SERVICES.map(s => (
              <li key={s.id}><button className="footer__link" onClick={() => go('prices')}>{s.name[lang]}</button></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="footer__heading">{t.footer.contact}</h4>
          <ul className="footer__links">
            <li><span className="footer__link" style={{cursor:'default'}}>Václavské nám. 12, Praha 1</span></li>
            <li><span className="footer__link" style={{cursor:'default'}}>+420 777 123 456</span></li>
            <li><span className="footer__link" style={{cursor:'default'}}>info@blackelixir.cz</span></li>
            <li><span className="footer__link" style={{cursor:'default', fontSize:'0.75rem'}}>Po–Pá 10–21 · So–Ne 10–19</span></li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <p className="footer__copy">© 2026 Black Elixir Spa. {t.footer.rights}</p>
        <div style={{ display:'flex', gap:'24px' }}>
          <button className="footer__link">{t.footer.terms}</button>
          <button className="footer__link">{t.footer.privacy}</button>
        </div>
      </div>
    </footer>
  );
}

/* ── Section header ────────────────────────────────────── */
function SectionHeader({ eyebrow, title, desc, center }) {
  const [ref, vis] = useReveal();
  const align = center ? { textAlign:'center' } : {};
  return (
    <div ref={ref} className={`reveal${vis ? ' vis' : ''}`} style={align}>
      {eyebrow && <p className="s-eyebrow" style={center ? { justifyContent:'center' } : {}}>{eyebrow}</p>}
      <h2 className="s-title">{title}</h2>
      {desc && <p className="s-desc" style={center ? { margin:'0 auto var(--sp-8)' } : {}}>{desc}</p>}
    </div>
  );
}

/* ── Page header (inner pages) ─────────────────────────── */
function PageHeader({ title, children, breadcrumbs }) {
  return (
    <header className="page-header" data-title={title}>
      <div className="container">
        {breadcrumbs && <nav className="breadcrumbs">{breadcrumbs}</nav>}
        <h1>{title}</h1>
        {children && <p style={{ color:'var(--text-muted)', marginTop:'12px', fontSize:'1.05rem', maxWidth:'60ch' }}>{children}</p>}
      </div>
    </header>
  );
}

/* ── CTA Banner ────────────────────────────────────────── */
function CTABanner({ lang, setPage }) {
  const { T } = window;
  const s = T[lang].sec.cta;
  const [ref, vis] = useReveal();
  return (
    <section className="cta-section">
      <div className="container--xs" ref={ref} style={{ position:'relative', zIndex:1 }}>
        <p className="s-eyebrow" style={{ justifyContent:'center', marginBottom:'var(--sp-3)' }}>Black Elixir</p>
        <h2 className={`s-title reveal${vis ? ' vis' : ''}`} style={{ marginBottom:'16px' }}>{s.ti}</h2>
        <p className={`s-desc reveal d1${vis ? ' vis' : ''}`} style={{ margin:'0 auto var(--sp-6)', textAlign:'center' }}>{s.ds}</p>
        <div className={`reveal d2${vis ? ' vis' : ''}`} style={{ display:'flex', justifyContent:'center' }}>
          <button className="btn btn--primary" onClick={() => { setPage('reservation'); window.scrollTo(0,0); }}>
            {s.btn}
          </button>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Footer, SectionHeader, PageHeader, CTABanner, useScrollY, useReveal });
