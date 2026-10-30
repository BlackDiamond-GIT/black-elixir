/* ============================================================
   BLACK ELIXIR SPA â€” DATA LAYER
   Translations (CS / EN / RU) + sample data
   ============================================================ */

const T = {
  cs: {
    nav: { home:'DomĹŻ', masseuses:'MasĂ©rky', schedule:'Rozvrh', prices:'CenĂ­k', contacts:'Kontakt', reservation:'Rezervace' },
    hero: {
      eyebrow: 'PrĂ©miovĂˇ Spa Praha',
      line1: 'MasĂˇĹľe a', line2: 'relaxace',
      brand: 'Black Elixir',
      sub: 'DopĹ™ejte si luxus profesionĂˇlnĂ­ masĂˇĹľe v soukromĂ©m, elegantnĂ­m prostĹ™edĂ­. NaĹˇe masĂ©rky peÄŤujĂ­ o vaĹˇe tÄ›lo i mysl.',
      cta: 'Rezervovat', cta2: 'NaĹˇe masĂˇĹľe',
      y: 'let zkuĹˇenostĂ­', c: 'spokojenĂ˝ch klientĹŻ', m: 'masĂ©rky',
      next: 'PĹ™Ă­ĹˇtĂ­ volnĂ˝ termĂ­n', today: 'Dnes, 19:00', nextMeta: 'Elena Â· KlasickĂˇ masĂˇĹľ',
    },
    sec: {
      svc:  { ey:'NaĹˇe masĂˇĹľe',   ti:'Vyberte si masĂˇĹľ',            ds:'NabĂ­zĂ­me Ĺˇirokou ĹˇkĂˇlu profesionĂˇlnĂ­ch masĂˇĹľĂ­ pro vaĹˇi relaxaci a regeneraci.' },
      mas:  { ey:'NĂˇĹˇ tĂ˝m',       ti:'Poznejte naĹˇe masĂ©rky',       ds:'KaĹľdĂˇ z naĹˇich masĂ©rek je zkuĹˇenĂˇ odbornice s odbornĂ˝m pĹ™Ă­stupem ke svĂ©mu oboru.' },
      proc: { ey:'Jak to funguje',ti:'VaĹˇe cesta k relaxaci',       ds:'' },
      pr:   { ey:'CenĂ­k',         ti:'TransparentnĂ­ ceny',          ds:'Ĺ˝ĂˇdnĂ© skrytĂ© poplatky. Cena zahrnuje celĂ˝ zĂˇĹľitek â€” od uvĂ­tĂˇnĂ­ po zĂˇvÄ›reÄŤnĂ˝ ÄŤaj.' },
      faq:  { ey:'FAQ',           ti:'ÄŚastĂ© dotazy',                ds:'' },
      cta:  { ti:'PĹ™ipraveni na relaxaci?', ds:'Rezervujte si masĂˇĹľ jeĹˇtÄ› dnes a vÄ›nujte ÄŤas sami sobÄ›.', btn:'Rezervovat online' },
      mas_all: 'VĹˇechny masĂ©rky â†’',
      svc_all: 'Zobrazit kompletnĂ­ cenĂ­k',
    },
    proc: [
      { ti:'Rezervace online', tx:'Vyberte masĂˇĹľ, masĂ©rku a termĂ­n pĹ™es nĂˇĹˇ systĂ©m â€” kdykoliv, odkudkoliv.' },
      { ti:'UvĂ­tĂˇnĂ­',          tx:'Po pĹ™Ă­chodu vĂˇs uvĂ­tĂˇme ÄŤajem a krĂˇtce projdeme vaĹˇe pĹ™ĂˇnĂ­ a potĹ™eby.' },
      { ti:'VaĹˇe masĂˇĹľ',       tx:'MasĂ©rka se postarĂˇ o vĂˇs v soukromĂ©m, vonnĂ©m prostoru dle vaĹˇich pĹ™ĂˇnĂ­.' },
      { ti:'Regenerace',       tx:'Po masĂˇĹľi si odpoÄŤiĹte v relaxaÄŤnĂ­ zĂłnÄ› â€” prodlouĹľte si svĹŻj zĂˇĹľitek.' },
    ],
    faq: [
      { q:'Jak se pĹ™ipravit na masĂˇĹľ?',          a:'DoporuÄŤujeme pĹ™ijĂ­t 10 minut pĹ™ed termĂ­nem. Nepijte alkohol alespoĹ 4 hodiny pĹ™ed masĂˇĹľĂ­. MasĂˇĹľ se provĂˇdĂ­ na speciĂˇlnĂ­m stole s prostÄ›radlem â€” vĹľdy v soukromĂ­ a s respektem.' },
      { q:'Je nutnĂ© rezervovat pĹ™edem?',          a:'Ano, rezervace je povinnĂˇ. Kapacita je omezenĂˇ a rĂˇdi bychom vĂˇm zajistili vĂˇĹˇ preferovanĂ˝ termĂ­n a masĂ©rku bez ÄŤekĂˇnĂ­.' },
      { q:'JakĂ© jsou platebnĂ­ moĹľnosti?',         a:'PĹ™ijĂ­mĂˇme hotovost, karty (Visa, Mastercard) i bankovnĂ­ pĹ™evod. Platba probĂ­hĂˇ po masĂˇĹľi pĹ™ed odchodem.' },
      { q:'Mohu pĹ™ijĂ­t s partnerem na pĂˇrovou masĂˇĹľ?', a:'SamozĹ™ejmÄ›! PĂˇrovĂˇ masĂˇĹľ je jednou z nejoblĂ­benÄ›jĹˇĂ­ch sluĹľeb. ObÄ› masĂ©rky pracujĂ­ ve stejnĂ©m pokoji ve stejnĂ˝ ÄŤas.' },
      { q:'Co je zahrnuto v cenÄ› masĂˇĹľe?',        a:'Cena zahrnuje masĂˇĹľ dle cenĂ­ku, prĂ©miovĂ© masĂˇĹľnĂ­ oleje, vyhĹ™Ă­vanĂ© prostÄ›radlo a pĹ™Ă­stup do relaxaÄŤnĂ­ zĂłny s bylinnĂ˝m ÄŤajem.' },
      { q:'Lze masĂˇĹľ objednat jako dĂˇrek?',       a:'Ano! DĂˇrkovĂ© vouchery jsou k dispozici pro libovolnou hodnotu nebo konkrĂ©tnĂ­ masĂˇĹľ. Kontaktujte nĂˇs e-mailem.' },
    ],
    prices: {
      ti:'CenĂ­k masĂˇĹľĂ­ â€” Black Elixir Spa', ds:'PrĂ©miovĂ© masĂˇĹľe v elegantnĂ­m prostĹ™edĂ­. Ceny jsou uvedeny v KÄŤ.',
      th_svc:'MasĂˇĹľ', th_dur:'DĂ©lka', th_pr:'Cena',
      inc_ti:'Co je zahrnuto', inc_items:['PrĂ©miovĂ© masĂˇĹľnĂ­ oleje','VyhĹ™Ă­vanĂ© prostÄ›radlo','BylinnĂ˝ ÄŤaj','SoukromĂ˝ pokoj','RelaxaÄŤnĂ­ zĂłna po masĂˇĹľi'],
    },
    sched: {
      ti:'Rozvrh masĂˇĹľĂ­', ds:'AktuĂˇlnĂ­ dostupnost. KliknÄ›te na volnĂ˝ slot pro rezervaci.',
      all:'VĹˇechny masĂ©rky', avail:'VolnĂ©', booked:'Obsazeno',
      days:['PondÄ›lĂ­','ĂšterĂ˝','StĹ™eda','ÄŚtvrtek','PĂˇtek','Sobota','NedÄ›le'],
      daysS:['Po','Ăšt','St','ÄŚt','PĂˇ','So','Ne'],
    },
    contacts: {
      ti:'Kontakt â€” Black Elixir Spa', ds:'Najdete nĂˇs v srdci Prahy. TÄ›ĹˇĂ­me se na vaĹˇi nĂˇvĹˇtÄ›vu.',
      addr:'Adresa', addrV:'VĂˇclavskĂ© nĂˇmÄ›stĂ­ 12\nPraha 1, 110 00\nÄŚeskĂˇ republika',
      phone:'Telefon', phoneV:'+420 607 365 598',
      email:'E-mail',  emailV:'info@blackelixir.cz',
      hours:'OtevĂ­racĂ­ hodiny', hoursV:'DennÄ› od 9:00 do 5:00 rĂˇno',
    },
    mas: {
      ti:'NaĹˇe masĂ©rky â€” Black Elixir Spa', ds:'ZkuĹˇenĂ© odbornice s odbornĂ˝m pĹ™Ă­stupem k masĂˇĹľi a wellbeingu.',
      svcOf:'MasĂˇĹľe, kterĂ© nabĂ­zĂ­', bookWith:'Rezervovat s',
      yearsExp:'let zkuĹˇenostĂ­',
    },
    res: {
      ti:'Rezervace masĂˇĹľe',
      steps:['SluĹľba','MasĂ©rka','TermĂ­n','Kontakt','PotvrzenĂ­'],
      selSvc:'Vyberte masĂˇĹľ', selMas:'Vyberte masĂ©rku', selDate:'Vyberte datum',
      selSlot:'DostupnĂ© ÄŤasy',
      contactTi:'KontaktnĂ­ Ăşdaje',
      name:'JmĂ©no a pĹ™Ă­jmenĂ­', email:'E-mail', phone:'Telefon',
      msg:'PoznĂˇmka (volitelnĂ©)', msgP:'SpeciĂˇlnĂ­ pĹ™ĂˇnĂ­ nebo zdravotnĂ­ omezenĂ­?',
      confirm:'Potvrdit rezervaci', next:'PokraÄŤovat', back:'ZpÄ›t',
      done:'Rezervace potvrzena!',
      doneText:'DÄ›kujeme! VaĹˇe rezervace byla ĂşspÄ›ĹˇnÄ› odeslĂˇna. PotvrzenĂ­ pĹ™ijde na vĂˇĹˇ e-mail.',
      again:'NovĂˇ rezervace',
      sum_svc:'MasĂˇĹľ', sum_mas:'MasĂ©rka', sum_dt:'TermĂ­n', sum_dur:'DĂ©lka', sum_pr:'Cena',
    },
    footer: {
      pages:'StrĂˇnky', massages:'MasĂˇĹľe', contact:'Kontakt',
      tagline:'PrĂ©miovĂˇ masĂˇĹľ a relaxace v srdci Prahy.',
      rights:'VĹˇechna prĂˇva vyhrazena.', terms:'PodmĂ­nky', privacy:'SoukromĂ­',
    },
  },

  en: {
    nav: { home:'Home', masseuses:'Masseuses', schedule:'Schedule', prices:'Prices', contacts:'Contact', reservation:'Booking' },
    hero: {
      eyebrow: 'Premium Spa Prague',
      line1: 'Massage &', line2: 'Relaxation',
      brand: 'Black Elixir',
      sub: 'Indulge in the luxury of professional massage in a private, elegant setting. Our masseuses care for your body and mind.',
      cta: 'Book Now', cta2: 'Our Services',
      y: 'years experience', c: 'happy clients', m: 'masseuses',
      next: 'Next availability', today: 'Today, 19:00', nextMeta: 'Elena Â· Classic Massage',
    },
    sec: {
      svc:  { ey:'Our Massages',    ti:'Choose Your Massage',          ds:'We offer a wide range of professional massages for your relaxation and rejuvenation.' },
      mas:  { ey:'Our Team',        ti:'Meet Our Masseuses',           ds:'Each of our masseuses is an experienced professional dedicated to their craft.' },
      proc: { ey:'How It Works',    ti:'Your Journey to Relaxation',   ds:'' },
      pr:   { ey:'Pricing',         ti:'Transparent Pricing',          ds:'No hidden fees. Price includes the full experience â€” from welcome to farewell tea.' },
      faq:  { ey:'FAQ',             ti:'Frequently Asked Questions',   ds:'' },
      cta:  { ti:'Ready to Relax?', ds:'Book your massage today and invest time in yourself.', btn:'Book Online' },
      mas_all: 'All Masseuses â†’',
      svc_all: 'View Full Pricing',
    },
    proc: [
      { ti:'Book Online',  tx:'Choose your massage, masseuse and time â€” anytime, anywhere through our system.' },
      { ti:'Welcome',      tx:'On arrival we welcome you with tea and briefly discuss your wishes and needs.' },
      { ti:'Your Massage', tx:'Your masseuse cares for you in a private, fragrant space tailored to your needs.' },
      { ti:'Unwind',       tx:'After the massage, relax in our lounge with tea â€” extend your experience.' },
    ],
    faq: [
      { q:'How should I prepare for my massage?',   a:'Arrive 10 minutes early. Avoid alcohol at least 4 hours before. The massage is performed on a treatment table with linen â€” always private and respectful.' },
      { q:'Do I need to book in advance?',          a:'Yes, booking is required. Capacity is limited and we want to secure your preferred time and masseuse without waiting.' },
      { q:'What payment methods do you accept?',    a:'We accept cash, cards (Visa, Mastercard) and bank transfers. Payment is made after the massage before leaving.' },
      { q:'Can I come with a partner for couples?', a:'Absolutely! Couples massage is one of our most popular services. Both masseuses work in the same room at the same time.' },
      { q:"What's included in the price?",          a:'Price includes the massage, premium oils, heated linen, and access to the relaxation lounge with herbal tea.' },
      { q:'Can I order a massage as a gift?',       a:'Yes! Gift vouchers are available for any value or specific massage. Contact us by email for details.' },
    ],
    prices: {
      ti:'Massage Prices â€” Black Elixir Spa', ds:'Premium massages in an elegant setting. All prices in CZK.',
      th_svc:'Massage', th_dur:'Duration', th_pr:'Price',
      inc_ti:'What\'s Included', inc_items:['Premium massage oils','Heated linen','Herbal tea','Private room','Post-massage relaxation lounge'],
    },
    sched: {
      ti:'Massage Schedule', ds:'Current availability. Click a free slot to book.',
      all:'All Masseuses', avail:'Available', booked:'Booked',
      days:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      daysS:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    },
    contacts: {
      ti:'Contact â€” Black Elixir Spa', ds:'Find us in the heart of Prague. We look forward to your visit.',
      addr:'Address', addrV:'12 VĂˇclavskĂ© nĂˇmÄ›stĂ­\nPrague 1, 110 00\nCzech Republic',
      phone:'Phone', phoneV:'+420 607 365 598',
      email:'Email',  emailV:'info@blackelixir.cz',
      hours:'Opening Hours', hoursV:'Daily from 9 AM to 5 AM',
    },
    mas: {
      ti:'Our Masseuses â€” Black Elixir Spa', ds:'Experienced professionals dedicated to massage and wellbeing.',
      svcOf:'Massages offered', bookWith:'Book with',
      yearsExp:'years experience',
    },
    res: {
      ti:'Book a Massage',
      steps:['Service','Masseuse','Time','Contact','Confirm'],
      selSvc:'Select a massage', selMas:'Select a masseuse', selDate:'Select a date',
      selSlot:'Available times',
      contactTi:'Your Details',
      name:'Full Name', email:'Email', phone:'Phone',
      msg:'Note (optional)', msgP:'Special requests or health concerns?',
      confirm:'Confirm Booking', next:'Continue', back:'Back',
      done:'Booking Confirmed!',
      doneText:"Thank you! Your booking has been submitted. A confirmation will be sent to your email.",
      again:'New Booking',
      sum_svc:'Massage', sum_mas:'Masseuse', sum_dt:'Time', sum_dur:'Duration', sum_pr:'Price',
    },
    footer: {
      pages:'Pages', massages:'Massages', contact:'Contact',
      tagline:'Premium massage and relaxation in the heart of Prague.',
      rights:'All rights reserved.', terms:'Terms', privacy:'Privacy',
    },
  },

  ru: {
    nav: { home:'Đ“Đ»Đ°Đ˛Đ˝Đ°ŃŹ', masseuses:'ĐśĐ°ŃŃĐ°Đ¶Đ¸ŃŃ‚ĐşĐ¸', schedule:'Đ Đ°ŃĐżĐ¸ŃĐ°Đ˝Đ¸Đµ', prices:'Đ¦ĐµĐ˝Ń‹', contacts:'ĐšĐľĐ˝Ń‚Đ°ĐşŃ‚', reservation:'Đ‘Ń€ĐľĐ˝Đ¸Ń€ĐľĐ˛Đ°Đ˝Đ¸Đµ' },
    hero: {
      eyebrow: 'ĐźŃ€ĐµĐĽĐ¸ŃĐĽ ĐˇĐżĐ° ĐźŃ€Đ°ĐłĐ°',
      line1: 'ĐśĐ°ŃŃĐ°Đ¶ Đ¸', line2: 'Ń€ĐµĐ»Đ°ĐşŃĐ°Ń†Đ¸ŃŹ',
      brand: 'Black Elixir',
      sub: 'ĐťĐ°ŃĐ»Đ°Đ´Đ¸Ń‚ĐµŃŃŚ Ń€ĐľŃĐşĐľŃŃŚŃŽ ĐżŃ€ĐľŃ„ĐµŃŃĐ¸ĐľĐ˝Đ°Đ»ŃŚĐ˝ĐľĐłĐľ ĐĽĐ°ŃŃĐ°Đ¶Đ° Đ˛ ĐżŃ€Đ¸Đ˛Đ°Ń‚Đ˝ĐľĐą, ŃŤĐ»ĐµĐłĐ°Đ˝Ń‚Đ˝ĐľĐą ĐľĐ±ŃŃ‚Đ°Đ˝ĐľĐ˛ĐşĐµ. ĐťĐ°ŃĐ¸ ĐĽĐ°ŃŃĐ°Đ¶Đ¸ŃŃ‚ĐşĐ¸ Đ·Đ°Đ±ĐľŃ‚ŃŹŃ‚ŃŃŹ Đľ Đ˛Đ°ŃĐµĐĽ Ń‚ĐµĐ»Đµ Đ¸ Đ´ŃŃĐµ.',
      cta: 'Đ—Đ°Đ±Ń€ĐľĐ˝Đ¸Ń€ĐľĐ˛Đ°Ń‚ŃŚ', cta2: 'ĐťĐ°ŃĐ¸ ŃŃĐ»ŃĐłĐ¸',
      y: 'Đ»ĐµŃ‚ ĐľĐżŃ‹Ń‚Đ°', c: 'Đ´ĐľĐ˛ĐľĐ»ŃŚĐ˝Ń‹Ń… ĐşĐ»Đ¸ĐµĐ˝Ń‚ĐľĐ˛', m: 'ĐĽĐ°ŃŃĐ°Đ¶Đ¸ŃŃ‚ĐşĐ¸',
      next: 'Đ‘Đ»Đ¸Đ¶Đ°ĐąŃĐµĐµ Đ˛Ń€ĐµĐĽŃŹ', today: 'ĐˇĐµĐłĐľĐ´Đ˝ŃŹ, 19:00', nextMeta: 'Đ•Đ»ĐµĐ˝Đ° Â· ĐšĐ»Đ°ŃŃĐ¸Ń‡ĐµŃĐşĐ¸Đą ĐĽĐ°ŃŃĐ°Đ¶',
    },
    sec: {
      svc:  { ey:'ĐťĐ°ŃĐ¸ ĐĽĐ°ŃŃĐ°Đ¶Đ¸',      ti:'Đ’Ń‹Đ±ĐµŃ€Đ¸Ń‚Đµ Đ˛Đ¸Đ´ ĐĽĐ°ŃŃĐ°Đ¶Đ°',               ds:'ĐśŃ‹ ĐżŃ€ĐµĐ´Đ»Đ°ĐłĐ°ĐµĐĽ ŃĐ¸Ń€ĐľĐşĐ¸Đą ŃĐżĐµĐşŃ‚Ń€ ĐżŃ€ĐľŃ„ĐµŃŃĐ¸ĐľĐ˝Đ°Đ»ŃŚĐ˝Ń‹Ń… ĐĽĐ°ŃŃĐ°Đ¶ĐµĐą Đ´Đ»ŃŹ Đ˛Đ°ŃĐµĐą Ń€ĐµĐ»Đ°ĐşŃĐ°Ń†Đ¸Đ¸ Đ¸ Đ˛ĐľŃŃŃ‚Đ°Đ˝ĐľĐ˛Đ»ĐµĐ˝Đ¸ŃŹ.' },
      mas:  { ey:'ĐťĐ°ŃĐ° ĐşĐľĐĽĐ°Đ˝Đ´Đ°',      ti:'ĐźĐľĐ·Đ˝Đ°ĐşĐľĐĽŃŚŃ‚ĐµŃŃŚ Ń Đ˝Đ°ŃĐ¸ĐĽĐ¸ ĐĽĐ°ŃŃĐ°Đ¶Đ¸ŃŃ‚ĐşĐ°ĐĽĐ¸', ds:'ĐšĐ°Đ¶Đ´Đ°ŃŹ ĐĽĐ°ŃŃĐ°Đ¶Đ¸ŃŃ‚ĐşĐ° â€” ĐľĐżŃ‹Ń‚Đ˝Ń‹Đą ŃĐżĐµŃ†Đ¸Đ°Đ»Đ¸ŃŃ‚ Ń Đ»ŃŽĐ±ĐľĐ˛ŃŚŃŽ Đş ŃĐ˛ĐľĐµĐą ĐżŃ€ĐľŃ„ĐµŃŃĐ¸Đ¸.' },
      proc: { ey:'ĐšĐ°Đş ŃŤŃ‚Đľ Ń€Đ°Đ±ĐľŃ‚Đ°ĐµŃ‚',  ti:'Đ’Đ°Ń ĐżŃŃ‚ŃŚ Đş Ń€ĐµĐ»Đ°ĐşŃĐ°Ń†Đ¸Đ¸',              ds:'' },
      pr:   { ey:'Đ¦ĐµĐ˝Ń‹',              ti:'ĐźŃ€ĐľĐ·Ń€Đ°Ń‡Đ˝Ń‹Đµ Ń†ĐµĐ˝Ń‹',                    ds:'ĐťĐ¸ĐşĐ°ĐşĐ¸Ń… ŃĐşŃ€Ń‹Ń‚Ń‹Ń… ĐżĐ»Đ°Ń‚ĐµĐ¶ĐµĐą. Đ¦ĐµĐ˝Đ° Đ˛ĐşĐ»ŃŽŃ‡Đ°ĐµŃ‚ Đ˛ĐµŃŃŚ ĐľĐżŃ‹Ń‚ â€” ĐľŃ‚ ĐżŃ€Đ¸Đ˛ĐµŃ‚ŃŃ‚Đ˛Đ¸ŃŹ Đ´Đľ ĐżŃ€ĐľŃ‰Đ°Đ»ŃŚĐ˝ĐľĐłĐľ Ń‡Đ°ŃŹ.' },
      faq:  { ey:'FAQ',               ti:'Đ§Đ°ŃŃ‚Ń‹Đµ Đ˛ĐľĐżŃ€ĐľŃŃ‹',                     ds:'' },
      cta:  { ti:'Đ“ĐľŃ‚ĐľĐ˛Ń‹ Ń€Đ°ŃŃĐ»Đ°Đ±Đ¸Ń‚ŃŚŃŃŹ?', ds:'Đ—Đ°Đ±Ń€ĐľĐ˝Đ¸Ń€ŃĐąŃ‚Đµ ĐĽĐ°ŃŃĐ°Đ¶ ŃĐµĐłĐľĐ´Đ˝ŃŹ Đ¸ ŃĐ´ĐµĐ»Đ¸Ń‚Đµ Đ˛Ń€ĐµĐĽŃŹ ŃĐµĐ±Đµ.', btn:'Đ—Đ°Đ±Ń€ĐľĐ˝Đ¸Ń€ĐľĐ˛Đ°Ń‚ŃŚ ĐľĐ˝Đ»Đ°ĐąĐ˝' },
      mas_all: 'Đ’ŃĐµ ĐĽĐ°ŃŃĐ°Đ¶Đ¸ŃŃ‚ĐşĐ¸ â†’',
      svc_all: 'ĐźĐľĐ»Đ˝Ń‹Đą ĐżŃ€Đ°ĐąŃ-Đ»Đ¸ŃŃ‚',
    },
    proc: [
      { ti:'ĐžĐ˝Đ»Đ°ĐąĐ˝-Đ±Ń€ĐľĐ˝Đ¸Ń€ĐľĐ˛Đ°Đ˝Đ¸Đµ', tx:'Đ’Ń‹Đ±ĐµŃ€Đ¸Ń‚Đµ ĐĽĐ°ŃŃĐ°Đ¶, ĐĽĐ°ŃŃĐ°Đ¶Đ¸ŃŃ‚ĐşŃ Đ¸ Đ˛Ń€ĐµĐĽŃŹ â€” Đ˛ Đ»ŃŽĐ±ĐľĐµ Đ˛Ń€ĐµĐĽŃŹ Ń‡ĐµŃ€ĐµĐ· Đ˝Đ°ŃŃ ŃĐ¸ŃŃ‚ĐµĐĽŃ.' },
      { ti:'ĐźŃ€Đ¸Đ˛ĐµŃ‚ŃŃ‚Đ˛Đ¸Đµ',         tx:'ĐźĐľ ĐżŃ€Đ¸Đ±Ń‹Ń‚Đ¸Đ¸ Đ˛ŃŃ‚Ń€ĐµŃ‚Đ¸ĐĽ Đ˛Đ°Ń Ń‡Đ°ĐµĐĽ Đ¸ ĐľĐ±ŃŃĐ´Đ¸ĐĽ Đ˛Đ°ŃĐ¸ ĐżĐľĐ¶ĐµĐ»Đ°Đ˝Đ¸ŃŹ Đ¸ ĐżĐľŃ‚Ń€ĐµĐ±Đ˝ĐľŃŃ‚Đ¸.' },
      { ti:'Đ’Đ°Ń ĐĽĐ°ŃŃĐ°Đ¶',          tx:'ĐśĐ°ŃŃĐ°Đ¶Đ¸ŃŃ‚ĐşĐ° ĐżĐľĐ·Đ°Đ±ĐľŃ‚Đ¸Ń‚ŃŃŹ Đľ Đ˛Đ°Ń Đ˛ ĐżŃ€Đ¸Đ˛Đ°Ń‚Đ˝ĐľĐĽ, Đ°Ń€ĐľĐĽĐ°Ń‚Đ˝ĐľĐĽ ĐżŃ€ĐľŃŃ‚Ń€Đ°Đ˝ŃŃ‚Đ˛Đµ.' },
      { ti:'ĐžŃ‚Đ´Ń‹Ń…',               tx:'ĐźĐľŃĐ»Đµ ĐĽĐ°ŃŃĐ°Đ¶Đ° Ń€Đ°ŃŃĐ»Đ°Đ±ŃŚŃ‚ĐµŃŃŚ Đ˛ Đ·ĐľĐ˝Đµ Ń€ĐµĐ»Đ°ĐşŃĐ°Ń†Đ¸Đ¸ â€” ĐżŃ€ĐľĐ´Đ»Đ¸Ń‚Đµ ŃĐ˛ĐľŃ‘ ŃĐ´ĐľĐ˛ĐľĐ»ŃŚŃŃ‚Đ˛Đ¸Đµ.' },
    ],
    faq: [
      { q:'ĐšĐ°Đş ĐżĐľĐ´ĐłĐľŃ‚ĐľĐ˛Đ¸Ń‚ŃŚŃŃŹ Đş ĐĽĐ°ŃŃĐ°Đ¶Ń?',         a:'Đ ĐµĐşĐľĐĽĐµĐ˝Đ´ŃĐµĐĽ ĐżŃ€Đ¸ĐąŃ‚Đ¸ Đ·Đ° 10 ĐĽĐ¸Đ˝ŃŃ‚. ĐĐ·Đ±ĐµĐłĐ°ĐąŃ‚Đµ Đ°Đ»ĐşĐľĐłĐľĐ»ŃŹ ĐĽĐ¸Đ˝Đ¸ĐĽŃĐĽ Đ·Đ° 4 Ń‡Đ°ŃĐ°. ĐśĐ°ŃŃĐ°Đ¶ ĐżŃ€ĐľĐ˛ĐľĐ´Đ¸Ń‚ŃŃŹ Đ˝Đ° ŃĐżĐµŃ†Đ¸Đ°Đ»ŃŚĐ˝ĐľĐĽ ŃŃ‚ĐľĐ»Đµ Ń Đ±ĐµĐ»ŃŚŃ‘ĐĽ â€” Đ˛ŃĐµĐłĐ´Đ° ĐżŃ€Đ¸Đ˛Đ°Ń‚Đ˝Đľ Đ¸ Ń ŃĐ˛Đ°Đ¶ĐµĐ˝Đ¸ĐµĐĽ.' },
      { q:'ĐťŃĐ¶Đ˝Đľ Đ»Đ¸ Đ±Ń€ĐľĐ˝Đ¸Ń€ĐľĐ˛Đ°Ń‚ŃŚ Đ·Đ°Ń€Đ°Đ˝ĐµĐµ?',        a:'Đ”Đ°, Đ±Ń€ĐľĐ˝Đ¸Ń€ĐľĐ˛Đ°Đ˝Đ¸Đµ ĐľĐ±ŃŹĐ·Đ°Ń‚ĐµĐ»ŃŚĐ˝Đľ. ĐśĐµŃŃ‚Đ° ĐľĐłŃ€Đ°Đ˝Đ¸Ń‡ĐµĐ˝Ń‹, Đ¸ ĐĽŃ‹ Ń…ĐľŃ‚Đ¸ĐĽ ĐľĐ±ĐµŃĐżĐµŃ‡Đ¸Ń‚ŃŚ Đ˛Đ°ĐĽ ĐżŃ€ĐµĐ´ĐżĐľŃ‡Ń‚Đ¸Ń‚ĐµĐ»ŃŚĐ˝ĐľĐµ Đ˛Ń€ĐµĐĽŃŹ Đ¸ ĐĽĐ°ŃŃĐ°Đ¶Đ¸ŃŃ‚ĐşŃ.' },
      { q:'ĐšĐ°ĐşĐ¸Đµ ŃĐżĐľŃĐľĐ±Ń‹ ĐľĐżĐ»Đ°Ń‚Ń‹ Đ´ĐľŃŃ‚ŃĐżĐ˝Ń‹?',       a:'ĐźŃ€Đ¸Đ˝Đ¸ĐĽĐ°ĐµĐĽ Đ˝Đ°Đ»Đ¸Ń‡Đ˝Ń‹Đµ, ĐşĐ°Ń€Ń‚Ń‹ (Visa, Mastercard) Đ¸ Đ±Đ°Đ˝ĐşĐľĐ˛ŃĐşĐ¸Đµ ĐżĐµŃ€ĐµĐ˛ĐľĐ´Ń‹. ĐžĐżĐ»Đ°Ń‚Đ° ĐżĐľŃĐ»Đµ ĐĽĐ°ŃŃĐ°Đ¶Đ° ĐżĐµŃ€ĐµĐ´ ŃŃ…ĐľĐ´ĐľĐĽ.' },
      { q:'ĐśĐľĐ¶Đ˝Đľ ĐżŃ€Đ¸ĐąŃ‚Đ¸ Đ˛Đ´Đ˛ĐľŃ‘ĐĽ Đ˝Đ° ĐżĐ°Ń€Đ˝Ń‹Đą ĐĽĐ°ŃŃĐ°Đ¶?', a:'ĐšĐľĐ˝ĐµŃ‡Đ˝Đľ! ĐźĐ°Ń€Đ˝Ń‹Đą ĐĽĐ°ŃŃĐ°Đ¶ â€” ĐľĐ´Đ˝Đ° Đ¸Đ· ŃĐ°ĐĽŃ‹Ń… ĐżĐľĐżŃĐ»ŃŹŃ€Đ˝Ń‹Ń… ŃŃĐ»ŃĐł. ĐžĐ±Đµ ĐĽĐ°ŃŃĐ°Đ¶Đ¸ŃŃ‚ĐşĐ¸ Ń€Đ°Đ±ĐľŃ‚Đ°ŃŽŃ‚ Đ˛ ĐľĐ´Đ˝ĐľĐĽ ĐşĐ°Đ±Đ¸Đ˝ĐµŃ‚Đµ ĐľĐ´Đ˝ĐľĐ˛Ń€ĐµĐĽĐµĐ˝Đ˝Đľ.' },
      { q:'Đ§Ń‚Đľ Đ˛ĐşĐ»ŃŽŃ‡ĐµĐ˝Đľ Đ˛ ŃŃ‚ĐľĐ¸ĐĽĐľŃŃ‚ŃŚ?',            a:'Đ¦ĐµĐ˝Đ° Đ˛ĐşĐ»ŃŽŃ‡Đ°ĐµŃ‚ ĐĽĐ°ŃŃĐ°Đ¶, ĐżŃ€ĐµĐĽĐ¸Đ°Đ»ŃŚĐ˝Ń‹Đµ ĐĽĐ°ŃĐ»Đ°, ĐżĐľĐ´ĐľĐłŃ€ĐµŃ‚ĐľĐµ Đ±ĐµĐ»ŃŚŃ‘ Đ¸ Đ´ĐľŃŃ‚ŃĐż Đ˛ Đ·ĐľĐ˝Ń Ń€ĐµĐ»Đ°ĐşŃĐ°Ń†Đ¸Đ¸ Ń Ń‚Ń€Đ°Đ˛ŃŹĐ˝Ń‹ĐĽ Ń‡Đ°ĐµĐĽ.' },
      { q:'ĐśĐľĐ¶Đ˝Đľ Đ·Đ°ĐşĐ°Đ·Đ°Ń‚ŃŚ ĐĽĐ°ŃŃĐ°Đ¶ Đ˛ ĐżĐľĐ´Đ°Ń€ĐľĐş?',     a:'Đ”Đ°! ĐźĐľĐ´Đ°Ń€ĐľŃ‡Đ˝Ń‹Đµ ŃĐµŃ€Ń‚Đ¸Ń„Đ¸ĐşĐ°Ń‚Ń‹ Đ˝Đ° Đ»ŃŽĐ±ŃŃŽ ŃŃĐĽĐĽŃ Đ¸Đ»Đ¸ ĐşĐľĐ˝ĐşŃ€ĐµŃ‚Đ˝Ń‹Đą Đ˛Đ¸Đ´ ĐĽĐ°ŃŃĐ°Đ¶Đ°. ĐˇĐ˛ŃŹĐ¶Đ¸Ń‚ĐµŃŃŚ Ń Đ˝Đ°ĐĽĐ¸ ĐżĐľ e-mail.' },
    ],
    prices: {
      ti:'Đ¦ĐµĐ˝Ń‹ Đ˝Đ° ĐĽĐ°ŃŃĐ°Đ¶Đ¸ â€” Black Elixir Spa', ds:'ĐźŃ€ĐµĐĽĐ¸Đ°Đ»ŃŚĐ˝Ń‹Đµ ĐĽĐ°ŃŃĐ°Đ¶Đ¸ Đ˛ ŃŤĐ»ĐµĐłĐ°Đ˝Ń‚Đ˝ĐľĐą ĐľĐ±ŃŃ‚Đ°Đ˝ĐľĐ˛ĐşĐµ. Đ’ŃĐµ Ń†ĐµĐ˝Ń‹ Đ˛ CZK.',
      th_svc:'ĐśĐ°ŃŃĐ°Đ¶', th_dur:'Đ”Đ»Đ¸Ń‚ĐµĐ»ŃŚĐ˝ĐľŃŃ‚ŃŚ', th_pr:'Đ¦ĐµĐ˝Đ°',
      inc_ti:'Đ§Ń‚Đľ Đ˛ĐşĐ»ŃŽŃ‡ĐµĐ˝Đľ', inc_items:['ĐźŃ€ĐµĐĽĐ¸Đ°Đ»ŃŚĐ˝Ń‹Đµ ĐĽĐ°ŃĐ»Đ°','ĐźĐľĐ´ĐľĐłŃ€ĐµŃ‚ĐľĐµ Đ±ĐµĐ»ŃŚŃ‘','Đ˘Ń€Đ°Đ˛ŃŹĐ˝ĐľĐą Ń‡Đ°Đą','ĐźŃ€Đ¸Đ˛Đ°Ń‚Đ˝Ń‹Đą ĐşĐ°Đ±Đ¸Đ˝ĐµŃ‚','Đ—ĐľĐ˝Đ° Ń€ĐµĐ»Đ°ĐşŃĐ°Ń†Đ¸Đ¸ ĐżĐľŃĐ»Đµ ĐĽĐ°ŃŃĐ°Đ¶Đ°'],
    },
    sched: {
      ti:'Đ Đ°ŃĐżĐ¸ŃĐ°Đ˝Đ¸Đµ ĐĽĐ°ŃŃĐ°Đ¶ĐµĐą', ds:'Đ˘ĐµĐşŃŃ‰Đ°ŃŹ Đ´ĐľŃŃ‚ŃĐżĐ˝ĐľŃŃ‚ŃŚ. ĐťĐ°Đ¶ĐĽĐ¸Ń‚Đµ Đ˝Đ° ŃĐ˛ĐľĐ±ĐľĐ´Đ˝Ń‹Đą ŃĐ»ĐľŃ‚ Đ´Đ»ŃŹ Đ±Ń€ĐľĐ˝Đ¸Ń€ĐľĐ˛Đ°Đ˝Đ¸ŃŹ.',
      all:'Đ’ŃĐµ ĐĽĐ°ŃŃĐ°Đ¶Đ¸ŃŃ‚ĐşĐ¸', avail:'ĐˇĐ˛ĐľĐ±ĐľĐ´Đ˝Đľ', booked:'Đ—Đ°Đ˝ŃŹŃ‚Đľ',
      days:['ĐźĐľĐ˝ĐµĐ´ĐµĐ»ŃŚĐ˝Đ¸Đş','Đ’Ń‚ĐľŃ€Đ˝Đ¸Đş','ĐˇŃ€ĐµĐ´Đ°','Đ§ĐµŃ‚Đ˛ĐµŃ€Đł','ĐźŃŹŃ‚Đ˝Đ¸Ń†Đ°','ĐˇŃĐ±Đ±ĐľŃ‚Đ°','Đ’ĐľŃĐşŃ€ĐµŃĐµĐ˝ŃŚĐµ'],
      daysS:['ĐźĐ˝','Đ’Ń‚','ĐˇŃ€','Đ§Ń‚','ĐźŃ‚','ĐˇĐ±','Đ’Ń'],
    },
    contacts: {
      ti:'ĐšĐľĐ˝Ń‚Đ°ĐşŃ‚ â€” Black Elixir Spa', ds:'ĐťĐ°ĐąĐ´Đ¸Ń‚Đµ Đ˝Đ°Ń Đ˛ ŃĐµŃ€Đ´Ń†Đµ ĐźŃ€Đ°ĐłĐ¸. Đ–Đ´Ń‘ĐĽ Đ˛Đ°ŃĐµĐłĐľ Đ˛Đ¸Đ·Đ¸Ń‚Đ°.',
      addr:'ĐĐ´Ń€ĐµŃ', addrV:'VĂˇclavskĂ© nĂˇmÄ›stĂ­ 12\nĐźŃ€Đ°ĐłĐ° 1, 110 00\nĐ§ĐµŃ…Đ¸ŃŹ',
      phone:'Đ˘ĐµĐ»ĐµŃ„ĐľĐ˝', phoneV:'+420 607 365 598',
      email:'E-mail',  emailV:'info@blackelixir.cz',
      hours:'Đ§Đ°ŃŃ‹ Ń€Đ°Đ±ĐľŃ‚Ń‹', hoursV:'Đ•Đ¶ĐµĐ´Đ˝ĐµĐ˛Đ˝Đľ Ń 9:00 Đ´Đľ 5:00 ŃŃ‚Ń€Đ°',
    },
    mas: {
      ti:'ĐťĐ°ŃĐ¸ ĐĽĐ°ŃŃĐ°Đ¶Đ¸ŃŃ‚ĐşĐ¸ â€” Black Elixir Spa', ds:'ĐžĐżŃ‹Ń‚Đ˝Ń‹Đµ ŃĐżĐµŃ†Đ¸Đ°Đ»Đ¸ŃŃ‚Ń‹ Ń ĐżŃ€ĐľŃ„ĐµŃŃĐ¸ĐľĐ˝Đ°Đ»ŃŚĐ˝Ń‹ĐĽ ĐżĐľĐ´Ń…ĐľĐ´ĐľĐĽ Đş ĐĽĐ°ŃŃĐ°Đ¶Ń Đ¸ Đ˛ĐµĐ»Đ˝ĐµŃŃ.',
      svcOf:'ĐźŃ€ĐµĐ´Đ»Đ°ĐłĐ°ĐµĐĽŃ‹Đµ ĐĽĐ°ŃŃĐ°Đ¶Đ¸', bookWith:'Đ—Đ°Đ±Ń€ĐľĐ˝Đ¸Ń€ĐľĐ˛Đ°Ń‚ŃŚ Ń',
      yearsExp:'Đ»ĐµŃ‚ ĐľĐżŃ‹Ń‚Đ°',
    },
    res: {
      ti:'Đ‘Ń€ĐľĐ˝Đ¸Ń€ĐľĐ˛Đ°Đ˝Đ¸Đµ ĐĽĐ°ŃŃĐ°Đ¶Đ°',
      steps:['ĐŁŃĐ»ŃĐłĐ°','ĐśĐ°ŃŃĐ°Đ¶Đ¸ŃŃ‚ĐşĐ°','Đ’Ń€ĐµĐĽŃŹ','ĐšĐľĐ˝Ń‚Đ°ĐşŃ‚Ń‹','Đ“ĐľŃ‚ĐľĐ˛Đľ'],
      selSvc:'Đ’Ń‹Đ±ĐµŃ€Đ¸Ń‚Đµ ĐĽĐ°ŃŃĐ°Đ¶', selMas:'Đ’Ń‹Đ±ĐµŃ€Đ¸Ń‚Đµ ĐĽĐ°ŃŃĐ°Đ¶Đ¸ŃŃ‚ĐşŃ', selDate:'Đ’Ń‹Đ±ĐµŃ€Đ¸Ń‚Đµ Đ´Đ°Ń‚Ń',
      selSlot:'Đ”ĐľŃŃ‚ŃĐżĐ˝ĐľĐµ Đ˛Ń€ĐµĐĽŃŹ',
      contactTi:'ĐšĐľĐ˝Ń‚Đ°ĐşŃ‚Đ˝Ń‹Đµ Đ´Đ°Đ˝Đ˝Ń‹Đµ',
      name:'ĐĐĽŃŹ Đ¸ Ń„Đ°ĐĽĐ¸Đ»Đ¸ŃŹ', email:'E-mail', phone:'Đ˘ĐµĐ»ĐµŃ„ĐľĐ˝',
      msg:'Đ—Đ°ĐĽĐµŃ‚ĐşĐ° (Đ˝ĐµĐľĐ±ŃŹĐ·Đ°Ń‚ĐµĐ»ŃŚĐ˝Đľ)', msgP:'ĐžŃĐľĐ±Ń‹Đµ ĐżĐľĐ¶ĐµĐ»Đ°Đ˝Đ¸ŃŹ Đ¸Đ»Đ¸ ĐżŃ€ĐľĐ±Đ»ĐµĐĽŃ‹ ŃĐľ Đ·Đ´ĐľŃ€ĐľĐ˛ŃŚĐµĐĽ?',
      confirm:'ĐźĐľĐ´Ń‚Đ˛ĐµŃ€Đ´Đ¸Ń‚ŃŚ Đ±Ń€ĐľĐ˝Đ¸Ń€ĐľĐ˛Đ°Đ˝Đ¸Đµ', next:'ĐźŃ€ĐľĐ´ĐľĐ»Đ¶Đ¸Ń‚ŃŚ', back:'ĐťĐ°Đ·Đ°Đ´',
      done:'Đ‘Ń€ĐľĐ˝Đ¸Ń€ĐľĐ˛Đ°Đ˝Đ¸Đµ ĐżĐľĐ´Ń‚Đ˛ĐµŃ€Đ¶Đ´ĐµĐ˝Đľ!',
      doneText:'ĐˇĐżĐ°ŃĐ¸Đ±Đľ! Đ’Đ°ŃĐµ Đ±Ń€ĐľĐ˝Đ¸Ń€ĐľĐ˛Đ°Đ˝Đ¸Đµ ŃŃĐżĐµŃĐ˝Đľ ĐľŃ‚ĐżŃ€Đ°Đ˛Đ»ĐµĐ˝Đľ. ĐźĐľĐ´Ń‚Đ˛ĐµŃ€Đ¶Đ´ĐµĐ˝Đ¸Đµ ĐżŃ€Đ¸Đ´Ń‘Ń‚ Đ˝Đ° Đ˛Đ°Ń e-mail.',
      again:'ĐťĐľĐ˛ĐľĐµ Đ±Ń€ĐľĐ˝Đ¸Ń€ĐľĐ˛Đ°Đ˝Đ¸Đµ',
      sum_svc:'ĐśĐ°ŃŃĐ°Đ¶', sum_mas:'ĐśĐ°ŃŃĐ°Đ¶Đ¸ŃŃ‚ĐşĐ°', sum_dt:'Đ’Ń€ĐµĐĽŃŹ', sum_dur:'Đ”Đ»Đ¸Ń‚ĐµĐ»ŃŚĐ˝ĐľŃŃ‚ŃŚ', sum_pr:'Đ¦ĐµĐ˝Đ°',
    },
    footer: {
      pages:'ĐˇŃ‚Ń€Đ°Đ˝Đ¸Ń†Ń‹', massages:'ĐśĐ°ŃŃĐ°Đ¶Đ¸', contact:'ĐšĐľĐ˝Ń‚Đ°ĐşŃ‚',
      tagline:'ĐźŃ€ĐµĐĽĐ¸Đ°Đ»ŃŚĐ˝Ń‹Đą ĐĽĐ°ŃŃĐ°Đ¶ Đ¸ Ń€ĐµĐ»Đ°ĐşŃĐ°Ń†Đ¸ŃŹ Đ˛ ŃĐµŃ€Đ´Ń†Đµ ĐźŃ€Đ°ĐłĐ¸.',
      rights:'Đ’ŃĐµ ĐżŃ€Đ°Đ˛Đ° Đ·Đ°Ń‰Đ¸Ń‰ĐµĐ˝Ń‹.', terms:'ĐŁŃĐ»ĐľĐ˛Đ¸ŃŹ', privacy:'ĐšĐľĐ˝Ń„Đ¸Đ´ĐµĐ˝Ń†Đ¸Đ°Đ»ŃŚĐ˝ĐľŃŃ‚ŃŚ',
    },
  },
};

