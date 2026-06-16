from datetime import datetime

from django.utils import timezone

from apps.core.i18n_utils import localized_field
from apps.schedule.models import TimeSlot, WorkLocation
from apps.schedule.shift_utils import expand_shift_times
from apps.schedule.weekly_schedule import DEFAULT_LOCATION, SHIFT_LABELS, WEEKLY_SHIFTS

TIMES = ['09:00', '11:00', '18:30', '20:30', '02:00', '04:00', '06:00']
NIGHT_ROW_TIMES = {'02:00', '04:00', '06:00'}

DAYS_SHORT = {
    'cs': ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'],
    'en': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    'ru': ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
}


def today_weekday_index():
    return datetime.now().weekday()


def _shift_label(shift_type, lang):
    labels = SHIFT_LABELS.get(shift_type, SHIFT_LABELS['day'])
    return labels.get(lang, labels['cs'])


def _location_maps(lang):
    locations = WorkLocation.objects.filter(is_active=True)
    by_slug = {loc.slug: loc for loc in locations}
    labels = {}
    addresses = {}
    for slug, loc in by_slug.items():
        labels[slug] = localized_field(loc, 'name', lang)
        addresses[slug] = localized_field(loc, 'address', lang)
    return labels, addresses


def _slot_dict(slot_id, masseuse, service, lang, is_booked, shift_meta):
    return {
        'id': slot_id,
        'masseuse_id': masseuse.id,
        'masseuse_name': masseuse.name,
        'service_name': localized_field(service, 'name', lang),
        'is_booked': is_booked,
        'location_name': shift_meta.get('location_name', ''),
        'location_address': shift_meta.get('location_address', ''),
        'shift_label': shift_meta.get('shift_label', ''),
        'shift_type': shift_meta.get('shift_type', ''),
    }


def _primary_service(masseuse):
    services = list(masseuse.services.filter(is_active=True))
    return services[0] if services else None


def build_demo_grid(masseuses, lang='cs'):
    grid = {day: {time: [] for time in TIMES} for day in range(7)}
    slot_id = 1
    masseuse_by_slug = {m.slug: m for m in masseuses}
    location_labels, location_addresses = _location_maps(lang)

    for slug, day_shifts in WEEKLY_SHIFTS.items():
        masseuse = masseuse_by_slug.get(slug)
        if not masseuse:
            continue

        service = _primary_service(masseuse)
        if not service:
            continue

        for day, shift in day_shifts.items():
            location_slug = shift.get('location', DEFAULT_LOCATION)
            shift_meta = {
                'location_name': location_labels.get(location_slug, ''),
                'location_address': location_addresses.get(location_slug, ''),
                'shift_label': _shift_label(shift.get('shift', 'day'), lang),
                'shift_type': shift.get('shift', 'day'),
            }
            for time in expand_shift_times(shift['start'], shift['end']):
                grid[day][time].append(
                    _slot_dict(slot_id, masseuse, service, lang, False, shift_meta)
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
        rows.append({
            'time': time,
            'is_night_row': time in NIGHT_ROW_TIMES,
            'cells': cells,
        })
    return rows


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
