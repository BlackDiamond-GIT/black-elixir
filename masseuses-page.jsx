/* ============================================================
   MASSEUSES-PAGE.JSX  v2
   ============================================================ */
const { useState: useStateM, useEffect: useEffectM } = React;

/* ── Photo lightbox (global, shared) ──────────────────── */
function Lightbox({ src, alt, open, onClose }) {
  useEffectM(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose]);

  useEffectM(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!src) return null;
  return (
    <div className={`lightbox${open ? ' open' : ''}`} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <button className="lightbox__close" onClick={onClose} aria-label="Close">✕</button>
      <img src={src} alt={alt || ''} loading="lazy" />
    </div>
  );
}

/* ── Masseuse card ─────────────────────────────────────── */
function MassCard({ mas, lang, onOpen, onPhoto }) {
  const { useReveal, T } = window;
  const [ref, vis] = useReveal();

  return (
    <div ref={ref} className={`card card--m reveal${vis ? ' vis' : ''}`}>
      {/* Photo with hover hint — click opens lightbox */}
      <div
        className="mass-photo-wrap mass-ph-blur"
        onClick={() => onPhoto(mas.img, mas.alt)}
        title={lang === 'cs' ? 'Zobrazit foto' : lang === 'en' ? 'View photo' : 'Посмотреть фото'}
      >
        <img src={mas.img} alt={mas.alt} loading="lazy" />
        <div className="mass-photo-hint">
          <span className="mass-photo-hint-text">
            {lang === 'cs' ? 'Zobrazit foto' : lang === 'en' ? 'View photo' : 'Посмотреть фото'}
          </span>
        </div>
      </div>

      <div className="card__body">
        <div className="card--m card__name">{mas.name} {mas.surname}</div>
        <button
          className="btn btn--ghost btn--sm"
          style={{ marginTop:'var(--sp-3)', width:'100%', justifyContent:'center' }}
          onClick={() => onOpen(mas)}
        >
          {lang === 'cs' ? 'Rezervovat' : lang === 'en' ? 'Book' : 'Забронировать'}
        </button>
      </div>
    </div>
  );
}

/* ── Masseuse detail modal ─────────────────────────────── */
function MassModal({ mas, lang, open, onClose, setPage }) {
  const { T } = window;
  const t = T[lang].mas;

  useEffectM(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose]);

  useEffectM(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!mas) return null;

  return (
    <div
      className={`modal-overlay${open ? ' open' : ''}`}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal" role="dialog" aria-modal="true">
        <div className="modal__hdr">
          <div>
            <div className="modal__name">{mas.name} {mas.surname}</div>
            <div className="modal__spec">{mas.spec[lang]}</div>
          </div>
          <button className="modal__close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="modal__body">
          <img className="modal__img" src={mas.img} alt={mas.alt} loading="lazy" />
          <p className="modal__bio">{mas.bio[lang]}</p>
          <button
            className="btn btn--primary"
            style={{ width:'100%', justifyContent:'center' }}
            onClick={() => { onClose(); setPage('reservation'); window.scrollTo(0, 0); }}
          >
            {lang === 'cs' ? 'Rezervovat' : lang === 'en' ? 'Book' : 'Забронировать'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── MasseusesPage ─────────────────────────────────────── */
function MasseusesPage({ lang, setPage }) {
  const { T, MASSEUSES, PageHeader, CTABanner } = window;
  const t = T[lang];
  const [selected, setSelected]   = useStateM(null);
  const [modalOpen, setModalOpen] = useStateM(false);
  const [lbSrc,  setLbSrc]        = useStateM(null);
  const [lbAlt,  setLbAlt]        = useStateM('');
  const [lbOpen, setLbOpen]       = useStateM(false);

  const openModal = (mas) => { setSelected(mas); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setTimeout(() => setSelected(null), 300); };

  const openPhoto = (src, alt) => { setLbSrc(src); setLbAlt(alt); setLbOpen(true); };
  const closePhoto = () => { setLbOpen(false); setTimeout(() => setLbSrc(null), 300); };

  const breadcrumbs = (
    <>
      <button onClick={() => { setPage('home'); window.scrollTo(0, 0); }}>{t.nav.home}</button>
      <span className="breadcrumbs__sep">›</span>
      <span style={{ color:'var(--text)' }}>{t.nav.masseuses}</span>
    </>
  );

  return (
    <main className="page-enter">
      <PageHeader title={t.mas.ti} breadcrumbs={breadcrumbs}>
        {t.mas.ds}
      </PageHeader>

      <section className="section">
        <div className="container">
          <div className="grid-4">
            {MASSEUSES.map(m => (
              <MassCard
                key={m.id} mas={m} lang={lang}
                onOpen={openModal}
                onPhoto={openPhoto}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container--sm" style={{ textAlign:'center' }}>
          <p className="s-eyebrow" style={{ justifyContent:'center' }}>
            {lang === 'cs' ? 'Náš přístup' : lang === 'en' ? 'Our Approach' : 'Наш подход'}
          </p>
          <h2 className="s-title">
            {lang === 'cs' ? 'Každá masáž je jedinečná' :
             lang === 'en' ? 'Every massage is unique' :
             'Каждый массаж уникален'}
          </h2>
          <div className="gold-divider center"></div>
          <p style={{ color:'var(--text-muted)', fontSize:'1.0625rem', lineHeight:'1.78', maxWidth:'54ch', margin:'0 auto' }}>
            {lang === 'cs'
              ? 'Naše masérky absolvují pravidelná školení a udržují nejvyšší standardy péče. Každý klient dostává individuální přístup — od volby oleje po intenzitu a techniku masáže.'
              : lang === 'en'
              ? 'Our masseuses undergo regular training and maintain the highest standards of care. Every client receives an individual approach — from oil selection to pressure and technique.'
              : 'Наши массажистки регулярно проходят обучение и поддерживают высочайшие стандарты ухода. Каждый клиент получает индивидуальный подход.'}
          </p>
        </div>
      </section>

      <CTABanner lang={lang} setPage={setPage} />

      <MassModal mas={selected} lang={lang} open={modalOpen} onClose={closeModal} setPage={setPage} />
      <Lightbox src={lbSrc} alt={lbAlt} open={lbOpen} onClose={closePhoto} />
    </main>
  );
}

Object.assign(window, { MasseusesPage, Lightbox });
