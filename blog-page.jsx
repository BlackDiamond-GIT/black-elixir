/* ============================================================
   BLOG-PAGE.JSX
   ============================================================ */
const { useState: useStateBl } = React;

const BLOG_POSTS = [
  {
    id: 1,
    slug: 'benefits-of-massage',
    title: { cs: 'Výhody pravidelné masáže', en: 'Benefits of Regular Massage', ru: 'Преимущества регулярного массажа' },
    excerpt: { cs: 'Zjistěte, jak pravidelná masáž zlepšuje vaše zdraví a wellbeing.', en: 'Discover how regular massage improves your health and wellbeing.', ru: 'Узнайте, как регулярный массаж улучшает ваше здоровье и благополучие.' },
    content: { cs: 'Masáž má mnoho prospěšných účinků na tělo i mysl...', en: 'Massage has many beneficial effects on body and mind...', ru: 'Массаж имеет множество благоприятных эффектов на тело и разум...' },
    date: '2024-12-15',
    img: 'https://images.unsplash.com/photo-1544367567-0d6fcffe7f1d?auto=format&fit=crop&w=800&h=600&q=85',
    alt: { cs: 'Masáž v lázních', en: 'Massage spa', ru: 'Массаж спа' },
  },
  {
    id: 2,
    slug: 'stress-relief',
    title: { cs: 'Jak masáž snižuje stres', en: 'How Massage Reduces Stress', ru: 'Как массаж снимает стресс' },
    excerpt: { cs: 'Fyzická a psychická úleva díky pravidelné péči o tělo.', en: 'Physical and mental relief through regular body care.', ru: 'Физическое и психическое облегчение благодаря регулярному уходу за телом.' },
    content: { cs: 'Stres je jednou z nejčastějších příčin zdravotních problémů...', en: 'Stress is one of the most common causes of health problems...', ru: 'Стресс — одна из наиболее частых причин проблем со здоровьем...' },
    date: '2024-12-10',
    img: 'https://images.unsplash.com/photo-1606441898490-af4016e78bcc?auto=format&fit=crop&w=800&h=600&q=85',
    alt: { cs: 'Relaxace a odpočinek', en: 'Relaxation and rest', ru: 'Релаксация и отдых' },
  },
  {
    id: 3,
    slug: 'massage-types',
    title: { cs: 'Typy masáží — Jaká masáž pro vás?', en: 'Types of Massage — Which is Right for You?', ru: 'Виды массажа — какой подходит вам?' },
    excerpt: { cs: 'Přehled různých typů masáží a jejich účinků.', en: 'Overview of different types of massage and their benefits.', ru: 'Обзор различных видов массажа и их преимуществ.' },
    content: { cs: 'Existuje mnoho stylů masáží s různými účinky...', en: 'There are many styles of massage with different benefits...', ru: 'Существует множество стилей массажа с различными преимуществами...' },
    date: '2024-12-05',
    img: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&h=600&q=85',
    alt: { cs: 'Různé techniky masáže', en: 'Different massage techniques', ru: 'Различные техники массажа' },
  },
  {
    id: 4,
    slug: 'self-care-tips',
    title: { cs: 'Tipy pro péči o sebe doma', en: 'Self-Care Tips at Home', ru: 'Советы по уходу за собой дома' },
    excerpt: { cs: 'Jednoduché cvičení a techniky pro denní péči.', en: 'Simple exercises and techniques for daily care.', ru: 'Простые упражнения и методики для ежедневного ухода.' },
    content: { cs: 'Péče o sebe nemusí být složitá nebo drahá...', en: 'Self-care does not have to be complicated or expensive...', ru: 'Уход за собой не должен быть сложным или дорогостоящим...' },
    date: '2024-11-28',
    img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&h=600&q=85',
    alt: { cs: 'Domácí wellness', en: 'Home wellness', ru: 'Домашний спа' },
  },
];

function BlogCard({ post, lang, setPage }) {
  const { useReveal } = window;
  const [ref, vis] = useReveal();
  const dateObj = new Date(post.date);
  const dateStr = dateObj.toLocaleDateString(lang === 'cs' ? 'cs-CZ' : lang === 'en' ? 'en-US' : 'ru-RU', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <article ref={ref} className={`blog-card reveal${vis ? ' vis' : ''}`}>
      <div className="blog-card__img-wrap">
        <img src={post.img} alt={post.alt[lang]} loading="lazy" />
        <span className="blog-card__hint">
          {lang === 'cs' ? 'Číst' : lang === 'en' ? 'Read' : 'Читать'}
        </span>
      </div>
      <div className="blog-card__body">
        <p className="blog-card__date">{dateStr}</p>
        <h3 className="blog-card__title">{post.title[lang]}</h3>
        <p className="blog-card__excerpt">{post.excerpt[lang]}</p>
        <button className="btn btn--ghost btn--sm">
          {lang === 'cs' ? 'Číst dál' : lang === 'en' ? 'Read More' : 'Далее'}
        </button>
      </div>
    </article>
  );
}

function BlogPage({ lang, setPage }) {
  const { T, PageHeader, CTABanner } = window;
  const t = T[lang];

  const breadcrumbs = (
    <>
      <button onClick={() => { setPage('home'); window.scrollTo(0, 0); }}>{t.nav.home}</button>
      <span className="breadcrumbs__sep">›</span>
      <span style={{ color: 'var(--text)' }}>{lang === 'cs' ? 'Blog' : lang === 'en' ? 'Blog' : 'Блог'}</span>
    </>
  );

  const blogT = {
    cs: { ti: 'Black Elixir Blog', ds: 'Tipy, návody a poznatky z světa masáží a wellness.' },
    en: { ti: 'Black Elixir Blog', ds: 'Tips, guides, and insights from the world of massage and wellness.' },
    ru: { ti: 'Black Elixir Блог', ds: 'Советы, руководства и тенденции в мире массажа и велнеса.' },
  };

  return (
    <main className="page-enter">
      <PageHeader title={blogT[lang].ti} breadcrumbs={breadcrumbs}>
        {blogT[lang].ds}
      </PageHeader>

      <section className="section">
        <div className="container">
          <div className="blog-grid">
            {BLOG_POSTS.map((post, i) => (
              <BlogCard key={post.id} post={post} lang={lang} setPage={setPage} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner lang={lang} setPage={setPage} />
    </main>
  );
}

Object.assign(window, { BlogPage });
