/* ============================================================
   RESERVATION-PAGE.JSX — 5-step booking form
   ============================================================ */
const { useState: useStateR, useEffect: useEffectR } = React;

const STEP_COUNT = 5;

/* Generate available time slots for a masseuse */
function getAvailableTimes(masId) {
  const { SCHEDULE } = window;
  const slots = SCHEDULE.filter(s => s.mas.id === masId && !s.booked);
  const times = [...new Set(slots.map(s => s.time))].sort();
  return times;
}

/* ── Step indicator ────────────────────────────────────── */
function StepIndicator({ step, labels }) {
  return (
    <div className="booking-steps">
      {labels.map((label, i) => (
        <React.Fragment key={i}>
          <div className="step-pill">
            <div className={`step-dot${step === i + 1 ? ' active' : step > i + 1 ? ' done' : ''}`}>
              {step > i + 1
                ? <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                : i + 1}
            </div>
            <span className={`step-label${step === i + 1 ? ' active' : ''}`}>{label}</span>
          </div>
          {i < labels.length - 1 && <div className="step-line"></div>}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ── Step 1: Select service ────────────────────────────── */
function Step1({ lang, booking, setBooking, onNext }) {
  const { T, SERVICES } = window;
  const t = T[lang].res;
  return (
    <div>
      <h3 style={{ fontFamily:'var(--f-head)', fontSize:'1.6rem', fontWeight:400, marginBottom:'8px' }}>{t.selSvc}</h3>
      <p style={{ color:'var(--text-muted)', fontSize:'0.9375rem', marginBottom:'var(--sp-6)' }}>
        {lang === 'cs' ? 'Vyberte typ masáže, o který máte zájem.' :
         lang === 'en' ? 'Select the type of massage you would like.' :
         'Выберите вид массажа, который вас интересует.'}
      </p>
      <div className="option-grid">
        {SERVICES.map(svc => (
          <div
            key={svc.id}
            className={`opt-card${booking.service?.id === svc.id ? ' sel' : ''}`}
            onClick={() => setBooking(b => ({ ...b, service: svc, masseuse: null, slot: null }))}
          >
            <div className="opt-card__name">{svc.name[lang]}</div>
            <div className="opt-card__detail">{svc.duration} min</div>
            <div className="opt-card__price">{svc.price.toLocaleString()} Kč</div>
          </div>
        ))}
      </div>
      <div style={{ display:'flex', justifyContent:'flex-end', marginTop:'var(--sp-6)' }}>
        <button
          className="btn btn--primary"
          disabled={!booking.service}
          style={{ opacity: booking.service ? 1 : 0.45 }}
          onClick={onNext}
        >{t.next} →</button>
      </div>
    </div>
  );
}

/* ── Step 2: Select masseuse ───────────────────────────── */
function Step2({ lang, booking, setBooking, onNext, onBack }) {
  const { T, MASSEUSES } = window;
  const t = T[lang].res;
  const eligible = booking.service
    ? MASSEUSES.filter(m => m.services.includes(booking.service.id))
    : MASSEUSES;

  return (
    <div>
      <h3 style={{ fontFamily:'var(--f-head)', fontSize:'1.6rem', fontWeight:400, marginBottom:'8px' }}>{t.selMas}</h3>
      <p style={{ color:'var(--text-muted)', fontSize:'0.9375rem', marginBottom:'var(--sp-6)' }}>
        {lang === 'cs' ? `Masáž: ${booking.service?.name[lang]}` :
         lang === 'en' ? `Service: ${booking.service?.name[lang]}` :
         `Услуга: ${booking.service?.name[lang]}`}
      </p>
      <div className="option-grid">
        {eligible.map(mas => (
          <div
            key={mas.id}
            className={`opt-card${booking.masseuse?.id === mas.id ? ' sel' : ''}`}
            onClick={() => setBooking(b => ({ ...b, masseuse: mas, slot: null }))}
            style={{ display:'flex', flexDirection:'column', gap:'8px' }}
          >
            <div style={{ display:'flex', gap:'12px', alignItems:'center' }}>
              <img
                src={mas.img} alt={mas.alt}
                width="48" height="64"
                style={{ width:'48px', height:'64px', objectFit:'cover', objectPosition:'top', borderRadius:'4px', flexShrink:0 }}
                loading="lazy"
              />
              <div>
                <div className="opt-card__name">{mas.name} {mas.surname}</div>
                <div className="opt-card__detail">{mas.spec[lang]}</div>
                <div style={{ fontSize:'0.6875rem', color:'var(--accent)', marginTop:'4px' }}>{mas.exp} {T[lang].mas.yearsExp}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display:'flex', justifyContent:'space-between', marginTop:'var(--sp-6)' }}>
        <button className="btn btn--ghost" onClick={onBack}>{t.back}</button>
        <button
          className="btn btn--primary"
          disabled={!booking.masseuse}
          style={{ opacity: booking.masseuse ? 1 : 0.45 }}
          onClick={onNext}
        >{t.next} →</button>
      </div>
    </div>
  );
}

/* ── Step 3: Select time slot ──────────────────────────── */
function Step3({ lang, booking, setBooking, onNext, onBack }) {
  const { T } = window;
  const t = T[lang].res;
  const { SCHEDULE } = window;

  const DATES = (() => {
    const days = [];
    const base = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      days.push(d);
    }
    return days;
  })();

  const [selDate, setSelDate] = useStateR(0);
  const dayOfWeek = (d) => { const w = d.getDay(); return w === 0 ? 6 : w - 1; };

  // Available slots for this masseuse on selected date's weekday
  const dayIdx = dayOfWeek(DATES[selDate]);
  const availSlots = booking.masseuse
    ? SCHEDULE.filter(s => s.mas.id === booking.masseuse.id && s.day === dayIdx && s.svc.id === booking.service?.id)
    : [];

  const dayLabels = { cs:['Ne','Po','Út','St','Čt','Pá','So'], en:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'], ru:['Вс','Пн','Вт','Ср','Чт','Пт','Сб'] };

  return (
    <div>
      <h3 style={{ fontFamily:'var(--f-head)', fontSize:'1.6rem', fontWeight:400, marginBottom:'8px' }}>
        {t.selDate}
      </h3>
      <p style={{ color:'var(--text-muted)', fontSize:'0.9375rem', marginBottom:'var(--sp-4)' }}>
        {booking.masseuse?.name} · {booking.service?.name[lang]}
      </p>

      {/* Date selector */}
      <div style={{ display:'flex', gap:'8px', overflowX:'auto', paddingBottom:'8px', marginBottom:'var(--sp-4)' }}>
        {DATES.map((d, i) => {
          const wd = d.getDay();
          const label = dayLabels[lang][wd];
          const num = d.getDate();
          const isToday = i === 0;
          return (
            <button
              key={i}
              onClick={() => { setSelDate(i); setBooking(b => ({ ...b, slot: null })); }}
              style={{
                flexShrink: 0,
                minWidth: '60px',
                padding: '10px 12px',
                borderRadius: 'var(--r-sm)',
                border: `1px solid ${selDate === i ? 'var(--accent)' : 'var(--border)'}`,
                background: selDate === i ? 'rgba(201,169,138,0.1)' : 'var(--surface-2)',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all var(--t)',
              }}
            >
              <div style={{ fontSize:'0.6875rem', letterSpacing:'0.1em', textTransform:'uppercase', color: selDate === i ? 'var(--accent)' : 'var(--text-muted)' }}>{label}</div>
              <div style={{ fontFamily:'var(--f-head)', fontSize:'1.3rem', color: selDate === i ? 'var(--text)' : 'var(--text-muted)', lineHeight:1, marginTop:'4px' }}>{num}</div>
              {isToday && <div style={{ fontSize:'0.55rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--accent)', marginTop:'4px' }}>
                {lang === 'cs' ? 'dnes' : lang === 'en' ? 'today' : 'сегодня'}
              </div>}
            </button>
          );
        })}
      </div>

      {/* Time slots */}
      <p style={{ fontSize:'0.75rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'var(--sp-2)' }}>
        {t.selSlot}
      </p>
      {availSlots.length === 0 ? (
        <div style={{ padding:'var(--sp-6)', textAlign:'center', color:'var(--text-muted)', fontSize:'0.9375rem', background:'var(--surface-2)', borderRadius:'var(--r-md)' }}>
          {lang === 'cs' ? 'Žádný volný termín — zkuste jiný den.' :
           lang === 'en' ? 'No slots available — try another day.' :
           'Нет свободного времени — попробуйте другой день.'}
        </div>
      ) : (
        <div className="time-grid">
          {availSlots.map(s => (
            <button
              key={s.id}
              className={`time-btn${s.booked ? ' booked' : ''}${booking.slot?.id === s.id ? ' sel' : ''}`}
              disabled={s.booked}
              onClick={() => setBooking(b => ({ ...b, slot: s }))}
            >
              {s.time}
            </button>
          ))}
        </div>
      )}

      <div style={{ display:'flex', justifyContent:'space-between', marginTop:'var(--sp-6)' }}>
        <button className="btn btn--ghost" onClick={onBack}>{t.back}</button>
        <button
          className="btn btn--primary"
          disabled={!booking.slot}
          style={{ opacity: booking.slot ? 1 : 0.45 }}
          onClick={onNext}
        >{t.next} →</button>
      </div>
    </div>
  );
}

/* ── Step 4: Contact form ──────────────────────────────── */
function Step4({ lang, booking, setBooking, onNext, onBack }) {
  const { T } = window;
  const t = T[lang].res;
  const [form, setForm] = useStateR(booking.contact || { name:'', email:'', phone:'', msg:'' });
  const valid = form.name.trim() && form.email.includes('@') && form.phone.trim();

  const upd = (k, v) => {
    const nf = { ...form, [k]: v };
    setForm(nf);
    setBooking(b => ({ ...b, contact: nf }));
  };

  return (
    <div>
      <h3 style={{ fontFamily:'var(--f-head)', fontSize:'1.6rem', fontWeight:400, marginBottom:'8px' }}>{t.contactTi}</h3>
      <p style={{ color:'var(--text-muted)', fontSize:'0.9375rem', marginBottom:'var(--sp-6)' }}>
        {booking.service?.name[lang]} · {booking.masseuse?.name} · {booking.slot?.time}
      </p>
      <div className="form-2col">
        <div className="form-group">
          <label className="form-label">{t.name} *</label>
          <input className="form-input" type="text" value={form.name} onChange={e => upd('name', e.target.value)} placeholder={lang === 'cs' ? 'Jana Nováková' : lang === 'en' ? 'Jane Smith' : 'Анна Иванова'} />
        </div>
        <div className="form-group">
          <label className="form-label">{t.phone} *</label>
          <input className="form-input" type="tel" value={form.phone} onChange={e => upd('phone', e.target.value)} placeholder="+420 777 000 000" />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">{t.email} *</label>
        <input className="form-input" type="email" value={form.email} onChange={e => upd('email', e.target.value)} placeholder="email@example.com" />
      </div>
      <div className="form-group">
        <label className="form-label">{t.msg}</label>
        <textarea className="form-textarea" value={form.msg} onChange={e => upd('msg', e.target.value)} placeholder={t.msgP} />
      </div>
      <p style={{ fontSize:'0.75rem', color:'var(--text-muted)', marginBottom:'var(--sp-4)' }}>
        {lang === 'cs' ? '* Povinné pole' : lang === 'en' ? '* Required field' : '* Обязательное поле'}
      </p>
      <div style={{ display:'flex', justifyContent:'space-between' }}>
        <button className="btn btn--ghost" onClick={onBack}>{t.back}</button>
        <button
          className="btn btn--primary"
          disabled={!valid}
          style={{ opacity: valid ? 1 : 0.45 }}
          onClick={onNext}
        >{t.confirm}</button>
      </div>
    </div>
  );
}

/* ── Step 5: Confirmation ──────────────────────────────── */
function Step5({ lang, booking, onReset, setPage }) {
  const { T } = window;
  const t = T[lang].res;

  return (
    <div className="confirm-box">
      <div className="confirm-icon">✓</div>
      <h2 style={{ fontFamily:'var(--f-head)', fontSize:'2.2rem', fontWeight:400, marginBottom:'12px' }}>{t.done}</h2>
      <p style={{ color:'var(--text-muted)', marginBottom:'var(--sp-6)', maxWidth:'44ch', margin:'0 auto var(--sp-6)' }}>{t.doneText}</p>

      <div className="booking-summary container--xs">
        {[
          [t.sum_svc, booking.service?.name[lang]],
          [t.sum_mas, `${booking.masseuse?.name} ${booking.masseuse?.surname}`],
          [t.sum_dt,  booking.slot?.time],
          [t.sum_dur, `${booking.service?.duration} min`],
          [t.sum_pr,  `${booking.service?.price?.toLocaleString()} Kč`],
        ].filter(([,v]) => v).map(([l, v]) => (
          <div key={l} className="summary-row">
            <span className="summary-label">{l}</span>
            <span className="summary-val">{v}</span>
          </div>
        ))}
        {booking.contact?.email && (
          <div className="summary-row">
            <span className="summary-label">Email</span>
            <span className="summary-val">{booking.contact.email}</span>
          </div>
        )}
      </div>

      <div style={{ display:'flex', gap:'var(--sp-2)', justifyContent:'center', marginTop:'var(--sp-6)', flexWrap:'wrap' }}>
        <button className="btn btn--ghost" onClick={onReset}>{t.again}</button>
        <button className="btn btn--primary" onClick={() => { setPage('home'); window.scrollTo(0,0); }}>
          {lang === 'cs' ? 'Zpět na hlavní stránku' : lang === 'en' ? 'Back to Home' : 'На главную'}
        </button>
      </div>
    </div>
  );
}

/* ── ReservationPage ───────────────────────────────────── */
function ReservationPage({ lang, setPage }) {
  const { T, PageHeader } = window;
  const t = T[lang].res;

  const emptyBooking = { service: null, masseuse: null, slot: null, contact: null };
  const [step, setStep] = useStateR(1);
  const [booking, setBooking] = useStateR(emptyBooking);

  const next = () => setStep(s => Math.min(s + 1, STEP_COUNT));
  const back = () => setStep(s => Math.max(s - 1, 1));
  const reset = () => { setStep(1); setBooking(emptyBooking); };

  const breadcrumbs = (
    <>
      <button onClick={() => { setPage('home'); window.scrollTo(0,0); }}>
        {T[lang].nav.home}
      </button>
      <span className="breadcrumbs__sep">›</span>
      <span style={{ color:'var(--text)' }}>{T[lang].nav.reservation}</span>
    </>
  );

  return (
    <main className="page-enter">
      <PageHeader title={t.ti} breadcrumbs={breadcrumbs}>
        {lang === 'cs' ? 'Rezervace trvá jen pár minut.' :
         lang === 'en' ? 'Booking takes just a few minutes.' :
         'Бронирование займёт всего несколько минут.'}
      </PageHeader>

      <section className="section">
        <div className="container--sm">
          {step < STEP_COUNT && <StepIndicator step={step} labels={t.steps} />}

          <div className="booking-panel">
            {step === 1 && <Step1 lang={lang} booking={booking} setBooking={setBooking} onNext={next} />}
            {step === 2 && <Step2 lang={lang} booking={booking} setBooking={setBooking} onNext={next} onBack={back} />}
            {step === 3 && <Step3 lang={lang} booking={booking} setBooking={setBooking} onNext={next} onBack={back} />}
            {step === 4 && <Step4 lang={lang} booking={booking} setBooking={setBooking} onNext={next} onBack={back} />}
            {step === 5 && <Step5 lang={lang} booking={booking} onReset={reset} setPage={setPage} />}
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { ReservationPage });
