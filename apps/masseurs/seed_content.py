def generate_masseuse_content(item):
    name = item['name']
    spec_cs = item['spec_cs']
    spec_en = item['spec_en']
    spec_ru = item['spec_ru']
    bio_cs = (
        f'{name} je certifikovaná masérka specializující se na {spec_cs.lower()}. '
        f'V Black Elixir Spa v Praze přizpůsobuje každé sezení potřebám klienta a aktuálnímu stavu těla. '
        f'Její přístup spojuje odborné techniky s klidnou péčí, která navozuje pocit bezpečí a hluboké relaxace. '
        f'Klienti oceňují precizní práci, empatii a schopnost uvolnit napětí v zádech, krku a ramenou. '
        f'Věří, že kvalitní masáž je investice do fyzického i duševního zdraví.'
    )
    bio_en = (
        f'{name} is a certified massage therapist specialising in {spec_en.lower()}. '
        f'At Black Elixir Spa Prague she tailors each session to the client\'s needs and current condition. '
        f'Her calm, attentive approach combines professional techniques with a sense of safety and deep relaxation. '
        f'Clients appreciate her precise work, empathy and ability to release tension in the back, neck and shoulders. '
        f'She believes quality massage is an investment in physical and mental health.'
    )
    bio_ru = (
        f'{name} — сертифицированный массажист, специализирующийся на {spec_ru.lower()}. '
        f'В Black Elixir Spa Praha она адаптирует каждый сеанс под потребности клиента и состояние тела. '
        f'Её спокойный подход сочетает профессиональные техники с ощущением безопасности и глубокой релаксацией. '
        f'Клиенты ценят точную работу, эмпатию и умение снимать напряжение в спине, шее и плечах. '
        f'Она считает качественный массаж инвестицией в физическое и ментальное здоровье.'
    )

    return {
        'bio_cs': bio_cs,
        'bio_en': bio_en,
        'bio_ru': bio_ru,
        'photo_alt': f'{name} — masérka {spec_cs}, Black Elixir Spa Praha',
        'meta_title': f'{name} — Masérka | Black Elixir Spa'[:60],
        'meta_description': (
            f'{name} — {spec_cs} v Praze. '
            f'Rezervujte sezení v Black Elixir Spa.'
        )[:160],
    }


def generate_masseuse_faqs(masseuse, lang='cs'):
    from apps.core.i18n_utils import localized_field

    name = masseuse.name
    spec = localized_field(masseuse, 'spec', lang)

    templates = {
        'cs': [
            {
                'q': f'Jaké masáže nabízí {name}?',
                'a': f'{name} specializuje se na {spec.lower()}. '
                     f'Kompletní seznam služeb najdete v sekci Nabízené masáže na této stránce.',
            },
            {
                'q': f'Jak rezervovat sezení s {name}?',
                'a': 'Rezervaci provedete online — vyberte masáž, zvolte masérku a volný termín. '
                     'Potvrzení obdržíte e-mailem.',
            },
        ],
        'en': [
            {
                'q': f'What massages does {name} offer?',
                'a': f'{name} specializes in {spec.lower()}. '
                     f'Find the full list of services in the Massages offered section on this page.',
            },
            {
                'q': f'How do I book a session with {name}?',
                'a': 'Book online — choose a massage, select your masseuse and a free time slot. '
                     'You will receive a confirmation by email.',
            },
        ],
        'ru': [
            {
                'q': f'Какие массажи предлагает {name}?',
                'a': f'{name} специализируется на {spec.lower()}. '
                     f'Полный список услуг — в разделе «Предлагаемые массажи» на этой странице.',
            },
            {
                'q': f'Как забронировать сеанс с {name}?',
                'a': 'Забронируйте онлайн — выберите массаж, массажистку и свободный слот. '
                     'Подтверждение придёт на e-mail.',
            },
        ],
    }
    return templates.get(lang, templates['cs'])
