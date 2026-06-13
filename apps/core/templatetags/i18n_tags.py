from django import template
from django.utils.translation import get_language

from apps.core.i18n_utils import localized_field

register = template.Library()


@register.filter
def localized(obj, field_base):
    lang = (get_language() or 'cs')[:2]
    return localized_field(obj, field_base, lang)
