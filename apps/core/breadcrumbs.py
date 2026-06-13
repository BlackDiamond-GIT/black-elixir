from django.utils.translation import gettext


def make_breadcrumb(msgid, url):
    return {'name': gettext(msgid), 'url': url}


def build_breadcrumbs(*pairs):
    return [make_breadcrumb(msgid, url) for msgid, url in pairs]
