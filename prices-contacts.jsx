/* ============================================================
   PRICES-CONTACTS.JSX  v2
   ============================================================ */
const { useState: useStatePr } = React;

/* ── Price square ──────────────────────────────────────── */
function PriceSquare({ svc, lang, idx, setPage }) {
  const { UNIV_CAP } = window;
  const cap = UNIV_CAP[lang];
  const caption = cap[idx % cap.length];

  return (
    <div
      className="price-square"
      onClick={() => { setPage('reservation'); window.scrollTo(0, 0); }}
      title={svc.name[lang]}
    >
      {/* Blurred image */}
      <img src={svc.img} alt={svc.alt} loading="lazy" />
      {/* Hint */}
      <span className="price-square__hint">
        {lang === 'cs' ? 'Rezervovat' : lang === 'en' ? 'Book' : 'Забронировать'}
      </span>
      {/* Overlay */}
      <div className="price-square__overlay">
        <p className="price-square__caption">{caption}</p>
        <div className="price-square__meta">
          <span className="price-square__dur">{svc.duration} min</span>
          <span className="price-square__price">{svc.price.toLocaleString()} Kč</span>
        </div>
      </div>
    </div>
  );
}

/* ── Prices Page ───────────────────────────────────────── */
function PricesPage({ lang, setPage }) {
  const { T, SERVICES, PageHeader, CTABanner, useReveal } = window;
  const t = T[lang].prices;
  const [gridRef, gridVis] = useReveal();
  const [incRef, incVis] = useReveal();

  const secAlt = {
    cs: 'Každý zážitek zahrnuje prémiové oleje, vyhřívané prostěradlo, bylinný čaj a přístup do relaxační zóny.',
    en: 'Every experience includes premium oils, heated linen, herbal tea and access to the relaxation lounge.',
    ru: 'Каждый сеанс включает премиальные масла, подогретое бельё, травяной чай и зону релаксации.',
  };

  const breadcrumbs = (
    <>
      <button onClick={() => { setPage('home'); window.scrollTo(0,0); }}>{T[lang].nav.home}</button>
      <span className="breadcrumbs__sep">›</span>
      <span style={{ color:'var(--text)' }}>{T[lang].nav.prices}</span>
    </>
  );

  return (
    <main className="page-enter">
      <PageHeader title={t.ti} breadcrumbs={breadcrumbs}>{t.ds}</PageHeader>

      <section className="section">
        <div className="container">
          <p className="s-eyebrow">{T[lang].sec.pr.ey}</p>
          <h2 className="s-title" style={{ marginBottom:'var(--sp-8)' }}>
            {lang === 'cs' ? 'Vyberte svůj zážitek' : lang === 'en' ? 'Choose your experience' : 'Выберите ваш опыт'}
          </h2>

          {/* Square grid */}
          <div ref={gridRef} className={`price-grid reveal${gridVis ? ' vis' : ''}`}>
            {SERVICES.map((svc, i) => (
              <PriceSquare key={svc.id} svc={svc} lang={lang} idx={i} setPage={setPage} />
            ))}
          </div>

          {/* What's included */}
          <div
            ref={incRef}
            className={`reveal${incVis ? ' vis' : ''}`}
            style={{ display:'grid', gridTemplateColumns:'1fr', gap:'var(--sp-4)' }}
            id="inc-grid"
          >
            <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--r-lg)', padding:'var(--sp-6)' }}>
              <p className="s-eyebrow">{t.inc_ti}</p>
              <h3 style={{ fontFamily:'var(--f-head)', fontSize:'1.5rem', fontWeight:400, marginBottom:'var(--sp-3)' }}>
                {lang === 'cs' ? 'Co je zahrnuto v každé masáži' : lang === 'en' ? 'Included with every massage' : 'Что включено в каждый массаж'}
              </h3>
              <p style={{ color:'var(--text-muted)', fontSize:'0.9375rem', lineHeight:1.75, maxWidth:'60ch', marginBottom:'var(--sp-4)' }}>
                {secAlt[lang]}
              </p>
              <div className="included-list">
                {t.inc_items.map((item, i) => (
                  <div key={i} className="included-item">{item}</div>
                ))}
              </div>
            </div>

            <div style={{ background:'linear-gradient(135deg,var(--surface) 0%,var(--surface-2) 100%)', border:'1px solid var(--border)', borderRadius:'var(--r-lg)', padding:'var(--sp-6)', display:'flex', flexDirection:'column', justifyContent:'center', gap:'var(--sp-3)' }}>
              <p className="s-eyebrow">
                {lang === 'cs' ? 'Rezervujte nyní' : lang === 'en' ? 'Book Now' : 'Забронируйте'}
              </p>
              <h3 style={{ fontFamily:'var(--f-head)', fontSize:'1.5rem', fontWeight:400, lineHeight:1.2 }}>
                {lang === 'cs' ? 'Vyberte si termín online' : lang === 'en' ? 'Choose your time online' : 'Выберите время онлайн'}
              </h3>
              <div className="gold-divider"></div>
              <p style={{ color:'var(--text-muted)', fontSize:'0.9375rem', lineHeight:1.7 }}>
                {lang === 'cs' ? 'Rezervace trvá jen pár minut. Vyberte masáž a termín — potvrzení přijde e-mailem.' :
                 lang === 'en' ? 'Booking takes just a few minutes. Choose your massage and time — confirmation by email.' :
                 'Бронирование займёт несколько минут. Подтверждение придёт на e-mail.'}
              </p>
              <button className="btn btn--primary" style={{ alignSelf:'flex-start' }}
                onClick={() => { setPage('reservation'); window.scrollTo(0, 0); }}>
                {T[lang].nav.reservation}
              </button>
            </div>
          </div>
        </div>
      </section>

      <PricesFAQ lang={lang} />
      <CTABanner lang={lang} setPage={setPage} />
    </main>
  );
}

