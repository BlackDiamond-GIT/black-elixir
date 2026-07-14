"""Salon address and opening hours — single source of truth."""

STREET = 'Soukenická'
POSTAL_CODE = '110 00'
DISTRICT = 'Nové Město'

OPENS = '09:00'
CLOSES = '05:00'

ADDRESSES = {
    'cs': {
        'lines': [STREET, f'{POSTAL_CODE} {DISTRICT}, Praha', 'Česká republika'],
        'short': f'{STREET}, Praha 1',
        'full': f'{STREET}, {POSTAL_CODE} {DISTRICT}, Praha',
    },
    'en': {
        'lines': [STREET, f'{POSTAL_CODE} {DISTRICT}, Prague', 'Czech Republic'],
        'short': f'{STREET}, Prague 1',
        'full': f'{STREET}, {POSTAL_CODE} {DISTRICT}, Prague',
    },
    'ru': {
        'lines': [STREET, f'{POSTAL_CODE} {DISTRICT}, Прага', 'Чехия'],
        'short': f'{STREET}, Прага 1',
        'full': f'{STREET}, {POSTAL_CODE} {DISTRICT}, Прага',
    },
    'uk': {
        'lines': [STREET, f'{POSTAL_CODE} {DISTRICT}, Прага', 'Чехія'],
        'short': f'{STREET}, Прага 1',
        'full': f'{STREET}, {POSTAL_CODE} {DISTRICT}, Прага',
    },
}


OPENING_HOURS = {
    'cs': 'Denně od 9:00 do 5:00',
    'en': 'Daily from 9 AM to 5 AM',
    'ru': 'Ежедневно с 9:00 до 5:00',
    'uk': 'Щодня з 9:00 до 5:00',
}


def get_address(lang='cs'):
    return ADDRESSES.get(lang, ADDRESSES['cs'])


def get_opening_hours(lang='cs'):
    return OPENING_HOURS.get(lang, OPENING_HOURS['cs'])
