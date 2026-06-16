from django.conf import settings
from django.urls import translate_url

from apps.core.currency import CURRENCIES, normalize_currency


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
    return {
        'current_language': request.LANGUAGE_CODE,
        'site_name': 'Black Elixir Spa',
        'footer_services': MassageType.objects.filter(is_active=True),
    }


def currency_settings(request):
    current = normalize_currency(request.COOKIES.get('currency'))
    return {
        'currency_code': current,
        'currency_options': CURRENCIES,
    }
