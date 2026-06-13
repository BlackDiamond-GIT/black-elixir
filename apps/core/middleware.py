"""Project middleware."""

from django.utils import translation

_ADMIN_LANG_COOKIE = 'admin_lang'
_ALLOWED_ADMIN_LANGS = frozenset(('uk', 'en'))


class AdminLocaleMiddleware:
    """Force Ukrainian (or English via cookie) for Django admin routes."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        return self.get_response(request)

    def process_request(self, request):
        if not request.path.startswith('/admin/'):
            return
        lang = request.COOKIES.get(_ADMIN_LANG_COOKIE, 'uk')
        if lang not in _ALLOWED_ADMIN_LANGS:
            lang = 'uk'
        translation.activate(lang)
        request.LANGUAGE_CODE = lang