/* â”€â”€ SERVICES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const SERVICES = [
  {
    id:1, slug:'vip-masaz',
    name:{ cs:'VIP masĂˇĹľ', en:'VIP Massage', ru:'VIP-ĐĽĐ°ŃŃĐ°Đ¶' },
    desc:{ cs:'VIP masĂˇĹľ s prĂ©miĂˇlnĂ­mi oleji, jemnĂ˝mi a hlubokĂ˝mi technikami pro celkovĂ© uvolnÄ›nĂ­ a luxusnĂ­ zĂˇĹľitek.', en:'VIP massage with premium oils, gentle and deep techniques for full relaxation and a luxurious experience.', ru:'VIP-ĐĽĐ°ŃŃĐ°Đ¶ Ń ĐżŃ€ĐµĐĽĐ¸Đ°Đ»ŃŚĐ˝Ń‹ĐĽĐ¸ ĐĽĐ°ŃĐ»Đ°ĐĽĐ¸, ĐĽŃŹĐłĐşĐ¸ĐĽĐ¸ Đ¸ ĐłĐ»ŃĐ±ĐľĐşĐ¸ĐĽĐ¸ Ń‚ĐµŃ…Đ˝Đ¸ĐşĐ°ĐĽĐ¸ Đ´Đ»ŃŹ ĐżĐľĐ»Đ˝ĐľĐłĐľ Ń€Đ°ŃŃĐ»Đ°Đ±Đ»ĐµĐ˝Đ¸ŃŹ Đ¸ Ń€ĐľŃĐşĐľŃĐ˝ĐľĐłĐľ ĐľĐżŃ‹Ń‚Đ°.' },
    duration:60, price:2500,
    img:'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&h=450&q=80',
    alt:'VIP masĂˇĹľ â€” Black Elixir Spa Praha',
  },
  {
    id:2, slug:'relaxacni-masaz',
    name:{ cs:'RelaxaÄŤnĂ­ masĂˇĹľ', en:'Relaxation Massage', ru:'Đ Đ°ŃŃĐ»Đ°Đ±Đ»ŃŹŃŽŃ‰Đ¸Đą ĐĽĐ°ŃŃĐ°Đ¶' },
    desc:{ cs:'RelaxaÄŤnĂ­ masĂˇĹľ s teplĂ˝mi oleji a jemnĂ˝mi hladivĂ˝mi hmaty pro hlubokou relaxaci a uvolnÄ›nĂ­ stresu.', en:'Relaxation massage with warm oils and gentle gliding strokes for deep relaxation and stress relief.', ru:'Đ Đ°ŃŃĐ»Đ°Đ±Đ»ŃŹŃŽŃ‰Đ¸Đą ĐĽĐ°ŃŃĐ°Đ¶ Ń Ń‚Ń‘ĐżĐ»Ń‹ĐĽĐ¸ ĐĽĐ°ŃĐ»Đ°ĐĽĐ¸ Đ¸ ĐĽŃŹĐłĐşĐ¸ĐĽĐ¸ ĐżĐľĐłĐ»Đ°Đ¶Đ¸Đ˛Đ°ŃŽŃ‰Đ¸ĐĽĐ¸ Đ´Đ˛Đ¸Đ¶ĐµĐ˝Đ¸ŃŹĐĽĐ¸ Đ´Đ»ŃŹ ĐłĐ»ŃĐ±ĐľĐşĐľĐą Ń€ĐµĐ»Đ°ĐşŃĐ°Ń†Đ¸Đ¸ Đ¸ ŃĐ˝ŃŹŃ‚Đ¸ŃŹ ŃŃ‚Ń€ĐµŃŃĐ°.' },
    duration:60, price:2000,
    img:'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=600&h=450&q=80',
    alt:'RelaxaÄŤnĂ­ masĂˇĹľ â€” Black Elixir Spa Praha',
  },
  {
    id:3, slug:'masaz-pro-zeny',
    name:{ cs:'MasĂˇĹľ pro Ĺľeny', en:'Massage for Women', ru:'ĐśĐ°ŃŃĐ°Đ¶ Đ´Đ»ŃŹ Đ¶ĐµĐ˝Ń‰Đ¸Đ˝' },
    desc:{ cs:'SpeciĂˇlnĂ­ masĂˇĹľ pro Ĺľeny kombinujĂ­cĂ­ jemnĂ© a hlubokĂ© techniky pro harmonizaci tÄ›la a pocit pĂ©ÄŤe.', en:'Special massage for women combining gentle and deep techniques for body harmony and a feeling of care.', ru:'ĐžŃĐľĐ±Ń‹Đą ĐĽĐ°ŃŃĐ°Đ¶ Đ´Đ»ŃŹ Đ¶ĐµĐ˝Ń‰Đ¸Đ˝, ŃĐľŃ‡ĐµŃ‚Đ°ŃŽŃ‰Đ¸Đą Đ˝ĐµĐ¶Đ˝Ń‹Đµ Đ¸ ĐłĐ»ŃĐ±ĐľĐşĐ¸Đµ Ń‚ĐµŃ…Đ˝Đ¸ĐşĐ¸ Đ´Đ»ŃŹ ĐłĐ°Ń€ĐĽĐľĐ˝Đ¸Đ·Đ°Ń†Đ¸Đ¸ Ń‚ĐµĐ»Đ° Đ¸ ĐľŃ‰ŃŃ‰ĐµĐ˝Đ¸ŃŹ Đ·Đ°Đ±ĐľŃ‚Ń‹.' },
    duration:60, price:4000,
    img:'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=600&h=450&q=80',
    alt:'MasĂˇĹľ pro Ĺľeny â€” Black Elixir Spa Praha',
  },
  {
    id:5, slug:'masaz-pro-pary',
    name:{ cs:'MasĂˇĹľ pro pĂˇry', en:'Couples Massage', ru:'ĐśĐ°ŃŃĐ°Đ¶ Đ´Đ»ŃŹ ĐżĐ°Ń€' },
    desc:{ cs:'MasĂˇĹľ pro pĂˇry â€” obÄ› masĂ©rky pracujĂ­ synchronizovanÄ› v jednom soukromĂ©m pokoji. LuxusnĂ­ spoleÄŤnĂ˝ zĂˇĹľitek.', en:'Couples massage â€” both masseuses work synchronised in one private room. A luxurious shared experience.', ru:'ĐśĐ°ŃŃĐ°Đ¶ Đ´Đ»ŃŹ ĐżĐ°Ń€ â€” Đ´Đ˛Đµ ĐĽĐ°ŃŃĐ°Đ¶Đ¸ŃŃ‚ĐşĐ¸ Ń€Đ°Đ±ĐľŃ‚Đ°ŃŽŃ‚ ŃĐ¸Đ˝Ń…Ń€ĐľĐ˝Đ˝Đľ Đ˛ ĐľĐ´Đ˝ĐľĐĽ ĐżŃ€Đ¸Đ˛Đ°Ń‚Đ˝ĐľĐĽ ĐşĐ°Đ±Đ¸Đ˝ĐµŃ‚Đµ. Đ ĐľŃĐşĐľŃĐ˝Ń‹Đą ŃĐľĐ˛ĐĽĐµŃŃ‚Đ˝Ń‹Đą ĐľĐżŃ‹Ń‚.' },
    duration:60, price:1900,
    img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&h=450&q=80',
    alt:'MasĂˇĹľ pro pĂˇry â€” Black Elixir Spa Praha',
  },
];

/* â”€â”€ MASSEUSES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const MASSEUSES = [
  {
    id:1, slug:'elena',
    name:'Elena', surname:'NovĂˇkovĂˇ',
    spec:{ cs:'Ĺ vĂ©dskĂˇ & KlasickĂˇ masĂˇĹľ', en:'Swedish & Classic Massage', ru:'Đ¨Đ˛ĐµĐ´ŃĐşĐ¸Đą & ĐšĐ»Đ°ŃŃĐ¸Ń‡ĐµŃĐşĐ¸Đą ĐĽĐ°ŃŃĐ°Đ¶' },
    bio:{
      cs:'Elena je zkuĹˇenĂˇ masĂ©rka s 8 lety praxe ve ĹˇvĂ©dskĂ© a klasickĂ© masĂˇĹľi. Vystudovala fyzioterapii na KarlovÄ› UniverzitÄ› a specializuje se na uvolĹovĂˇnĂ­ chronickĂ©ho svalovĂ©ho napÄ›tĂ­ a stresovĂ˝ch uzlĹŻ. JejĂ­ prĂˇce je pĹ™esnĂˇ, intuitivnĂ­ a pĹ™izpĹŻsobenĂˇ individuĂˇlnĂ­m potĹ™ebĂˇm kaĹľdĂ©ho klienta. Elena vÄ›Ĺ™Ă­, Ĺľe masĂˇĹľ nenĂ­ jen fyzickĂ˝ zĂˇĹľitek, ale i cesta k celkovĂ© duĹˇevnĂ­ rovnovĂˇze a vnitĹ™nĂ­ harmonii.',
      en:'Elena is an experienced massage therapist with 8 years of practice in Swedish and classic massage. She studied physiotherapy at Charles University and specialises in releasing chronic muscle tension and stress knots. Her approach is precise, intuitive and tailored to each client\'s individual needs. Elena believes massage is not just a physical experience, but also a path to mental balance and inner harmony.',
      ru:'Đ•Đ»ĐµĐ˝Đ° â€” ĐľĐżŃ‹Ń‚Đ˝Ń‹Đą ĐĽĐ°ŃŃĐ°Đ¶Đ¸ŃŃ‚ Ń 8-Đ»ĐµŃ‚Đ˝ĐµĐą ĐżŃ€Đ°ĐşŃ‚Đ¸ĐşĐľĐą Đ˛ ĐľĐ±Đ»Đ°ŃŃ‚Đ¸ ŃĐ˛ĐµĐ´ŃĐşĐľĐłĐľ Đ¸ ĐşĐ»Đ°ŃŃĐ¸Ń‡ĐµŃĐşĐľĐłĐľ ĐĽĐ°ŃŃĐ°Đ¶Đ°. ĐžĐ˝Đ° Đ¸Đ·ŃŃ‡Đ°Đ»Đ° Ń„Đ¸Đ·Đ¸ĐľŃ‚ĐµŃ€Đ°ĐżĐ¸ŃŽ Đ˛ ĐšĐ°Ń€Đ»ĐľĐ˛ĐľĐĽ ŃĐ˝Đ¸Đ˛ĐµŃ€ŃĐ¸Ń‚ĐµŃ‚Đµ Đ¸ ŃĐżĐµŃ†Đ¸Đ°Đ»Đ¸Đ·Đ¸Ń€ŃĐµŃ‚ŃŃŹ Đ˝Đ° ŃĐ˝ŃŹŃ‚Đ¸Đ¸ Ń…Ń€ĐľĐ˝Đ¸Ń‡ĐµŃĐşĐľĐłĐľ ĐĽŃ‹ŃĐµŃ‡Đ˝ĐľĐłĐľ Đ˝Đ°ĐżŃ€ŃŹĐ¶ĐµĐ˝Đ¸ŃŹ. Đ•Ń‘ ĐżĐľĐ´Ń…ĐľĐ´ Ń‚ĐľŃ‡ĐµĐ˝, Đ¸Đ˝Ń‚ŃĐ¸Ń‚Đ¸Đ˛ĐµĐ˝ Đ¸ Đ°Đ´Đ°ĐżŃ‚Đ¸Ń€ĐľĐ˛Đ°Đ˝ Đş Đ¸Đ˝Đ´Đ¸Đ˛Đ¸Đ´ŃĐ°Đ»ŃŚĐ˝Ń‹ĐĽ ĐżĐľŃ‚Ń€ĐµĐ±Đ˝ĐľŃŃ‚ŃŹĐĽ ĐşĐ°Đ¶Đ´ĐľĐłĐľ ĐşĐ»Đ¸ĐµĐ˝Ń‚Đ°.',
    },
    img:'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=500&h=667&q=80',
    alt:'Elena NovĂˇkovĂˇ â€” masĂ©rka Black Elixir Spa Praha',
    services:[1,2,5], exp:8,
    tags:{ cs:['Ĺ vĂ©dskĂˇ masĂˇĹľ','KlasickĂˇ masĂˇĹľ','Anti-stress'], en:['Swedish','Classic','Anti-stress'], ru:['Đ¨Đ˛ĐµĐ´ŃĐşĐ¸Đą','ĐšĐ»Đ°ŃŃĐ¸Ń‡ĐµŃĐşĐ¸Đą','ĐĐ˝Ń‚Đ¸ŃŃ‚Ń€ĐµŃŃ'] },
  },
  {
    id:2, slug:'lucie',
    name:'Lucie', surname:'ProchĂˇzkovĂˇ',
    spec:{ cs:'ThajskĂˇ & ReflexnĂ­ masĂˇĹľ', en:'Thai & Reflexology', ru:'Đ˘Đ°ĐąŃĐşĐ¸Đą & Đ ĐµŃ„Đ»ĐµĐşŃĐľĐ»ĐľĐłĐ¸ŃŹ' },
    bio:{
      cs:'Lucie absolvovala vĂ˝cvik tradiÄŤnĂ­ thajskĂ© masĂˇĹľe v Chiang Mai, Thajsko, kde strĂˇvila rok studiem u mĂ­stnĂ­ch mistrĹŻ. Po nĂˇvratu do Prahy se specializuje na kombinaci thajskĂ˝ch technik s reflexnĂ­ masĂˇĹľĂ­ chodidel. JejĂ­ masĂˇĹľe jsou energetickĂ©, revitalizaÄŤnĂ­ a ideĂˇlnĂ­ pro ty, kteĹ™Ă­ hledajĂ­ hlubokou fyzickou i energetickou rovnovĂˇhu. Lucie je pĹ™esvÄ›dÄŤenĂˇ, Ĺľe sprĂˇvnĂˇ masĂˇĹľ probudĂ­ tÄ›lo zevnitĹ™.',
      en:'Lucie trained in traditional Thai massage in Chiang Mai, Thailand, spending a year studying under local masters. Back in Prague she specialises in combining Thai techniques with foot reflexology. Her massages are energetic and revitalising â€” ideal for those seeking deep physical and energetic balance. Lucie believes the right massage awakens the body from within.',
      ru:'Đ›ŃŃ†Đ¸ŃŹ ĐżŃ€ĐľŃĐ»Đ° ĐżĐľĐ´ĐłĐľŃ‚ĐľĐ˛ĐşŃ ĐżĐľ Ń‚Ń€Đ°Đ´Đ¸Ń†Đ¸ĐľĐ˝Đ˝ĐľĐĽŃ Ń‚Đ°ĐąŃĐşĐľĐĽŃ ĐĽĐ°ŃŃĐ°Đ¶Ń Đ˛ Đ§Đ¸Đ°Đ˝ĐłĐĽĐ°Đµ, Đ˘Đ°Đ¸Đ»Đ°Đ˝Đ´, ĐłĐ´Đµ ĐżŃ€ĐľĐ˛ĐµĐ»Đ° ĐłĐľĐ´, ĐľĐ±ŃŃ‡Đ°ŃŹŃŃŚ Ń ĐĽĐµŃŃ‚Đ˝Ń‹Ń… ĐĽĐ°ŃŃ‚ĐµŃ€ĐľĐ˛. Đ•Ń‘ ĐĽĐ°ŃŃĐ°Đ¶Đ¸ ŃŤĐ˝ĐµŃ€ĐłĐ¸Ń‡Đ˝Ń‹ Đ¸ Ń€ĐµĐ˛Đ¸Ń‚Đ°Đ»Đ¸Đ·Đ¸Ń€ŃŃŽŃ‰Đ¸Đµ â€” Đ¸Đ´ĐµĐ°Đ»ŃŚĐ˝Đľ Đ´Đ»ŃŹ ĐłĐ»ŃĐ±ĐľĐşĐľĐłĐľ Ń„Đ¸Đ·Đ¸Ń‡ĐµŃĐşĐľĐłĐľ Đ¸ ŃŤĐ˝ĐµŃ€ĐłĐµŃ‚Đ¸Ń‡ĐµŃĐşĐľĐłĐľ Đ±Đ°Đ»Đ°Đ˝ŃĐ°.',
    },
    img:'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=500&h=667&q=80',
    alt:'Lucie ProchĂˇzkovĂˇ â€” masĂ©rka Black Elixir Spa Praha',
    services:[2], exp:5,
    tags:{ cs:['ThajskĂˇ masĂˇĹľ','Reflexologie','EnergetickĂˇ'], en:['Thai','Reflexology','Energy'], ru:['Đ˘Đ°ĐąŃĐşĐ¸Đą','Đ ĐµŃ„Đ»ĐµĐşŃĐľĐ»ĐľĐłĐ¸ŃŹ','Đ­Đ˝ĐµŃ€ĐłĐµŃ‚Đ¸Ń‡ĐµŃĐşĐ¸Đą'] },
  },
  {
    id:3, slug:'natalia',
    name:'NatĂˇlia', surname:'HorvĂˇth',
    spec:{ cs:'Aromaterapie & RelaxaÄŤnĂ­ masĂˇĹľ', en:'Aromatherapy & Relaxation', ru:'ĐŃ€ĐľĐĽĐ°Ń‚ĐµŃ€Đ°ĐżĐ¸ŃŹ & Đ ĐµĐ»Đ°ĐşŃĐ°Ń†Đ¸ŃŹ' },
    bio:{
      cs:'NatĂˇlia je specialistka na aromaterapii a relaxaÄŤnĂ­ masĂˇĹľe s rozsĂˇhlĂ˝mi znalostmi Ă©terickĂ˝ch olejĹŻ. OsobnÄ› vybĂ­rĂˇ a kombinuje Ă©terickĂ© oleje pro kaĹľdĂ©ho klienta individuĂˇlnÄ›. JejĂ­ pomalĂ˝, meditativnĂ­ pĹ™Ă­stup navozuje hlubokĂ˝ stav klidu a obnovy. NatĂˇlia pracuje i s klienty se stresem, ĂşzkostĂ­ a poruchami spĂˇnku a vnĂ­mĂˇ masĂˇĹľ jako holistickĂ˝ nĂˇstroj pĂ©ÄŤe.',
      en:'NatĂˇlia specialises in aromatherapy and relaxation massage with extensive knowledge of essential oils. She personally selects and blends essential oils for each client. Her slow, meditative approach creates a deep state of calm and renewal. NatĂˇlia also works with clients dealing with stress, anxiety and sleep disorders.',
      ru:'ĐťĐ°Ń‚Đ°Đ»ŃŚŃŹ ŃĐżĐµŃ†Đ¸Đ°Đ»Đ¸Đ·Đ¸Ń€ŃĐµŃ‚ŃŃŹ Đ˝Đ° Đ°Ń€ĐľĐĽĐ°Ń‚ĐµŃ€Đ°ĐżĐ¸Đ¸ Đ¸ Ń€Đ°ŃŃĐ»Đ°Đ±Đ»ŃŹŃŽŃ‰Đ¸Ń… ĐĽĐ°ŃŃĐ°Đ¶Đ°Ń… Đ¸ ĐľĐ±Đ»Đ°Đ´Đ°ĐµŃ‚ ĐľĐ±ŃĐ¸Ń€Đ˝Ń‹ĐĽĐ¸ Đ·Đ˝Đ°Đ˝Đ¸ŃŹĐĽĐ¸ Đ˛ ĐľĐ±Đ»Đ°ŃŃ‚Đ¸ ŃŤŃ„Đ¸Ń€Đ˝Ń‹Ń… ĐĽĐ°ŃĐµĐ». ĐžĐ˝Đ° Đ»Đ¸Ń‡Đ˝Đľ ĐżĐľĐ´Đ±Đ¸Ń€Đ°ĐµŃ‚ Đ¸ ŃĐĽĐµŃĐ¸Đ˛Đ°ĐµŃ‚ ŃŤŃ„Đ¸Ń€Đ˝Ń‹Đµ ĐĽĐ°ŃĐ»Đ° Đ´Đ»ŃŹ ĐşĐ°Đ¶Đ´ĐľĐłĐľ ĐşĐ»Đ¸ĐµĐ˝Ń‚Đ°.',
    },
    img:'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&h=667&q=80',
    alt:'NatĂˇlia HorvĂˇth â€” masĂ©rka Black Elixir Spa Praha',
    services:[1,3,5], exp:6,
    tags:{ cs:['Aromaterapie','RelaxaÄŤnĂ­','Anti-stress'], en:['Aromatherapy','Relaxation','Anti-stress'], ru:['ĐŃ€ĐľĐĽĐ°Ń‚ĐµŃ€Đ°ĐżĐ¸ŃŹ','Đ Đ°ŃŃĐ»Đ°Đ±Đ»ŃŹŃŽŃ‰Đ¸Đą','ĐĐ˝Ń‚Đ¸ŃŃ‚Ń€ĐµŃŃ'] },
  },
  {
    id:4, slug:'klara',
    name:'KlĂˇra', surname:'DvoĹ™ĂˇÄŤkovĂˇ',
    spec:{ cs:'Deep Tissue & LymfatickĂˇ masĂˇĹľ', en:'Deep Tissue & Lymphatic Massage', ru:'Đ“Đ»ŃĐ±ĐľĐşĐ¸Đą ĐĽĐ°ŃŃĐ°Đ¶ & Đ›Đ¸ĐĽŃ„ĐľĐ´Ń€ĐµĐ˝Đ°Đ¶' },
    bio:{
      cs:'KlĂˇra je zkuĹˇenĂˇ terapeutka specializovanĂˇ na hlubokou tkĂˇĹovou masĂˇĹľ a lymfatickĂ© techniky. Vystudovala masĂ©rskĂ© umÄ›nĂ­ ve VĂ­dni a absolvovala pokroÄŤilĂ© kurzy v Praze a BerlĂ­nÄ›. JejĂ­ pĹ™Ă­stup kombinuje hlubokĂ© tlakovĂ© techniky s lymfatickĂ˝mi prvky pro maximĂˇlnĂ­ uvolnÄ›nĂ­ svalĹŻ a zlepĹˇenĂ­ cirkulace. KlĂˇra mĂˇ 10 let praxe a patĹ™Ă­ k nejzkuĹˇenÄ›jĹˇĂ­m ÄŤlenkĂˇm tĂ˝mu.',
      en:'KlĂˇra is an experienced therapist specialising in deep tissue massage and lymphatic techniques. She studied massage in Vienna and completed advanced courses in Prague and Berlin. Her approach combines deep pressure techniques with lymphatic elements for maximum muscle release and improved circulation. With 10 years of practice, KlĂˇra is the most experienced member of the team.',
      ru:'ĐšĐ»Đ°Ń€Đ° â€” ĐľĐżŃ‹Ń‚Đ˝Ń‹Đą Ń‚ĐµŃ€Đ°ĐżĐµĐ˛Ń‚, ŃĐżĐµŃ†Đ¸Đ°Đ»Đ¸Đ·Đ¸Ń€ŃŃŽŃ‰Đ¸ĐąŃŃŹ Đ˝Đ° ĐłĐ»ŃĐ±ĐľĐşĐľŃ‚ĐşĐ°Đ˝Đ˝ĐľĐĽ Đ¸ Đ»Đ¸ĐĽŃ„ĐľĐ´Ń€ĐµĐ˝Đ°Đ¶Đ˝ĐľĐĽ ĐĽĐ°ŃŃĐ°Đ¶Đµ. ĐžĐ˝Đ° Đ¸Đ·ŃŃ‡Đ°Đ»Đ° ĐĽĐ°ŃŃĐ°Đ¶ Đ˛ Đ’ĐµĐ˝Đµ Đ¸ ĐżŃ€ĐľŃĐ»Đ° ĐşŃŃ€ŃŃ‹ Đ˛ ĐźŃ€Đ°ĐłĐµ Đ¸ Đ‘ĐµŃ€Đ»Đ¸Đ˝Đµ. 10 Đ»ĐµŃ‚ ĐżŃ€Đ°ĐşŃ‚Đ¸ĐşĐ¸.',
    },
    img:'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=500&h=667&q=80',
    alt:'KlĂˇra DvoĹ™ĂˇÄŤkovĂˇ â€” masĂ©rka Black Elixir Spa Praha',
    services:[1], exp:10,
    tags:{ cs:['Deep tissue','LymfatickĂˇ'], en:['Deep Tissue','Lymphatic'], ru:['Đ“Đ»ŃĐ±ĐľĐşĐ¸Đą','Đ›Đ¸ĐĽŃ„ĐľĐ´Ń€ĐµĐ˝Đ°Đ¶'] },
  },
];

/* â”€â”€ SCHEDULE SLOTS (seeded, deterministic) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const TIMES = ['10:00','11:30','13:00','14:30','16:00','17:30','19:00'];
function srand(seed){ const x = Math.sin(seed+1)*10000; return x - Math.floor(x); }
const SCHEDULE = (() => {
  const slots = []; let id = 1, seed = 77;
  MASSEUSES.forEach((mas, mi) => {
    for(let d = 0; d < 7; d++){
      if(mas.id === 1 && d === 6) continue;
      if(mas.id === 2 && d === 0) continue;
      TIMES.forEach((time, ti) => {
        seed++;
        if(srand(seed) > 0.42){
          const si = Math.floor(srand(seed+500) * mas.services.length);
          const svc = SERVICES.find(s => s.id === mas.services[si]);
          seed++;
          slots.push({ id: id++, mas, svc, day: d, time, booked: srand(seed+1000) > 0.52 });
        }
      });
    }
  });
  return slots;
})();

Object.assign(window, { T, SERVICES, MASSEUSES, SCHEDULE, TIMES });
