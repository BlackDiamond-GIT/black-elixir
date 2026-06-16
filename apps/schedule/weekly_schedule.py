"""Weekly shifts synced from tantra-prague.com/cs/rozvrh/."""

DEFAULT_LOCATION = 'opletalova'

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
        'slug': 'opletalova',
        'name_cs': 'Opletalova 1566/30',
        'name_en': 'Opletalova 1566/30',
        'name_ru': 'Opletalova 1566/30',
        'address_cs': 'Opletalova 1566/30, 110 00 Nové Město, Praha',
        'address_en': 'Opletalova 1566/30, 110 00 Nové Město, Prague',
        'address_ru': 'Opletalova 1566/30, 110 00 Nové Město, Прага',
        'order': 1,
    },
]

SHIFT_LABELS = {
    'day': {'cs': 'Den', 'en': 'Day', 'ru': 'День'},
    'night': {'cs': 'Noc', 'en': 'Night', 'ru': 'Ночь'},
}
