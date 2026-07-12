/* ============================================================
   BLACK ELIXIR SPA — DATA LAYER
   Translations (CS / EN / RU) + sample data
   ============================================================ */

const T = {
  cs: {
    nav: { home:'Domů', masseuses:'Masérky', schedule:'Rozvrh', prices:'Ceník', contacts:'Kontakt', reservation:'Rezervace' },
    hero: {
      eyebrow: 'Prémiová Spa Praha',
      line1: 'Masáže a', line2: 'relaxace',
      brand: 'Black Elixir',
      sub: 'Dopřejte si luxus profesionální masáže v soukromém, elegantním prostředí. Naše masérky pečují o vaše tělo i mysl.',
      cta: 'Rezervovat', cta2: 'Naše masáže',
      y: 'let zkušeností', c: 'spokojených klientů', m: 'masérky',
      next: 'Příští volný termín', today: 'Dnes, 19:00', nextMeta: 'Elena · Klasická masáž',
    },
    sec: {
      svc:  { ey:'Naše masáže',   ti:'Vyberte si masáž',            ds:'Nabízíme širokou škálu profesionálních masáží pro vaši relaxaci a regeneraci.' },
      mas:  { ey:'Náš tým',       ti:'Poznejte naše masérky',       ds:'Každá z našich masérek je zkušená odbornice s odborným přístupem ke svému oboru.' },
      proc: { ey:'Jak to funguje',ti:'Vaše cesta k relaxaci',       ds:'' },
      pr:   { ey:'Ceník',         ti:'Transparentní ceny',          ds:'Žádné skryté poplatky. Cena zahrnuje celý zážitek — od uvítání po závěrečný čaj.' },
      faq:  { ey:'FAQ',           ti:'Časté dotazy',                ds:'' },
      cta:  { ti:'Připraveni na relaxaci?', ds:'Rezervujte si masáž ještě dnes a věnujte čas sami sobě.', btn:'Rezervovat online' },
      mas_all: 'Všechny masérky →',
      svc_all: 'Zobrazit kompletní ceník',
    },
    proc: [
      { ti:'Rezervace online', tx:'Vyberte masáž, masérku a termín přes náš systém — kdykoliv, odkudkoliv.' },
      { ti:'Uvítání',          tx:'Po příchodu vás uvítáme čajem a krátce projdeme vaše přání a potřeby.' },
      { ti:'Vaše masáž',       tx:'Masérka se postará o vás v soukromém, vonném prostoru dle vašich přání.' },
      { ti:'Regenerace',       tx:'Po masáži si odpočiňte v relaxační zóně — prodloužte si svůj zážitek.' },
    ],
    faq: [
      { q:'Jak se připravit na masáž?',          a:'Doporučujeme přijít 10 minut před termínem. Nepijte alkohol alespoň 4 hodiny před masáží. Masáž se provádí na speciálním stole s prostěradlem — vždy v soukromí a s respektem.' },
      { q:'Je nutné rezervovat předem?',          a:'Ano, rezervace je povinná. Kapacita je omezená a rádi bychom vám zajistili váš preferovaný termín a masérku bez čekání.' },
      { q:'Jaké jsou platební možnosti?',         a:'Přijímáme hotovost, karty (Visa, Mastercard) i bankovní převod. Platba probíhá po masáži před odchodem.' },
      { q:'Mohu přijít s partnerem na párovou masáž?', a:'Samozřejmě! Párová masáž je jednou z nejoblíbenějších služeb. Obě masérky pracují ve stejném pokoji ve stejný čas.' },
      { q:'Co je zahrnuto v ceně masáže?',        a:'Cena zahrnuje masáž dle ceníku, prémiové masážní oleje, vyhřívané prostěradlo a přístup do relaxační zóny s bylinným čajem.' },
      { q:'Lze masáž objednat jako dárek?',       a:'Ano! Dárkové vouchery jsou k dispozici pro libovolnou hodnotu nebo konkrétní masáž. Kontaktujte nás e-mailem.' },
    ],
    prices: {
      ti:'Ceník masáží — Black Elixir Spa', ds:'Prémiové masáže v elegantním prostředí. Ceny jsou uvedeny v Kč.',
      th_svc:'Masáž', th_dur:'Délka', th_pr:'Cena',
      inc_ti:'Co je zahrnuto', inc_items:['Prémiové masážní oleje','Vyhřívané prostěradlo','Bylinný čaj','Soukromý pokoj','Relaxační zóna po masáži'],
    },
    sched: {
      ti:'Rozvrh masáží', ds:'Aktuální dostupnost. Klikněte na volný slot pro rezervaci.',
      all:'Všechny masérky', avail:'Volné', booked:'Obsazeno',
      days:['Pondělí','Úterý','Středa','Čtvrtek','Pátek','Sobota','Neděle'],
      daysS:['Po','Út','St','Čt','Pá','So','Ne'],
    },
    contacts: {
      ti:'Kontakt — Black Elixir Spa', ds:'Najdete nás v srdci Prahy. Těšíme se na vaši návštěvu.',
      addr:'Adresa', addrV:'Václavské náměstí 12\nPraha 1, 110 00\nČeská republika',
      phone:'Telefon', phoneV:'+420 777 123 456',
      email:'E-mail',  emailV:'info@blackelixir.cz',
      hours:'Otevírací hodiny', hoursV:'Denně od 9:00 do 5:00 ráno',
    },
    mas: {
      ti:'Naše masérky — Black Elixir Spa', ds:'Zkušené odbornice s odborným přístupem k masáži a wellbeingu.',
      svcOf:'Masáže, které nabízí', bookWith:'Rezervovat s',
      yearsExp:'let zkušeností',
    },
    res: {
      ti:'Rezervace masáže',
      steps:['Služba','Masérka','Termín','Kontakt','Potvrzení'],
      selSvc:'Vyberte masáž', selMas:'Vyberte masérku', selDate:'Vyberte datum',
      selSlot:'Dostupné časy',
      contactTi:'Kontaktní údaje',
      name:'Jméno a příjmení', email:'E-mail', phone:'Telefon',
      msg:'Poznámka (volitelné)', msgP:'Speciální přání nebo zdravotní omezení?',
      confirm:'Potvrdit rezervaci', next:'Pokračovat', back:'Zpět',
      done:'Rezervace potvrzena!',
      doneText:'Děkujeme! Vaše rezervace byla úspěšně odeslána. Potvrzení přijde na váš e-mail.',
      again:'Nová rezervace',
      sum_svc:'Masáž', sum_mas:'Masérka', sum_dt:'Termín', sum_dur:'Délka', sum_pr:'Cena',
    },
    footer: {
      pages:'Stránky', massages:'Masáže', contact:'Kontakt',
      tagline:'Prémiová masáž a relaxace v srdci Prahy.',
      rights:'Všechna práva vyhrazena.', terms:'Podmínky', privacy:'Soukromí',
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
      next: 'Next availability', today: 'Today, 19:00', nextMeta: 'Elena · Classic Massage',
    },
    sec: {
      svc:  { ey:'Our Massages',    ti:'Choose Your Massage',          ds:'We offer a wide range of professional massages for your relaxation and rejuvenation.' },
      mas:  { ey:'Our Team',        ti:'Meet Our Masseuses',           ds:'Each of our masseuses is an experienced professional dedicated to their craft.' },
      proc: { ey:'How It Works',    ti:'Your Journey to Relaxation',   ds:'' },
      pr:   { ey:'Pricing',         ti:'Transparent Pricing',          ds:'No hidden fees. Price includes the full experience — from welcome to farewell tea.' },
      faq:  { ey:'FAQ',             ti:'Frequently Asked Questions',   ds:'' },
      cta:  { ti:'Ready to Relax?', ds:'Book your massage today and invest time in yourself.', btn:'Book Online' },
      mas_all: 'All Masseuses →',
      svc_all: 'View Full Pricing',
    },
    proc: [
      { ti:'Book Online',  tx:'Choose your massage, masseuse and time — anytime, anywhere through our system.' },
      { ti:'Welcome',      tx:'On arrival we welcome you with tea and briefly discuss your wishes and needs.' },
      { ti:'Your Massage', tx:'Your masseuse cares for you in a private, fragrant space tailored to your needs.' },
      { ti:'Unwind',       tx:'After the massage, relax in our lounge with tea — extend your experience.' },
    ],
    faq: [
      { q:'How should I prepare for my massage?',   a:'Arrive 10 minutes early. Avoid alcohol at least 4 hours before. The massage is performed on a treatment table with linen — always private and respectful.' },
      { q:'Do I need to book in advance?',          a:'Yes, booking is required. Capacity is limited and we want to secure your preferred time and masseuse without waiting.' },
      { q:'What payment methods do you accept?',    a:'We accept cash, cards (Visa, Mastercard) and bank transfers. Payment is made after the massage before leaving.' },
      { q:'Can I come with a partner for couples?', a:'Absolutely! Couples massage is one of our most popular services. Both masseuses work in the same room at the same time.' },
      { q:"What's included in the price?",          a:'Price includes the massage, premium oils, heated linen, and access to the relaxation lounge with herbal tea.' },
      { q:'Can I order a massage as a gift?',       a:'Yes! Gift vouchers are available for any value or specific massage. Contact us by email for details.' },
    ],
    prices: {
      ti:'Massage Prices — Black Elixir Spa', ds:'Premium massages in an elegant setting. All prices in CZK.',
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
      ti:'Contact — Black Elixir Spa', ds:'Find us in the heart of Prague. We look forward to your visit.',
      addr:'Address', addrV:'12 Václavské náměstí\nPrague 1, 110 00\nCzech Republic',
      phone:'Phone', phoneV:'+420 777 123 456',
      email:'Email',  emailV:'info@blackelixir.cz',
      hours:'Opening Hours', hoursV:'Daily from 9 AM to 5 AM',
    },
    mas: {
      ti:'Our Masseuses — Black Elixir Spa', ds:'Experienced professionals dedicated to massage and wellbeing.',
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
    nav: { home:'Главная', masseuses:'Массажистки', schedule:'Расписание', prices:'Цены', contacts:'Контакт', reservation:'Бронирование' },
    hero: {
      eyebrow: 'Премиум Спа Прага',
      line1: 'Массаж и', line2: 'релаксация',
      brand: 'Black Elixir',
      sub: 'Насладитесь роскошью профессионального массажа в приватной, элегантной обстановке. Наши массажистки заботятся о вашем теле и душе.',
      cta: 'Забронировать', cta2: 'Наши услуги',
      y: 'лет опыта', c: 'довольных клиентов', m: 'массажистки',
      next: 'Ближайшее время', today: 'Сегодня, 19:00', nextMeta: 'Елена · Классический массаж',
    },
    sec: {
      svc:  { ey:'Наши массажи',      ti:'Выберите вид массажа',               ds:'Мы предлагаем широкий спектр профессиональных массажей для вашей релаксации и восстановления.' },
      mas:  { ey:'Наша команда',      ti:'Познакомьтесь с нашими массажистками', ds:'Каждая массажистка — опытный специалист с любовью к своей профессии.' },
      proc: { ey:'Как это работает',  ti:'Ваш путь к релаксации',              ds:'' },
      pr:   { ey:'Цены',              ti:'Прозрачные цены',                    ds:'Никаких скрытых платежей. Цена включает весь опыт — от приветствия до прощального чая.' },
      faq:  { ey:'FAQ',               ti:'Частые вопросы',                     ds:'' },
      cta:  { ti:'Готовы расслабиться?', ds:'Забронируйте массаж сегодня и уделите время себе.', btn:'Забронировать онлайн' },
      mas_all: 'Все массажистки →',
      svc_all: 'Полный прайс-лист',
    },
    proc: [
      { ti:'Онлайн-бронирование', tx:'Выберите массаж, массажистку и время — в любое время через нашу систему.' },
      { ti:'Приветствие',         tx:'По прибытии встретим вас чаем и обсудим ваши пожелания и потребности.' },
      { ti:'Ваш массаж',          tx:'Массажистка позаботится о вас в приватном, ароматном пространстве.' },
      { ti:'Отдых',               tx:'После массажа расслабьтесь в зоне релаксации — продлите своё удовольствие.' },
    ],
    faq: [
      { q:'Как подготовиться к массажу?',         a:'Рекомендуем прийти за 10 минут. Избегайте алкоголя минимум за 4 часа. Массаж проводится на специальном столе с бельём — всегда приватно и с уважением.' },
      { q:'Нужно ли бронировать заранее?',        a:'Да, бронирование обязательно. Места ограничены, и мы хотим обеспечить вам предпочтительное время и массажистку.' },
      { q:'Какие способы оплаты доступны?',       a:'Принимаем наличные, карты (Visa, Mastercard) и банковские переводы. Оплата после массажа перед уходом.' },
      { q:'Можно прийти вдвоём на парный массаж?', a:'Конечно! Парный массаж — одна из самых популярных услуг. Обе массажистки работают в одном кабинете одновременно.' },
      { q:'Что включено в стоимость?',            a:'Цена включает массаж, премиальные масла, подогретое бельё и доступ в зону релаксации с травяным чаем.' },
      { q:'Можно заказать массаж в подарок?',     a:'Да! Подарочные сертификаты на любую сумму или конкретный вид массажа. Свяжитесь с нами по e-mail.' },
    ],
    prices: {
      ti:'Цены на массажи — Black Elixir Spa', ds:'Премиальные массажи в элегантной обстановке. Все цены в CZK.',
      th_svc:'Массаж', th_dur:'Длительность', th_pr:'Цена',
      inc_ti:'Что включено', inc_items:['Премиальные масла','Подогретое бельё','Травяной чай','Приватный кабинет','Зона релаксации после массажа'],
    },
    sched: {
      ti:'Расписание массажей', ds:'Текущая доступность. Нажмите на свободный слот для бронирования.',
      all:'Все массажистки', avail:'Свободно', booked:'Занято',
      days:['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'],
      daysS:['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
    },
    contacts: {
      ti:'Контакт — Black Elixir Spa', ds:'Найдите нас в сердце Праги. Ждём вашего визита.',
      addr:'Адрес', addrV:'Václavské náměstí 12\nПрага 1, 110 00\nЧехия',
      phone:'Телефон', phoneV:'+420 777 123 456',
      email:'E-mail',  emailV:'info@blackelixir.cz',
      hours:'Часы работы', hoursV:'Ежедневно с 9:00 до 5:00 утра',
    },
    mas: {
      ti:'Наши массажистки — Black Elixir Spa', ds:'Опытные специалисты с профессиональным подходом к массажу и велнесу.',
      svcOf:'Предлагаемые массажи', bookWith:'Забронировать с',
      yearsExp:'лет опыта',
    },
    res: {
      ti:'Бронирование массажа',
      steps:['Услуга','Массажистка','Время','Контакты','Готово'],
      selSvc:'Выберите массаж', selMas:'Выберите массажистку', selDate:'Выберите дату',
      selSlot:'Доступное время',
      contactTi:'Контактные данные',
      name:'Имя и фамилия', email:'E-mail', phone:'Телефон',
      msg:'Заметка (необязательно)', msgP:'Особые пожелания или проблемы со здоровьем?',
      confirm:'Подтвердить бронирование', next:'Продолжить', back:'Назад',
      done:'Бронирование подтверждено!',
      doneText:'Спасибо! Ваше бронирование успешно отправлено. Подтверждение придёт на ваш e-mail.',
      again:'Новое бронирование',
      sum_svc:'Массаж', sum_mas:'Массажистка', sum_dt:'Время', sum_dur:'Длительность', sum_pr:'Цена',
    },
    footer: {
      pages:'Страницы', massages:'Массажи', contact:'Контакт',
      tagline:'Премиальный массаж и релаксация в сердце Праги.',
      rights:'Все права защищены.', terms:'Условия', privacy:'Конфиденциальность',
    },
  },
};

/* ── SERVICES ─────────────────────────────────────────── */
const SERVICES = [
  {
    id:1, slug:'vip-masaz',
    name:{ cs:'VIP masáž', en:'VIP Massage', ru:'VIP-массаж' },
    desc:{ cs:'VIP masáž s prémiálními oleji, jemnými a hlubokými technikami pro celkové uvolnění a luxusní zážitek.', en:'VIP massage with premium oils, gentle and deep techniques for full relaxation and a luxurious experience.', ru:'VIP-массаж с премиальными маслами, мягкими и глубокими техниками для полного расслабления и роскошного опыта.' },
    duration:60, price:2500,
    img:'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&h=450&q=80',
    alt:'VIP masáž — Black Elixir Spa Praha',
  },
  {
    id:2, slug:'relaxacni-masaz',
    name:{ cs:'Relaxační masáž', en:'Relaxation Massage', ru:'Расслабляющий массаж' },
    desc:{ cs:'Relaxační masáž s teplými oleji a jemnými hladivými hmaty pro hlubokou relaxaci a uvolnění stresu.', en:'Relaxation massage with warm oils and gentle gliding strokes for deep relaxation and stress relief.', ru:'Расслабляющий массаж с тёплыми маслами и мягкими поглаживающими движениями для глубокой релаксации и снятия стресса.' },
    duration:60, price:2000,
    img:'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=600&h=450&q=80',
    alt:'Relaxační masáž — Black Elixir Spa Praha',
  },
  {
    id:3, slug:'masaz-pro-zeny',
    name:{ cs:'Masáž pro ženy', en:'Massage for Women', ru:'Массаж для женщин' },
    desc:{ cs:'Speciální masáž pro ženy kombinující jemné a hluboké techniky pro harmonizaci těla a pocit péče.', en:'Special massage for women combining gentle and deep techniques for body harmony and a feeling of care.', ru:'Особый массаж для женщин, сочетающий нежные и глубокие техники для гармонизации тела и ощущения заботы.' },
    duration:60, price:4000,
    img:'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=600&h=450&q=80',
    alt:'Masáž pro ženy — Black Elixir Spa Praha',
  },
  {
    id:5, slug:'masaz-pro-pary',
    name:{ cs:'Masáž pro páry', en:'Couples Massage', ru:'Массаж для пар' },
    desc:{ cs:'Masáž pro páry — obě masérky pracují synchronizovaně v jednom soukromém pokoji. Luxusní společný zážitek.', en:'Couples massage — both masseuses work synchronised in one private room. A luxurious shared experience.', ru:'Массаж для пар — две массажистки работают синхронно в одном приватном кабинете. Роскошный совместный опыт.' },
    duration:60, price:1900,
    img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&h=450&q=80',
    alt:'Masáž pro páry — Black Elixir Spa Praha',
  },
];

/* ── MASSEUSES ─────────────────────────────────────────── */
const MASSEUSES = [
  {
    id:1, slug:'elena',
    name:'Elena', surname:'Nováková',
    spec:{ cs:'Švédská & Klasická masáž', en:'Swedish & Classic Massage', ru:'Шведский & Классический массаж' },
    bio:{
      cs:'Elena je zkušená masérka s 8 lety praxe ve švédské a klasické masáži. Vystudovala fyzioterapii na Karlově Univerzitě a specializuje se na uvolňování chronického svalového napětí a stresových uzlů. Její práce je přesná, intuitivní a přizpůsobená individuálním potřebám každého klienta. Elena věří, že masáž není jen fyzický zážitek, ale i cesta k celkové duševní rovnováze a vnitřní harmonii.',
      en:'Elena is an experienced massage therapist with 8 years of practice in Swedish and classic massage. She studied physiotherapy at Charles University and specialises in releasing chronic muscle tension and stress knots. Her approach is precise, intuitive and tailored to each client\'s individual needs. Elena believes massage is not just a physical experience, but also a path to mental balance and inner harmony.',
      ru:'Елена — опытный массажист с 8-летней практикой в области шведского и классического массажа. Она изучала физиотерапию в Карловом университете и специализируется на снятии хронического мышечного напряжения. Её подход точен, интуитивен и адаптирован к индивидуальным потребностям каждого клиента.',
    },
    img:'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=500&h=667&q=80',
    alt:'Elena Nováková — masérka Black Elixir Spa Praha',
    services:[1,2,5], exp:8,
    tags:{ cs:['Švédská masáž','Klasická masáž','Anti-stress'], en:['Swedish','Classic','Anti-stress'], ru:['Шведский','Классический','Антистресс'] },
  },
  {
    id:2, slug:'lucie',
    name:'Lucie', surname:'Procházková',
    spec:{ cs:'Thajská & Reflexní masáž', en:'Thai & Reflexology', ru:'Тайский & Рефлексология' },
    bio:{
      cs:'Lucie absolvovala výcvik tradiční thajské masáže v Chiang Mai, Thajsko, kde strávila rok studiem u místních mistrů. Po návratu do Prahy se specializuje na kombinaci thajských technik s reflexní masáží chodidel. Její masáže jsou energetické, revitalizační a ideální pro ty, kteří hledají hlubokou fyzickou i energetickou rovnováhu. Lucie je přesvědčená, že správná masáž probudí tělo zevnitř.',
      en:'Lucie trained in traditional Thai massage in Chiang Mai, Thailand, spending a year studying under local masters. Back in Prague she specialises in combining Thai techniques with foot reflexology. Her massages are energetic and revitalising — ideal for those seeking deep physical and energetic balance. Lucie believes the right massage awakens the body from within.',
      ru:'Луция прошла подготовку по традиционному тайскому массажу в Чиангмае, Таиланд, где провела год, обучаясь у местных мастеров. Её массажи энергичны и ревитализирующие — идеально для глубокого физического и энергетического баланса.',
    },
    img:'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=500&h=667&q=80',
    alt:'Lucie Procházková — masérka Black Elixir Spa Praha',
    services:[2], exp:5,
    tags:{ cs:['Thajská masáž','Reflexologie','Energetická'], en:['Thai','Reflexology','Energy'], ru:['Тайский','Рефлексология','Энергетический'] },
  },
  {
    id:3, slug:'natalia',
    name:'Natália', surname:'Horváth',
    spec:{ cs:'Aromaterapie & Relaxační masáž', en:'Aromatherapy & Relaxation', ru:'Ароматерапия & Релаксация' },
    bio:{
      cs:'Natália je specialistka na aromaterapii a relaxační masáže s rozsáhlými znalostmi éterických olejů. Osobně vybírá a kombinuje éterické oleje pro každého klienta individuálně. Její pomalý, meditativní přístup navozuje hluboký stav klidu a obnovy. Natália pracuje i s klienty se stresem, úzkostí a poruchami spánku a vnímá masáž jako holistický nástroj péče.',
      en:'Natália specialises in aromatherapy and relaxation massage with extensive knowledge of essential oils. She personally selects and blends essential oils for each client. Her slow, meditative approach creates a deep state of calm and renewal. Natália also works with clients dealing with stress, anxiety and sleep disorders.',
      ru:'Наталья специализируется на ароматерапии и расслабляющих массажах и обладает обширными знаниями в области эфирных масел. Она лично подбирает и смешивает эфирные масла для каждого клиента.',
    },
    img:'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&h=667&q=80',
    alt:'Natália Horváth — masérka Black Elixir Spa Praha',
    services:[1,3,5], exp:6,
    tags:{ cs:['Aromaterapie','Relaxační','Anti-stress'], en:['Aromatherapy','Relaxation','Anti-stress'], ru:['Ароматерапия','Расслабляющий','Антистресс'] },
  },
  {
    id:4, slug:'klara',
    name:'Klára', surname:'Dvořáčková',
    spec:{ cs:'Deep Tissue & Lymfatická masáž', en:'Deep Tissue & Lymphatic Massage', ru:'Глубокий массаж & Лимфодренаж' },
    bio:{
      cs:'Klára je zkušená terapeutka specializovaná na hlubokou tkáňovou masáž a lymfatické techniky. Vystudovala masérské umění ve Vídni a absolvovala pokročilé kurzy v Praze a Berlíně. Její přístup kombinuje hluboké tlakové techniky s lymfatickými prvky pro maximální uvolnění svalů a zlepšení cirkulace. Klára má 10 let praxe a patří k nejzkušenějším členkám týmu.',
      en:'Klára is an experienced therapist specialising in deep tissue massage and lymphatic techniques. She studied massage in Vienna and completed advanced courses in Prague and Berlin. Her approach combines deep pressure techniques with lymphatic elements for maximum muscle release and improved circulation. With 10 years of practice, Klára is the most experienced member of the team.',
      ru:'Клара — опытный терапевт, специализирующийся на глубокотканном и лимфодренажном массаже. Она изучала массаж в Вене и прошла курсы в Праге и Берлине. 10 лет практики.',
    },
    img:'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=500&h=667&q=80',
    alt:'Klára Dvořáčková — masérka Black Elixir Spa Praha',
    services:[1], exp:10,
    tags:{ cs:['Deep tissue','Lymfatická'], en:['Deep Tissue','Lymphatic'], ru:['Глубокий','Лимфодренаж'] },
  },
];

/* ── SCHEDULE SLOTS (seeded, deterministic) ─────────────── */
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
