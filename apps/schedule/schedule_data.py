from datetime import datetime

TIMES = ['09:00', '11:00', '18:30', '20:30', '02:00', '04:00', '06:00']

DAYS_SHORT = {
    'cs': ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'],
    'en': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    'ru': ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    'uk': ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'],
}


def today_weekday_index():
    return datetime.now().weekday()


def build_schedule_context(masseuses, lang='cs'):
    from apps.schedule.schedule_cards import build_schedule_cards_context
    return build_schedule_cards_context(masseuses, lang)
