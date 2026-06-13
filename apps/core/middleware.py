"""Project middleware."""

from django.utils import translation

_ADMIN_LANG_COOKIE = 'admin_lang'
_ALLOWED_ADMIN_LANGS = frozenset(('cs', 'en'))


class AdminLocaleMiddleware:
    """Force Czech (or English via cookie) for Django admin routes."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path.startswith('/admin/'):
            lang = request.COOKIES.get(_ADMIN_LANG_COOKIE, 'cs')
            if lang not in _ALLOWED_ADMIN_LANGS:
                lang = 'cs'
            with translation.override(lang):
                response = self.get_response(request)
                translation.deactivate()
                return response
        return self.get_response(request)
