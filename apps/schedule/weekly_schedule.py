"""Weekly shifts synced from tantra-prague.com/cs/rozvrh/."""

from apps.core.site_address import get_address

DEFAULT_LOCATION = 'soukenicka'

_addr = get_address('cs')
_addr_en = get_address('en')
_addr_ru = get_address('ru')

WEEKLY_SHIFTS = {
    'julia': {
        1: {'start': '09:00', 'end': '20:30', 'shift': 'day'},
        2: {'start': '09:00', 'end': '20:30', 'shift': 'day'},
        3: {'start': '09:00', 'end': '20:30', 'shift': 'day'},
        4: {'start': '09:00', 'end': '20:30', 'shift': 'day'},
    },
    'diana': {
        1: {'start': '09:00', 'end': '20:30', 'shift': 'day'},
        2: {'start': '09:00', 'end': '20:30', 'shift': 'day'},
        3: {'start': '09:00', 'end': '20:30', 'shift': 'day'},
        4: {'start': '09:00', 'end': '20:30', 'shift': 'day'},
        5: {'start': '09:00', 'end': '20:30', 'shift': 'day'},
    },
    'vanessa': {
        1: {'start': '11:00', 'end': '04:00', 'shift': 'day'},
        2: {'start': '09:00', 'end': '04:00', 'shift': 'day'},
        3: {'start': '09:00', 'end': '20:30', 'shift': 'day'},
    },
    'laura': {
        3: {'start': '18:30', 'end': '04:00', 'shift': 'night'},
        4: {'start': '18:30', 'end': '04:00', 'shift': 'night'},
        5: {'start': '18:30', 'end': '04:00', 'shift': 'night'},
        6: {'start': '18:30', 'end': '04:00', 'shift': 'night'},
    },
}

LOCATION_CATALOG = [
    {
        'slug': 'soukenicka',
        'name_cs': _addr['short'],
        'name_en': _addr_en['short'],
        'name_ru': _addr_ru['short'],
        'address_cs': _addr['full'],
        'address_en': _addr_en['full'],
        'address_ru': _addr_ru['full'],
        'order': 1,
    },
]

SHIFT_LABELS = {
    'day': {'cs': 'Den', 'en': 'Day', 'ru': 'День', 'uk': 'День'},
    'night': {'cs': 'Noc', 'en': 'Night', 'ru': 'Ночь', 'uk': 'Ніч'},
}
