# Black Elixir Spa — Production Django 5.1 Website

A premium spa website built with **Django 5.1**, **HTMX 2.x**, **HTML/CSS**, and **Vanilla JavaScript**. No React, no Tailwind, no jQuery — pure production-quality code.

## Features

- ✅ **Django 5.1** with i18n (Czech, English, Russian)
- ✅ **SEO-optimized** with JSON-LD schemas, hreflang, robots.txt, sitemap
- ✅ **HTMX 2.x** for interactive 5-step booking flow
- ✅ **Mobile-first CSS** with iOS Safari support
- ✅ **Production-ready** models: Masseuse, MassageType, TimeSlot, Reservation, Post
- ✅ **4 masseuses + 5 services** with fixtures
- ✅ **Admin interface** for all models
- ✅ **No external dependencies** beyond Django + Pillow + WhiteNoise

## Project Structure

```
black_elixir/
├── manage.py
├── requirements.txt
├── black_elixir/                 ← settings, urls, wsgi
├── apps/
│   ├── core/                     ← SEO tags, sitemaps, views
│   ├── masseurs/                 ← Masseuse model + views
│   ├── services/                 ← MassageType model
│   ├── schedule/                 ← TimeSlot model + views
│   ├── booking/                  ← Reservation + HTMX views
│   ├── blog/                     ← Post model
│   └── pages/                    ← Home, prices, contacts
├── templates/                    ← Django templates (i18n)
├── static/
│   ├── css/                      ← 7 CSS files (tokens, base, layout, components, home, reservation, misc)
│   └── js/                       ← main.js, booking.js
└── locale/                       ← Czech, English, Russian .po files
```

## Setup & Installation

### 1. Clone & Install Dependencies

```bash
cd black_elixir
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Configure Environment

Create `.env`:

```
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

