/* ============================================================
   HOME-PAGE.JSX  v2
   ============================================================ */
const { useState: useStateH, useEffect: useEffectH, useRef: useRefH } = React;

/* ── Universal captions (cycling, no massage name) ─────── */
const UNIV_CAP = {
  cs:['Ticho, které cítíte.','Teplo a hluboká péče.','Okamžik klidu jen pro vás.','Harmonie těla i mysli.','Sdílený zážitek pokoje.'],
  en:['Silence you can feel.','Warmth and deep care.','A quiet moment for you.','Harmony of body and mind.','A shared stillness.'],
  ru:['Тишина, которую ощущаешь.','Тепло и глубокая забота.','Тихий момент для вас.','Гармония тела и разума.','Совместный покой.'],
};

/* ── Hero ──────────────────────────────────────────────── */
function Hero({ lang, setPage }) {
  const { T, useReveal } = window;
  const h = T[lang].hero;
  const imgRef = useRefH(null);
  const [ref, vis] = useReveal(0);

  useEffectH(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;
    const onScroll = () => {
      if (imgRef.current) imgRef.current.style.transform = `translateY(${window.scrollY * 0.16}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (p) => { setPage(p); window.scrollTo(0, 0); };

  return (
    <section className="hero">
      <div className="hero__left" ref={ref}>
        <p className="hero__eyebrow">{h.eyebrow}</p>
        <h1 className="hero__title" style={{ paddingBottom:'0.1em' }}>
          {h.line1}<br /><em>{h.line2}</em>
        </h1>
        <p className="hero__subtitle" style={{ marginTop:'var(--sp-3)' }}>{h.sub}</p>
        <div className="hero__actions">
          <button className="btn btn--primary" onClick={() => go('reservation')}>{h.cta}</button>
          <button className="btn btn--ghost"   onClick={() => go('masseuses')}>{h.cta2}</button>
        </div>
        <div className="hero__stats">
          {[['12+', h.y], ['3 500+', h.c], ['4', h.m]].map(([n, l]) => (
            <div key={l}>
              <div className="hero__stat-num">{n}</div>
              <div className="hero__stat-label">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero__right">
        <img
          ref={imgRef}
          className="hero__img"
          src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=900&h=1200&q=85"
          alt="Black Elixir Spa — luxusní masáže Praha"
          width="900" height="1200" fetchpriority="high" loading="eager"
        />
        <div className="hero__float">
          <div className="hero__float-label">{h.next}</div>
          <div className="hero__float-time">{h.today}</div>
          <div className="hero__float-meta">{h.nextMeta}</div>
        </div>
      </div>
    </section>
  );
}

/* ── Service square card ───────────────────────────────── */
function SvcSquare({ svc, lang, idx, setPage }) {
  const { useReveal } = window;
  const [ref, vis] = useReveal();
  return (
    <div
      ref={ref}
      className={`svc-square reveal d${(idx % 4) + 1}${vis ? ' vis' : ''}`}
      onClick={() => { setPage('reservation'); window.scrollTo(0, 0); }}
      title={svc.name[lang]}
    >
      <img src={svc.img} alt={svc.alt} loading="lazy" />
      <span className="svc-square__hint">
        {lang === 'cs' ? 'Zobrazit' : lang === 'en' ? 'View' : 'Смотреть'}
      </span>
      <div className="svc-square__overlay">
        <p className="svc-square__caption">{UNIV_CAP[lang][idx % 5]}</p>
        <div className="svc-square__meta">
          <span className="svc-square__dur">{svc.duration} min</span>
          <span className="svc-square__price">{svc.price.toLocaleString()} Kč</span>
        </div>
      </div>
    </div>
  );
}

/* ── Services section ──────────────────────────────────── */
function ServicesSection({ lang, setPage }) {
  const { T, SERVICES, SectionHeader } = window;
  const s = T[lang].sec.svc;
  return (
    <section className="section section--alt">
      <div className="container">
        <SectionHeader eyebrow={s.ey} title={s.ti} desc={s.ds} />
        <div className="svc-grid">
          {SERVICES.slice(0, 4).map((svc, i) => (
            <SvcSquare key={svc.id} svc={svc} lang={lang} idx={i} setPage={setPage} />
          ))}
        </div>
        <div style={{ textAlign:'center', marginTop:'var(--sp-6)' }}>
          <button className="btn btn--ghost" onClick={() => { setPage('prices'); window.scrollTo(0, 0); }}>
            {T[lang].sec.svc_all}
          </button>
        </div>
      </div>
    </section>
  );
}

/* ── Masseuse preview card ─────────────────────────────── */
function MassPreviewCard({ mas, lang, delay, setPage }) {
  const { useReveal } = window;
  const [ref, vis] = useReveal();
  return (
    <div
      ref={ref}
      className={`card card--m reveal d${delay + 1}${vis ? ' vis' : ''}`}
      onClick={() => { setPage('masseuses'); window.scrollTo(0, 0); }}
    >
      <div className="mass-photo-wrap">
        <img src={mas.img} alt={mas.alt} loading="lazy" />
        <div className="mass-photo-hint">
          <span className="mass-photo-hint-text">
            {lang === 'cs' ? 'Zobrazit' : lang === 'en' ? 'View' : 'Смотреть'}
          </span>
        </div>
      </div>
      <div className="card__body">
        <div className="card--m card__name">{mas.name} {mas.surname}</div>

      </div>
    </div>
  );
}

/* ── Masseuses preview ─────────────────────────────────── */
function MasseusesPreview({ lang, setPage }) {
  const { T, MASSEUSES, SectionHeader } = window;
  const s = T[lang].sec.mas;
  return (
    <section className="section">
      <div className="container">
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:'24px', flexWrap:'wrap', marginBottom:'var(--sp-8)' }}>
          <SectionHeader eyebrow={s.ey} title={s.ti} desc="" />
          <button className="btn btn--ghost btn--sm" style={{ flexShrink:0 }} onClick={() => { setPage('masseuses'); window.scrollTo(0, 0); }}>
            {T[lang].sec.mas_all}
          </button>
        </div>
        <div className="grid-4">
          {MASSEUSES.map((m, i) => (
            <MassPreviewCard key={m.id} mas={m} lang={lang} delay={i} setPage={setPage} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Process section ──────────────────────────────────── */
function ProcessSection({ lang }) {
  const { T, SectionHeader } = window;
  const s = T[lang].sec.proc;
  const steps = T[lang].proc;
  const [ref, vis] = window.useReveal();
  return (
    <section className="section section--surf">
      <div className="container">
        <SectionHeader eyebrow={s.ey} title={s.ti} />
        <div ref={ref} className={`proc-scroll-wrap reveal${vis ? ' vis' : ''}`}>
          <div className="proc-editorial">
            {steps.map((step, i) => (
              <div key={i} className="proc-ed-item">
                <h3 className="proc-ed-title">{step.ti}</h3>
                <p className="proc-ed-text">{step.tx}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Price preview squares ─────────────────────────────── */
function PricesPreview({ lang, setPage }) {
  const { T, SERVICES, SectionHeader } = window;
  const s = T[lang].sec.pr;
  const [ref, vis] = window.useReveal();

  // Prices section eyebrow/title
  const secTitle = {
    cs: 'Vyberte si masáž',
    en: 'Choose your massage',
    ru: 'Выберите массаж',
  };

  return (
    <section className="section section--alt">
      <div className="container">
        <SectionHeader eyebrow={s.ey} title={secTitle[lang]} />
        <div ref={ref} className={`svc-grid reveal${vis ? ' vis' : ''}`}>
          {SERVICES.slice(0, 4).map((svc, i) => (
            <SvcSquare key={svc.id} svc={svc} lang={lang} idx={i} setPage={setPage} />
          ))}
        </div>
        <div style={{ textAlign:'center', marginTop:'var(--sp-4)' }}>
          <button className="btn btn--ghost" onClick={() => { setPage('prices'); window.scrollTo(0, 0); }}>
            {T[lang].sec.svc_all}
          </button>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ───────────────────────────────────────────────── */
function FAQItem({ item, open, toggle, idx }) {
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button className="faq-q" onClick={() => toggle(idx)}>
        <span>{item.q}</span>
        <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div className="faq-a"><div className="faq-a-inner">{item.a}</div></div>
    </div>
  );
}

function FAQSection({ lang }) {
  const { T, SectionHeader } = window;
  const s = T[lang].sec.faq;
  const faqs = T[lang].faq;
  const [open, setOpen] = useStateH(null);
  return (
    <section className="section">
      <div className="container">
        <div style={{ maxWidth:'720px' }}>
          <SectionHeader eyebrow={s.ey} title={s.ti} />
          <div className="faq-list">
            {faqs.map((f, i) => (
              <FAQItem key={i} item={f} idx={i} open={open === i} toggle={i => setOpen(v => v === i ? null : i)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── HomePage ──────────────────────────────────────────── */
function HomePage({ lang, setPage }) {
  const { CTABanner } = window;
  return (
    <main className="page-enter">
      <Hero lang={lang} setPage={setPage} />
      <ServicesSection lang={lang} setPage={setPage} />
      <MasseusesPreview lang={lang} setPage={setPage} />
      <ProcessSection lang={lang} />
      <PricesPreview lang={lang} setPage={setPage} />
      <FAQSection lang={lang} />
      <CTABanner lang={lang} setPage={setPage} />
    </main>
  );
}

Object.assign(window, { HomePage, SvcSquare, MassPreviewCard, UNIV_CAP });
