/* ============================================================
   SCHEDULE-PAGE.JSX
   ============================================================ */
const { useState: useStateSch } = React;

function SchedulePage({ lang, setPage }) {
  const { T, MASSEUSES, SCHEDULE, TIMES, PageHeader, CTABanner } = window;
  const t = T[lang].sched;
  const [filter, setFilter] = useStateSch(null); // null = all
  const [isLoading, setIsLoading] = useStateSch(SCHEDULE.length === 0); // Show skeleton if no data

  React.useEffect(() => {
    if (!isLoading && SCHEDULE.length > 0) {
      setIsLoading(false);
    }
  }, [SCHEDULE.length]);

  // Get today's weekday (0=Mon offset)
  const todayIdx = (() => { const d = new Date().getDay(); return d === 0 ? 6 : d - 1; })();

  const breadcrumbs = (
    <>
      <button onClick={() => { setPage('home'); window.scrollTo(0,0); }}>
        {T[lang].nav.home}
      </button>
      <span className="breadcrumbs__sep">›</span>
      <span style={{ color:'var(--text)' }}>{T[lang].nav.schedule}</span>
    </>
  );

  // Filter slots
  const filteredSlots = filter
    ? SCHEDULE.filter(s => s.mas.id === filter)
    : SCHEDULE;

  // Build lookup: day → time → [slots]
  const lookup = {};
  for (let d = 0; d < 7; d++) {
    lookup[d] = {};
    TIMES.forEach(time => { lookup[d][time] = []; });
  }
  filteredSlots.forEach(s => {
    if (lookup[s.day] && lookup[s.day][s.time] !== undefined) {
      lookup[s.day][s.time].push(s);
    }
  });

  const handleSlotClick = (slot) => {
    if (!slot.booked) {
      setPage('reservation');
      window.scrollTo(0, 0);
    }
  };

  return (
    <main className="page-enter">
      <PageHeader title={t.ti} breadcrumbs={breadcrumbs}>{t.ds}</PageHeader>

      <section className="section">
        <div className="container">

          {/* Legend */}
          <div style={{ display:'flex', gap:'var(--sp-4)', marginBottom:'var(--sp-4)', flexWrap:'wrap', alignItems:'center' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <div style={{ width:'12px', height:'12px', borderRadius:'2px', background:'var(--surface-2)', border:'1px solid var(--accent)' }}></div>
              <span style={{ fontSize:'0.75rem', color:'var(--text-muted)', letterSpacing:'0.08em' }}>{t.avail}</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <div style={{ width:'12px', height:'12px', borderRadius:'2px', background:'var(--surface)', opacity:0.4 }}></div>
              <span style={{ fontSize:'0.75rem', color:'var(--text-muted)', letterSpacing:'0.08em' }}>{t.booked}</span>
            </div>
          </div>

          {/* Masseuse filter */}
          <div className="filter-bar">
            <button
              className={`filter-btn${filter === null ? ' active' : ''}`}
              onClick={() => setFilter(null)}
            >{t.all}</button>
            {MASSEUSES.map(m => (
              <button
                key={m.id}
                className={`filter-btn${filter === m.id ? ' active' : ''}`}
                onClick={() => setFilter(m.id)}
              >{m.name}</button>
            ))}
          </div>

          {/* Show skeleton if loading */}
          {isLoading ? (
            <>
              <div className="schedule-wrap">
                <table className="sched-table">
                  <thead>
                    <tr>
                      <th style={{ width:'60px' }}></th>
                      {t.daysS.map((d, i) => (
                        <th key={i} className={i === todayIdx ? 'today-col' : ''}>
                          <div style={{ height:'20px', background:'var(--surface-2)', borderRadius:'4px', width:'60px', margin:'0 auto', animation:'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TIMES.map(time => (
                      <tr key={time}>
                        <td className="time-cell">
                          <div style={{ height:'16px', background:'var(--surface-2)', borderRadius:'3px', width:'40px', animation:'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
                        </td>
                        {[0,1,2,3,4,5,6].map(day => (
                          <td key={day} className="day-cell" style={{ background: day === todayIdx ? 'rgba(201,169,138,0.02)' : '' }}>
                            <div style={{ height:'60px', background:'var(--surface-2)', borderRadius:'4px', marginBottom:'4px', animation:'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              {/* Calendar grid */}
              <div className="schedule-wrap">
                <table className="sched-table">
                  <thead>
                    <tr>
                      <th style={{ width:'60px' }}></th>
                      {t.daysS.map((d, i) => (
                        <th key={i} className={i === todayIdx ? 'today-col' : ''}>
                          <div>{d}</div>
                          {i === todayIdx && (
                            <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'var(--accent)', margin:'3px auto 0' }}></div>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TIMES.map(time => (
                      <tr key={time}>
                        <td className="time-cell">{time}</td>
                        {[0,1,2,3,4,5,6].map(day => {
                          const slots = lookup[day][time];
                          return (
                            <td key={day} className="day-cell" style={{ background: day === todayIdx ? 'rgba(201,169,138,0.02)' : '' }}>
                              {slots.map(slot => (
                                <div
                                  key={slot.id}
                                  className={`slot-chip${slot.booked ? ' booked' : ''}`}
                                  onClick={() => handleSlotClick(slot)}
                                  title={`${slot.mas.name} · ${slot.svc.name[lang]}`}
                                >
                                  <div className="slot-chip-name">{slot.mas.name}</div>
                                  <div className="slot-chip-svc">{slot.svc.name[lang]}</div>
                                </div>
                              ))}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p style={{ fontSize:'0.8125rem', color:'var(--text-muted)', marginTop:'var(--sp-3)', textAlign:'center' }}>
                {lang === 'cs' ? 'Kliknutím na volný slot přejdete k rezervaci.' :
                 lang === 'en' ? 'Click a free slot to proceed to booking.' :
                 'Нажмите на свободный слот для бронирования.'}
              </p>
            </>
          )}
        </div>
      </section>

      <CTABanner lang={lang} setPage={setPage} />
    </main>
  );
}

Object.assign(window, { SchedulePage });