/* Fix included grid on wide screens */
const incGridStyle = document.createElement('style');
incGridStyle.textContent = '@media (min-width: 768px) { #inc-grid { grid-template-columns: 1fr 1fr !important; } }';
document.head.appendChild(incGridStyle);

function PricesFAQ({ lang }) {
  const [open, setOpen] = useStatePr(null);
  const faqs = {
    cs:[
      { q:'Jsou v ceně zahrnuty masážní oleje?',    a:'Ano, všechny prémiové masážní oleje jsou součástí ceny. Neplatíte nic navíc.' },
      { q:'Platí se záloha při rezervaci?',          a:'Ne, zálohu nevyžadujeme. Platba probíhá celá po masáži před odchodem.' },
      { q:'Existují skupinové slevy?',               a:'Při zakoupení 5 masáží předem nabízíme 10 % slevu na celý balíček.' },
      { q:'Jak fungují dárkové vouchery?',           a:'Dárkové vouchery jsou platné 12 měsíců od zakoupení a lze je využít na libovolnou masáž.' },
    ],
    en:[
      { q:'Are massage oils included?',              a:'Yes, all premium oils are included. No extra charges.' },
      { q:'Is a deposit required at booking?',       a:'No deposit required. Full payment after the massage.' },
      { q:'Are there group discounts?',              a:'5 massages purchased in advance — 10% discount on the package.' },
      { q:'How do gift vouchers work?',              a:'Vouchers are valid for 12 months and usable for any massage.' },
    ],
    ru:[
      { q:'Включены ли масла в стоимость?',          a:'Да, все масла включены в цену. Никаких доплат.' },
      { q:'Требуется ли депозит?',                   a:'Нет, депозит не нужен. Оплата полностью после массажа.' },
      { q:'Есть ли скидки на несколько сеансов?',    a:'При покупке 5 сеансов заранее — скидка 10% на весь пакет.' },
      { q:'Как работают подарочные сертификаты?',    a:'Действительны 12 месяцев, применяются к любому виду массажа.' },
    ],
  };
  const items = faqs[lang] || faqs.cs;
  return (
    <section className="section section--alt">
      <div className="container--sm">
        <p className="s-eyebrow">{lang==='cs'?'FAQ o cenách':lang==='en'?'Pricing FAQ':'FAQ о ценах'}</p>
        <h2 className="s-title" style={{ marginBottom:'var(--sp-6)' }}>
          {lang==='cs'?'Otázky o cenách':lang==='en'?'Price Questions':'Вопросы о ценах'}
        </h2>
        <div className="faq-list">
          {items.map((f,i) => (
            <div key={i} className={`faq-item${open===i?' open':''}`}>
              <button className="faq-q" onClick={()=>setOpen(v=>v===i?null:i)}>
                <span>{f.q}</span>
                <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="faq-a"><div className="faq-a-inner">{f.a}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Network Salon card ────────────────────────────────── */
const NETWORK_SALONS = [
  {
    badge: 'Praha 2',
    name:  'Black Elixir Vinohrady',
    addr:  { cs:'Mánesova 28\nPraha 2, 120 00', en:'28 Mánesova\nPrague 2, 120 00', ru:'Mánesova 28\nПрага 2, 120 00' },
    hours: { cs:'Po–Pá 10:00–21:00 · So–Ne 10:00–19:00', en:'Mon–Fri 10:00–21:00 · Sat–Sun 10:00–19:00', ru:'Пн–Пт 10:00–21:00 · Сб–Вс 10:00–19:00' },
    phone: '+420 777 456 789',
  },
  {
    badge: 'Praha 6',
    name:  'Black Elixir Dejvice',
    addr:  { cs:'Dejvická 14\nPraha 6, 160 00', en:'14 Dejvická\nPrague 6, 160 00', ru:'Dejvická 14\nПрага 6, 160 00' },
    hours: { cs:'Po–Pá 10:00–20:00 · So 10:00–18:00', en:'Mon–Fri 10:00–20:00 · Sat 10:00–18:00', ru:'Пн–Пт 10:00–20:00 · Сб 10:00–18:00' },
    phone: '+420 777 567 890',
  },
];

/* ── Contacts Page ─────────────────────────────────────── */
function ContactsPage({ lang, setPage }) {
  const { T, PageHeader, CTABanner, useReveal } = window;
  const t = T[lang].contacts;
  const [ref, vis] = useReveal();
  const [netRef, netVis] = useReveal();

  const breadcrumbs = (
    <>
      <button onClick={() => { setPage('home'); window.scrollTo(0,0); }}>{T[lang].nav.home}</button>
      <span className="breadcrumbs__sep">›</span>
      <span style={{ color:'var(--text)' }}>{T[lang].nav.contacts}</span>
    </>
  );

  const nap = [
    { icon:'📍', label: t.addr,  val: t.addrV },
    { icon:'📞', label: t.phone, val: t.phoneV },
    { icon:'✉️', label: t.email, val: t.emailV },
    { icon:'🕐', label: t.hours, val: t.hoursV },
  ];

  const networkLabel = { cs:'Další pobočky v síti', en:'More locations in the network', ru:'Другие салоны сети' };
  const networkTitle = { cs:'Naše pobočky', en:'Our Locations', ru:'Наши салоны' };

  return (
    <main className="page-enter">
      <PageHeader title={t.ti} breadcrumbs={breadcrumbs}>{t.ds}</PageHeader>

      {/* NAP + Map */}
      <section className="section">
        <div className="container">
          <div className="contact-grid" ref={ref}>
            <div className={`reveal${vis ? ' vis' : ''}`}>
              <p className="s-eyebrow">{lang==='cs'?'Kontaktní údaje':lang==='en'?'Contact Details':'Контактные данные'}</p>
              <h2 className="s-title" style={{ marginBottom:'var(--sp-6)' }}>
                {lang==='cs'?'Jak nás kontaktovat':lang==='en'?'Get in Touch':'Как связаться'}
              </h2>
              <div className="nap-block">
                {nap.map(item => (
                  <div key={item.label} className="nap-item">
                    <div className="nap-icon">{item.icon}</div>
                    <div>
                      <div className="nap-label">{item.label}</div>
                      <div className="nap-value">{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:'var(--sp-6)' }}>
                <button className="btn btn--primary"
                  onClick={() => { setPage('reservation'); window.scrollTo(0,0); }}>
                  {T[lang].nav.reservation}
                </button>
              </div>
            </div>

            <div className={`reveal d2${vis ? ' vis' : ''}`}>
              <div className="map-placeholder">
                <div style={{ fontSize:'2.5rem', opacity:0.3 }}>🗺</div>
                <div style={{ fontFamily:'var(--f-head)', fontSize:'1.1rem' }}>
                  {lang==='cs'?'Václavské náměstí 12, Praha 1':lang==='en'?'Václavské náměstí 12, Prague 1':'Václavské náměstí 12, Прага 1'}
                </div>
                <div style={{ fontSize:'0.8125rem', color:'var(--text-muted)', maxWidth:'28ch', textAlign:'center' }}>
                  {lang==='cs'?'Google Maps embed bude zde':lang==='en'?'Google Maps embed goes here':'Здесь будет Google Maps'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Network salons */}
      <section className="section section--alt">
        <div className="container">
          <div ref={netRef} className={`reveal${netVis ? ' vis' : ''}`}>
            <p className="s-eyebrow">{networkLabel[lang]}</p>
            <h2 className="s-title" style={{ marginBottom:'var(--sp-6)' }}>{networkTitle[lang]}</h2>
            <div className="network-grid">
              {NETWORK_SALONS.map((salon, i) => (
                <div key={i} className="network-card">
                  <span className="network-card__badge">{salon.badge}</span>
                  <div className="network-card__name">{salon.name}</div>
                  <div className="network-card__addr">{salon.addr[lang]}</div>
                  <div className="network-card__row">
                    <span style={{ color:'var(--accent)' }}>🕐</span>
                    <span>{salon.hours[lang]}</span>
                  </div>
                  <div className="network-card__row">
                    <span style={{ color:'var(--accent)' }}>📞</span>
                    <span>{salon.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABanner lang={lang} setPage={setPage} />
    </main>
  );
}

Object.assign(window, { PricesPage, ContactsPage });
