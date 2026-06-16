from datetime import datetime

from django.utils import timezone

from apps.core.i18n_utils import localized_field
from apps.schedule.models import TimeSlot
from apps.schedule.weekly_schedule import WEEKLY_SHIFTS

TIMES = ['09:00', '11:00', '18:30', '20:30', '02:00', '04:00', '06:00']

DAYS_SHORT = {
    'cs': ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'],
    'en': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    'ru': ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
}


def today_weekday_index():
    return datetime.now().weekday()


def _slot_dict(slot_id, masseuse, service, lang, is_booked):
    return {
        'id': slot_id,
        'masseuse_id': masseuse.id,
        'masseuse_name': masseuse.name,
        'service_name': localized_field(service, 'name', lang),
        'is_booked': is_booked,
    }


def _primary_service(masseuse):
    services = list(masseuse.services.filter(is_active=True))
    return services[0] if services else None


def build_demo_grid(masseuses, lang='cs'):
    grid = {day: {time: [] for time in TIMES} for day in range(7)}
    slot_id = 1
    masseuse_by_slug = {m.slug: m for m in masseuses}

    for slug, day_shifts in WEEKLY_SHIFTS.items():
        masseuse = masseuse_by_slug.get(slug)
        if not masseuse:
            continue

        service = _primary_service(masseuse)
        if not service:
            continue

        for day, time in day_shifts.items():
            if time not in TIMES:
                continue
            grid[day][time].append(
                _slot_dict(slot_id, masseuse, service, lang, False)
            )
            slot_id += 1

    return grid


def _booked_lookup(slots):
    lookup = {}
    for slot in slots:
        if not slot.is_booked:
            continue
        local_start = timezone.localtime(slot.start_time)
        lookup[(local_start.weekday(), local_start.strftime('%H:%M'), slot.masseuse_id)] = True
    return lookup


def apply_booked_status(grid, booked_lookup):
    for day in range(7):
        for time in TIMES:
            for slot in grid[day][time]:
                key = (day, time, slot['masseuse_id'])
                slot['is_booked'] = booked_lookup.get(key, False)


def build_schedule_context(masseuses, lang='cs'):
    today_idx = today_weekday_index()
    grid = build_demo_grid(masseuses, lang)

    booked_slots = TimeSlot.objects.filter(is_booked=True).select_related('masseuse')
    apply_booked_status(grid, _booked_lookup(booked_slots))

    return {
        'masseuses': masseuses,
        'times': TIMES,
        'days_short': DAYS_SHORT.get(lang, DAYS_SHORT['cs']),
        'today_idx': today_idx,
        'rows': build_schedule_rows(grid, today_idx),
    }


def build_db_grid(slots, lang='cs'):
    grid = {day: {time: [] for time in TIMES} for day in range(7)}
    seen = set()

    for slot in slots:
        local_start = timezone.localtime(slot.start_time)
        time_str = local_start.strftime('%H:%M')
        if time_str not in TIMES:
            continue

        day = local_start.weekday()
        key = (day, time_str, slot.masseuse_id)
        if key in seen:
            continue
        seen.add(key)

        grid[day][time_str].append(
            _slot_dict(slot.id, slot.masseuse, slot.service, lang, slot.is_booked)
        )

    return grid


def build_schedule_rows(grid, today_idx):
    rows = []
    for time in TIMES:
        cells = []
        for day in range(7):
            cells.append({
                'day': day,
                'is_today': day == today_idx,
                'slots': grid[day][time],
            })
        rows.append({'time': time, 'cells': cells})
    return rows
