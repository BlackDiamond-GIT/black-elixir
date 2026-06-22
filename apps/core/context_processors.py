from django.conf import settings
from django.urls import translate_url

from apps.core.currency import CURRENCIES, normalize_currency
from apps.core.site_address import STREET, get_address, get_opening_hours


def site_languages(request):
    languages = []
    for code, name in settings.LANGUAGES:
        languages.append({
            'code': code,
            'name': name,
            'active': code == request.LANGUAGE_CODE,
            'url': translate_url(request.path, code),
        })

    return {'languages': languages}


def site_settings(request):
    from apps.services.models import MassageType
    lang = request.LANGUAGE_CODE
    address = get_address(lang)
    return {
        'current_language': lang,
        'site_name': 'Black Elixir Spa',
        'footer_services': MassageType.objects.filter(is_active=True),
        'site_address': address,
        'site_street': STREET,
        'site_opening_hours': get_opening_hours(lang),
    }


def currency_settings(request):
    current = normalize_currency(request.COOKIES.get('currency'))
    return {
        'currency_code': current,
        'currency_options': CURRENCIES,
    }