### 3. Database Setup

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py loaddata apps/services/fixtures/services.json
python manage.py loaddata apps/masseurs/fixtures/masseuses.json
python manage.py createsuperuser
```

### 4. Compile Translations (Optional)

```bash
python manage.py compilemessages -l cs -l en -l ru
```

### 5. Run Development Server

```bash
python manage.py runserver
```

Visit: **http://localhost:8000**  
Admin: **http://localhost:8000/admin**

## URL Structure

- `/` — Home
- `/cs/masaeustky/` — Masseuses list (Czech)
- `/en/masseuses/` — Masseuses list (English)
- `/masseuses/elena/` — Masseuse detail
- `/schedule/` — Weekly schedule
- `/prices/` — Price page
- `/contacts/` — Contact page
- `/reservation/` — 5-step booking (HTMX)
- `/blog/` — Blog list
- `/admin/` — Django admin

## SEO Features

### Implemented

- ✅ Canonical URLs (no query params)
- ✅ hreflang tags (cs ↔ en ↔ ru bidirectional + x-default)
- ✅ JSON-LD schemas:
  - MassageParlor + AggregateRating + WebSite + SearchAction (base)
  - FAQPage (home)
  - Person (masseuse detail)
  - BreadcrumbList (all pages)
  - LocalBusiness (contacts)
  - Service + Offer (prices)
- ✅ Dynamic robots.txt
- ✅ XML sitemap with i18n
- ✅ OG tags (title, description, image, url, type)
- ✅ Meta descriptions (150-160 chars per page)
- ✅ Lazy loading on images + explicit width/height
- ✅ Mobile-first responsive design (320px+, tablet @768px, desktop @1024px)

### Performance Targets

- **LCP** < 2.5s (preload hero image with fetchpriority="high")
- **CLS** < 0.1 (width/height on all images)
- **INP** < 200ms (defer non-critical scripts)

## CSS Architecture

7 separate CSS files (max 500 lines each):

1. **tokens.css** — Design tokens (colors, fonts, spacing, shadows)
2. **base.css** — Reset, typography, utilities
3. **layout.css** — Navigation, footer, grids, containers
4. **components.css** — Buttons, cards, FAQ, modals, forms
5. **pages/home.css** — Hero, sections, CTA, process
6. **pages/reservation.css** — Booking form, steps, time grid
7. **pages/misc.css** — Price squares, blog, masseuse gallery

**Mobile-first** approach: base styles for 320px+, then `@media (min-width: 768px)`, `@media (min-width: 1024px)`.

**iOS Safari fixes:**
- `100svh` instead of `vh`
- `env(safe-area-inset-*)`
- `min-height: 44px` touch targets
- `touch-action: manipulation`

## JavaScript

- **main.js** — Navigation, mobile menu, FAQ accordion, language switcher, scroll reveal
- **booking.js** — HTMX event handlers, option card selection, time button selection

## Booking Flow (HTMX)

```
Step 1: Select service    → POST /cs/reservation/step/1/ → list masseuses
Step 2: Select masseuse   → POST /cs/reservation/step/2/ → list time slots
Step 3: Select time slot  → POST /cs/reservation/step/3/ → contact form
Step 4: Enter details     → POST /cs/reservation/step/4/ → confirmation
Step 5: Confirmation      → Displays with reservation ID
```

All endpoints return **HTML partials** (Django templates), not JSON. HTMX uses `hx-target="#booking-content"` with `hx-swap="innerHTML"`.

## Localization (i18n)

- **Base language:** Czech (`cs`) — prefix_default_language=True → `/cs/` URLs
- **Other languages:** English (`en`), Russian (`ru`) → `/en/`, `/ru/`
- `.po` files in `locale/cs/`, `locale/en/`, `locale/ru/`
- Use `{% trans %}` tags in templates

## Models

### Masseuse
- name, slug, bio (3 langs), spec (3 langs), photo, exp_years, services (M2M), meta_title, meta_description

### MassageType
- slug, name (3 langs), description (3 langs), duration_minutes, base_price, meta_title, meta_description

### TimeSlot
- masseuse (FK), service (FK), start_time, is_booked

### Reservation
- slot (OneToOne), client_name, client_email, client_phone, message, confirmed, created_at

### Post
- slug, title/excerpt/content (3 langs), image, image_alt, published_at, is_published

## Deployment

### Production Settings

```python
# .env
DEBUG=False
SECRET_KEY=your-very-secret-key-here
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
SECURE_SSL_REDIRECT=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True
DB_ENGINE=postgresql
DB_NAME=black_elixir
DB_USER=postgres
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432
```

### Run with Gunicorn

```bash
gunicorn black_elixir.wsgi:application --bind 0.0.0.0:8000
```

## Static Files

```bash
python manage.py collectstatic --noinput
```

WhiteNoise will serve static files automatically.

## Admin Users

Create a superuser:

```bash
python manage.py createsuperuser
```

Then login at `/admin/` to:
- Manage masseuses & services
- Create time slots
- View & confirm reservations
- Publish blog posts

## Fixtures

Included data (JSON):
- **services.json** — 5 massage types
- **masseuses.json** — 4 masseuses with bios, experience, services

Load them:

```bash
python manage.py loaddata apps/services/fixtures/services.json
python manage.py loaddata apps/masseurs/fixtures/masseuses.json
```

## Notes

- **No React/Vue/jQuery** — Pure Django templates with HTMX
- **No Tailwind** — Custom CSS with tokens + mobile-first approach
- **No !important** in CSS
- **i18n ready** — All text in Czech, English, Russian
- **Production-grade SEO** — Full schema.org, hreflang, dynamic robots, sitemap
- **iOS Safari optimized** — svh, safe-area, touch targets, no horizontal scroll

## Support

For questions, refer to:
- Django: https://docs.djangoproject.com/
- HTMX: https://htmx.org/
- Schema.org: https://schema.org/
- i18n: https://docs.djangoproject.com/en/5.1/topics/i18n/

---

**Built with Django 5.1, HTMX 2.x, HTML, CSS, and Vanilla JavaScript.**  
**Zero external CSS frameworks. Pure production code.**
