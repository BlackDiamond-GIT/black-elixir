from django.urls import reverse


def absolute_reverse(request, viewname, *args, **kwargs):
    return request.build_absolute_uri(reverse(viewname, args=args, **kwargs))


def strip_language_prefix(path, lang):
    prefix = f'/{lang}/'
    if path.startswith(prefix):
        remainder = path[len(prefix):]
        return '/' + remainder if remainder else '/'
    if path == f'/{lang}':
        return '/'
    return path


def language_path(lang, path):
    path = path if path.startswith('/') else f'/{path}'
    if path == '/':
        return f'/{lang}/'
    return f'/{lang}{path}'
