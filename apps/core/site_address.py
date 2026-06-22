"""Salon address — single source of truth."""

STREET = 'Soukenická'
POSTAL_CODE = '110 00'
DISTRICT = 'Nové Město'

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


def get_address(lang='cs'):
    return ADDRESSES.get(lang, ADDRESSES['cs'])
