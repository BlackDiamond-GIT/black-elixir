def _meta_title(name, suffix='Black Elixir Spa'):
    return f'{name} Praha — {suffix}'[:60]


def _meta_description(keyword, price, duration, lang='cs'):
    templates = {
        'cs': (
            f'{keyword.capitalize()} v centru Prahy. Profesionální péče, '
            f'{duration} min od {price} Kč. Rezervujte online v Black Elixir Spa.'
        ),
        'en': (
            f'{keyword.capitalize()} in central Prague. Professional care, '
            f'{duration} min from {price} CZK. Book online at Black Elixir Spa.'
        ),
        'ru': (
            f'{keyword.capitalize()} в центре Праги. Профессиональный уход, '
            f'{duration} мин от {price} CZK. Запись онлайн в Black Elixir Spa.'
        ),
    }
    return templates[lang][:160]


def _description_paragraph(item, lang):
    templates = {
        'cs': (
            '{name} využívá {technique} pro {benefit}. '
            'Vhodná pro {audience}.'
        ),
        'en': (
            '{name} uses {technique} for {benefit}. '
            'Ideal for {audience}.'
        ),
        'ru': (
            '{name} использует {technique}. '
            'Обеспечивает {benefit}. '
            'Подходит для {audience}.'
        ),
    }
    return templates[lang].format(
        name=item[f'name_{lang}'],
        technique=item[f'technique_{lang}'],
        benefit=item[f'benefit_{lang}'],
        audience=item[f'audience_{lang}'],
    )


def generate_service_descriptions(item):
    duration = item['duration_minutes']
    price = item['base_price']

    return {
        'description_cs': _description_paragraph(item, 'cs'),
        'description_en': _description_paragraph(item, 'en'),
        'description_ru': _description_paragraph(item, 'ru'),
        'meta_title': _meta_title(item['name_cs']),
        'meta_description': _meta_description(item['keyword_cs'], price, duration, 'cs'),
    }


def generate_service_faqs(item):
    slug = item['slug']
    name_cs = item['name_cs']
    name_en = item['name_en']
    duration = item['duration_minutes']
    price = item['base_price']

    return {
        slug: {
            'cs': [
                {'q': f'Co je {item["keyword_cs"]}?', 'a': f'{name_cs} v Black Elixir Spa využívá {item["technique_cs"]} pro dosažení {item["benefit_cs"]}.'},
                {'q': 'Jak dlouho trvá sezení?', 'a': f'Standardní délka je {duration} minut. Individuální prodloužení lze domluvit při rezervaci.'},
                {'q': 'Kolik to stojí?', 'a': f'Cena je {price} Kč. V ceně jsou oleje, prostěradla a relaxační zóna.'},
                {'q': 'Pro koho je vhodná?', 'a': f'Vhodná pro {item["audience_cs"]}. Při zdravotních pochybnostech nás kontaktujte.'},
                {'q': 'Jak se rezervovat?', 'a': 'Rezervaci provedete online na našem webu — vyberte masáž, masérku a volný termín.'},
                {'q': 'Co si vzít s sebou?', 'a': 'Stačí pohodlné oblečení. Vše potřebné pro masáž je součástí služby.'},
            ],
            'en': [
                {'q': f'What is {item["keyword_en"]}?', 'a': f'{name_en} at Black Elixir Spa uses {item["technique_en"]} for {item["benefit_en"]}.'},
                {'q': 'How long is the session?', 'a': f'Standard length is {duration} minutes. Extensions can be arranged when booking.'},
                {'q': 'How much does it cost?', 'a': f'The price is {price} CZK including oils, linen and relaxation lounge access.'},
                {'q': 'Who is it for?', 'a': f'Suitable for {item["audience_en"]}. Contact us if you have health concerns.'},
                {'q': 'How to book?', 'a': 'Book online on our website — choose massage, therapist and available time.'},
            ],
            'ru': [
                {'q': f'Что такое {item["keyword_ru"]}?', 'a': f'{name_en} в Black Elixir Spa использует {item["technique_ru"]}.'},
                {'q': 'Сколько длится сеанс?', 'a': f'Стандартная длительность — {duration} минут.'},
                {'q': 'Сколько стоит?', 'a': f'Стоимость — {price} CZK, масла и зона релаксации включены.'},
                {'q': 'Как записаться?', 'a': 'Запись онлайн на сайте — выберите массаж, массажистку и время.'},
            ],
        }
    }
