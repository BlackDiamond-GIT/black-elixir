/* ============================================================
   PRICES-CONTACTS.JSX  v2
   ============================================================ */
const { useState: useStatePr } = React;

/* â”€â”€ Price square â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
        {lang === 'cs' ? 'Rezervovat' : lang === 'en' ? 'Book' : 'Đ—Đ°Đ±Ń€ĐľĐ˝Đ¸Ń€ĐľĐ˛Đ°Ń‚ŃŚ'}
      </span>
      {/* Overlay */}
      <div className="price-square__overlay">
        <p className="price-square__caption">{caption}</p>
        <div className="price-square__meta">
          <span className="price-square__dur">{svc.duration} min</span>
          <span className="price-square__price">{svc.price.toLocaleString()} KÄŤ</span>
        </div>
      </div>
    </div>
  );
}

/* â”€â”€ Prices Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function PricesPage({ lang, setPage }) {
  const { T, SERVICES, PageHeader, CTABanner, useReveal } = window;
  const t = T[lang].prices;
  const [gridRef, gridVis] = useReveal();
  const [incRef, incVis] = useReveal();

  const secAlt = {
    cs: 'KaĹľdĂ˝ zĂˇĹľitek zahrnuje prĂ©miovĂ© oleje, vyhĹ™Ă­vanĂ© prostÄ›radlo, bylinnĂ˝ ÄŤaj a pĹ™Ă­stup do relaxaÄŤnĂ­ zĂłny.',
    en: 'Every experience includes premium oils, heated linen, herbal tea and access to the relaxation lounge.',
    ru: 'ĐšĐ°Đ¶Đ´Ń‹Đą ŃĐµĐ°Đ˝Ń Đ˛ĐşĐ»ŃŽŃ‡Đ°ĐµŃ‚ ĐżŃ€ĐµĐĽĐ¸Đ°Đ»ŃŚĐ˝Ń‹Đµ ĐĽĐ°ŃĐ»Đ°, ĐżĐľĐ´ĐľĐłŃ€ĐµŃ‚ĐľĐµ Đ±ĐµĐ»ŃŚŃ‘, Ń‚Ń€Đ°Đ˛ŃŹĐ˝ĐľĐą Ń‡Đ°Đą Đ¸ Đ·ĐľĐ˝Ń Ń€ĐµĐ»Đ°ĐşŃĐ°Ń†Đ¸Đ¸.',
  };

  const breadcrumbs = (
    <>
      <button onClick={() => { setPage('home'); window.scrollTo(0,0); }}>{T[lang].nav.home}</button>
      <span className="breadcrumbs__sep">â€ş</span>
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
            {lang === 'cs' ? 'Vyberte svĹŻj zĂˇĹľitek' : lang === 'en' ? 'Choose your experience' : 'Đ’Ń‹Đ±ĐµŃ€Đ¸Ń‚Đµ Đ˛Đ°Ń ĐľĐżŃ‹Ń‚'}
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
                {lang === 'cs' ? 'Co je zahrnuto v kaĹľdĂ© masĂˇĹľi' : lang === 'en' ? 'Included with every massage' : 'Đ§Ń‚Đľ Đ˛ĐşĐ»ŃŽŃ‡ĐµĐ˝Đľ Đ˛ ĐşĐ°Đ¶Đ´Ń‹Đą ĐĽĐ°ŃŃĐ°Đ¶'}
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
                {lang === 'cs' ? 'Rezervujte nynĂ­' : lang === 'en' ? 'Book Now' : 'Đ—Đ°Đ±Ń€ĐľĐ˝Đ¸Ń€ŃĐąŃ‚Đµ'}
              </p>
              <h3 style={{ fontFamily:'var(--f-head)', fontSize:'1.5rem', fontWeight:400, lineHeight:1.2 }}>
                {lang === 'cs' ? 'Vyberte si termĂ­n online' : lang === 'en' ? 'Choose your time online' : 'Đ’Ń‹Đ±ĐµŃ€Đ¸Ń‚Đµ Đ˛Ń€ĐµĐĽŃŹ ĐľĐ˝Đ»Đ°ĐąĐ˝'}
              </h3>
              <div className="gold-divider"></div>
              <p style={{ color:'var(--text-muted)', fontSize:'0.9375rem', lineHeight:1.7 }}>
                {lang === 'cs' ? 'Rezervace trvĂˇ jen pĂˇr minut. Vyberte masĂˇĹľ a termĂ­n â€” potvrzenĂ­ pĹ™ijde e-mailem.' :
                 lang === 'en' ? 'Booking takes just a few minutes. Choose your massage and time â€” confirmation by email.' :
                 'Đ‘Ń€ĐľĐ˝Đ¸Ń€ĐľĐ˛Đ°Đ˝Đ¸Đµ Đ·Đ°ĐąĐĽŃ‘Ń‚ Đ˝ĐµŃĐşĐľĐ»ŃŚĐşĐľ ĐĽĐ¸Đ˝ŃŃ‚. ĐźĐľĐ´Ń‚Đ˛ĐµŃ€Đ¶Đ´ĐµĐ˝Đ¸Đµ ĐżŃ€Đ¸Đ´Ń‘Ń‚ Đ˝Đ° e-mail.'}
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
      { q:'Jsou v cenÄ› zahrnuty masĂˇĹľnĂ­ oleje?',    a:'Ano, vĹˇechny prĂ©miovĂ© masĂˇĹľnĂ­ oleje jsou souÄŤĂˇstĂ­ ceny. NeplatĂ­te nic navĂ­c.' },
      { q:'PlatĂ­ se zĂˇloha pĹ™i rezervaci?',          a:'Ne, zĂˇlohu nevyĹľadujeme. Platba probĂ­hĂˇ celĂˇ po masĂˇĹľi pĹ™ed odchodem.' },
      { q:'ExistujĂ­ skupinovĂ© slevy?',               a:'PĹ™i zakoupenĂ­ 5 masĂˇĹľĂ­ pĹ™edem nabĂ­zĂ­me 10 % slevu na celĂ˝ balĂ­ÄŤek.' },
      { q:'Jak fungujĂ­ dĂˇrkovĂ© vouchery?',           a:'DĂˇrkovĂ© vouchery jsou platnĂ© 12 mÄ›sĂ­cĹŻ od zakoupenĂ­ a lze je vyuĹľĂ­t na libovolnou masĂˇĹľ.' },
    ],
    en:[
      { q:'Are massage oils included?',              a:'Yes, all premium oils are included. No extra charges.' },
      { q:'Is a deposit required at booking?',       a:'No deposit required. Full payment after the massage.' },
      { q:'Are there group discounts?',              a:'5 massages purchased in advance â€” 10% discount on the package.' },
      { q:'How do gift vouchers work?',              a:'Vouchers are valid for 12 months and usable for any massage.' },
    ],
    ru:[
      { q:'Đ’ĐşĐ»ŃŽŃ‡ĐµĐ˝Ń‹ Đ»Đ¸ ĐĽĐ°ŃĐ»Đ° Đ˛ ŃŃ‚ĐľĐ¸ĐĽĐľŃŃ‚ŃŚ?',          a:'Đ”Đ°, Đ˛ŃĐµ ĐĽĐ°ŃĐ»Đ° Đ˛ĐşĐ»ŃŽŃ‡ĐµĐ˝Ń‹ Đ˛ Ń†ĐµĐ˝Ń. ĐťĐ¸ĐşĐ°ĐşĐ¸Ń… Đ´ĐľĐżĐ»Đ°Ń‚.' },
      { q:'Đ˘Ń€ĐµĐ±ŃĐµŃ‚ŃŃŹ Đ»Đ¸ Đ´ĐµĐżĐľĐ·Đ¸Ń‚?',                   a:'ĐťĐµŃ‚, Đ´ĐµĐżĐľĐ·Đ¸Ń‚ Đ˝Đµ Đ˝ŃĐ¶ĐµĐ˝. ĐžĐżĐ»Đ°Ń‚Đ° ĐżĐľĐ»Đ˝ĐľŃŃ‚ŃŚŃŽ ĐżĐľŃĐ»Đµ ĐĽĐ°ŃŃĐ°Đ¶Đ°.' },
      { q:'Đ•ŃŃ‚ŃŚ Đ»Đ¸ ŃĐşĐ¸Đ´ĐşĐ¸ Đ˝Đ° Đ˝ĐµŃĐşĐľĐ»ŃŚĐşĐľ ŃĐµĐ°Đ˝ŃĐľĐ˛?',    a:'ĐźŃ€Đ¸ ĐżĐľĐşŃĐżĐşĐµ 5 ŃĐµĐ°Đ˝ŃĐľĐ˛ Đ·Đ°Ń€Đ°Đ˝ĐµĐµ â€” ŃĐşĐ¸Đ´ĐşĐ° 10% Đ˝Đ° Đ˛ĐµŃŃŚ ĐżĐ°ĐşĐµŃ‚.' },
      { q:'ĐšĐ°Đş Ń€Đ°Đ±ĐľŃ‚Đ°ŃŽŃ‚ ĐżĐľĐ´Đ°Ń€ĐľŃ‡Đ˝Ń‹Đµ ŃĐµŃ€Ń‚Đ¸Ń„Đ¸ĐşĐ°Ń‚Ń‹?',    a:'Đ”ĐµĐąŃŃ‚Đ˛Đ¸Ń‚ĐµĐ»ŃŚĐ˝Ń‹ 12 ĐĽĐµŃŃŹŃ†ĐµĐ˛, ĐżŃ€Đ¸ĐĽĐµĐ˝ŃŹŃŽŃ‚ŃŃŹ Đş Đ»ŃŽĐ±ĐľĐĽŃ Đ˛Đ¸Đ´Ń ĐĽĐ°ŃŃĐ°Đ¶Đ°.' },
    ],
  };
  const items = faqs[lang] || faqs.cs;
  return (
    <section className="section section--alt">
      <div className="container--sm">
        <p className="s-eyebrow">{lang==='cs'?'FAQ o cenĂˇch':lang==='en'?'Pricing FAQ':'FAQ Đľ Ń†ĐµĐ˝Đ°Ń…'}</p>
        <h2 className="s-title" style={{ marginBottom:'var(--sp-6)' }}>
          {lang==='cs'?'OtĂˇzky o cenĂˇch':lang==='en'?'Price Questions':'Đ’ĐľĐżŃ€ĐľŃŃ‹ Đľ Ń†ĐµĐ˝Đ°Ń…'}
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

/* â”€â”€ Network Salon card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const NETWORK_SALONS = [
  {
    badge: 'Praha 2',
    name:  'Black Elixir Vinohrady',
    addr:  { cs:'MĂˇnesova 28\nPraha 2, 120 00', en:'28 MĂˇnesova\nPrague 2, 120 00', ru:'MĂˇnesova 28\nĐźŃ€Đ°ĐłĐ° 2, 120 00' },
    hours: { cs:'DennÄ› od 9:00 do 5:00 rĂˇno', en:'Daily from 9 AM to 5 AM', ru:'Đ•Đ¶ĐµĐ´Đ˝ĐµĐ˛Đ˝Đľ Ń 9:00 Đ´Đľ 5:00 ŃŃ‚Ń€Đ°' },
    phone: '+420 607 365 598',
  },
  {
    badge: 'Praha 6',
    name:  'Black Elixir Dejvice',
    addr:  { cs:'DejvickĂˇ 14\nPraha 6, 160 00', en:'14 DejvickĂˇ\nPrague 6, 160 00', ru:'DejvickĂˇ 14\nĐźŃ€Đ°ĐłĐ° 6, 160 00' },
    hours: { cs:'DennÄ› od 9:00 do 5:00 rĂˇno', en:'Daily from 9 AM to 5 AM', ru:'Đ•Đ¶ĐµĐ´Đ˝ĐµĐ˛Đ˝Đľ Ń 9:00 Đ´Đľ 5:00 ŃŃ‚Ń€Đ°' },
    phone: '+420 607 365 598',
  },
];

/* â”€â”€ Contacts Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function ContactsPage({ lang, setPage }) {
  const { T, PageHeader, CTABanner, useReveal } = window;
  const t = T[lang].contacts;
  const [ref, vis] = useReveal();
  const [netRef, netVis] = useReveal();

  const breadcrumbs = (
    <>
      <button onClick={() => { setPage('home'); window.scrollTo(0,0); }}>{T[lang].nav.home}</button>
      <span className="breadcrumbs__sep">â€ş</span>
      <span style={{ color:'var(--text)' }}>{T[lang].nav.contacts}</span>
    </>
  );

  const nap = [
    { icon:'đź“Ť', label: t.addr,  val: t.addrV },
    { icon:'đź“ž', label: t.phone, val: t.phoneV },
    { icon:'âś‰ď¸Ź', label: t.email, val: t.emailV },
    { icon:'đź•', label: t.hours, val: t.hoursV },
  ];

  const networkLabel = { cs:'DalĹˇĂ­ poboÄŤky v sĂ­ti', en:'More locations in the network', ru:'Đ”Ń€ŃĐłĐ¸Đµ ŃĐ°Đ»ĐľĐ˝Ń‹ ŃĐµŃ‚Đ¸' };
  const networkTitle = { cs:'NaĹˇe poboÄŤky', en:'Our Locations', ru:'ĐťĐ°ŃĐ¸ ŃĐ°Đ»ĐľĐ˝Ń‹' };

  return (
    <main className="page-enter">
      <PageHeader title={t.ti} breadcrumbs={breadcrumbs}>{t.ds}</PageHeader>

      {/* NAP + Map */}
      <section className="section">
        <div className="container">
          <div className="contact-grid" ref={ref}>
            <div className={`reveal${vis ? ' vis' : ''}`}>
              <p className="s-eyebrow">{lang==='cs'?'KontaktnĂ­ Ăşdaje':lang==='en'?'Contact Details':'ĐšĐľĐ˝Ń‚Đ°ĐşŃ‚Đ˝Ń‹Đµ Đ´Đ°Đ˝Đ˝Ń‹Đµ'}</p>
              <h2 className="s-title" style={{ marginBottom:'var(--sp-6)' }}>
                {lang==='cs'?'Jak nĂˇs kontaktovat':lang==='en'?'Get in Touch':'ĐšĐ°Đş ŃĐ˛ŃŹĐ·Đ°Ń‚ŃŚŃŃŹ'}
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
                <div style={{ fontSize:'2.5rem', opacity:0.3 }}>đź—ş</div>
                <div style={{ fontFamily:'var(--f-head)', fontSize:'1.1rem' }}>
                  {lang==='cs'?'VĂˇclavskĂ© nĂˇmÄ›stĂ­ 12, Praha 1':lang==='en'?'VĂˇclavskĂ© nĂˇmÄ›stĂ­ 12, Prague 1':'VĂˇclavskĂ© nĂˇmÄ›stĂ­ 12, ĐźŃ€Đ°ĐłĐ° 1'}
                </div>
                <div style={{ fontSize:'0.8125rem', color:'var(--text-muted)', maxWidth:'28ch', textAlign:'center' }}>
                  {lang==='cs'?'Google Maps embed bude zde':lang==='en'?'Google Maps embed goes here':'Đ—Đ´ĐµŃŃŚ Đ±ŃĐ´ĐµŃ‚ Google Maps'}
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
                    <span style={{ color:'var(--accent)' }}>đź•</span>
                    <span>{salon.hours[lang]}</span>
                  </div>
                  <div className="network-card__row">
                    <span style={{ color:'var(--accent)' }}>đź“ž</span>
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
