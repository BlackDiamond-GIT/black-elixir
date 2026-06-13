/* ============================================================
   APP.JSX — routing, theme, Tweaks integration
   ============================================================ */
const { useState: useStateApp, useEffect: useEffectApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "rose",
  "headingFont": "dm",
  "density": "comfortable"
}/*EDITMODE-END*/;

function App() {
  const { useTweaks, TweaksPanel, TweakSection, TweakRadio } = window;
  const { Nav, Footer } = window;
  const { HomePage, MasseusesPage, SchedulePage, PricesPage, ContactsPage, ReservationPage, BlogPage } = window;

  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [lang, setLang] = useStateApp(() => {
    try { return localStorage.getItem('bv_lang') || 'cs'; } catch { return 'cs'; }
  });
  const [page, setPage] = useStateApp('home');

  // Persist language
  useEffectApp(() => {
    try { localStorage.setItem('bv_lang', lang); } catch {}
  }, [lang]);

  // Apply theme data-attributes to root
  useEffectApp(() => {
    const root = document.documentElement;
    root.setAttribute('data-accent', t.accent === 'gold' ? 'gold' : 'rose');
    root.setAttribute('data-font',   t.headingFont === 'dm' ? 'dm' : 'cormorant');
    root.setAttribute('data-density', t.density);
  }, [t]);

  // Restore scroll on page change
  useEffectApp(() => { window.scrollTo(0, 0); }, [page]);

  const pageMap = {
    home:        <HomePage        lang={lang} setPage={setPage} />,
    masseuses:   <MasseusesPage   lang={lang} setPage={setPage} />,
    schedule:    <SchedulePage    lang={lang} setPage={setPage} />,
    prices:      <PricesPage      lang={lang} setPage={setPage} />,
    blog:        <BlogPage        lang={lang} setPage={setPage} />,
    contacts:    <ContactsPage    lang={lang} setPage={setPage} />,
    reservation: <ReservationPage lang={lang} setPage={setPage} />,
  };

  return (
    <div>
      <Nav lang={lang} setLang={setLang} page={page} setPage={setPage} />

      {pageMap[page] || pageMap.home}

      <Footer lang={lang} setPage={setPage} />

      <TweaksPanel>
        <TweakSection label="Black Elixir — Variations" />
        <TweakRadio
          label="Accent colour"
          value={t.accent}
          options={['gold', 'rose']}
          onChange={v => setTweak('accent', v)}
        />
        <TweakRadio
          label="Heading font"
          value={t.headingFont}
          options={['cormorant', 'dm']}
          onChange={v => setTweak('headingFont', v)}
        />
        <TweakSection label="Spacing" />
        <TweakRadio
          label="Density"
          value={t.density}
          options={['comfortable', 'spacious']}
          onChange={v => setTweak('density', v)}
        />
      </TweaksPanel>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
