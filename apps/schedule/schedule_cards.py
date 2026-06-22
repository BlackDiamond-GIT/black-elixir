from django.utils import timezone

from apps.core.i18n_utils import localized_field
from apps.schedule.models import TimeSlot, WorkLocation
from apps.schedule.schedule_data import DAYS_SHORT, today_weekday_index
from apps.schedule.shift_utils import (
    format_time_range,
    is_active_at,
    merge_shift_days,
    split_shift_to_days,
)
from apps.core.site_address import get_address
from apps.schedule.weekly_schedule import DEFAULT_LOCATION, SHIFT_LABELS, WEEKLY_SHIFTS

CONTINUATION_LABELS = {
    'cs': 'Pokračování noci',
    'en': 'Night continuation',
    'ru': 'Продолжение ночи',
    'uk': 'Продовження ночі',
}

# Cache key where sync_schedule writes hub-derived weekly patterns
_HUB_SHIFTS_CACHE_KEY = "hub:weekly_shifts"


def _shifts_source() -> dict:
    """Return WEEKLY_SHIFTS dict — prefer hub-synced cache over hardcoded fallback."""
    from django.core.cache import cache

    cached = cache.get(_HUB_SHIFTS_CACHE_KEY)
    if cached:
        return cached
    return WEEKLY_SHIFTS


def _shift_label(shift_type, lang):
    labels = SHIFT_LABELS.get(shift_type, SHIFT_LABELS['day'])
    return labels.get(lang, labels.get('uk', labels['cs']))


def _continuation_label(lang):
    return CONTINUATION_LABELS.get(lang, CONTINUATION_LABELS['cs'])


def _salon_address(lang):
    loc = WorkLocation.objects.filter(slug=DEFAULT_LOCATION, is_active=True).first()
    if loc:
        return localized_field(loc, 'address', lang)
    return get_address(lang)['full']


def _location_meta(lang):
    loc = WorkLocation.objects.filter(slug=DEFAULT_LOCATION, is_active=True).first()
    if not loc:
        return '', ''
    return localized_field(loc, 'name', lang), localized_field(loc, 'address', lang)


def _booked_lookup():
    lookup = {}
    for slot in TimeSlot.objects.filter(is_booked=True).select_related('masseuse'):
        local_start = timezone.localtime(slot.start_time)
        lookup[(local_start.weekday(), local_start.strftime('%H:%M'), slot.masseuse_id)] = True
    return lookup


def _resolve_shift_type(raw, weekday, shift_types_by_day):
    if raw['is_continuation']:
        prev = (weekday - 1) % 7
        return shift_types_by_day.get(prev, 'night')
    return shift_types_by_day.get(weekday, 'day')


def _make_entry(raw, shift_type, lang, location_name, location_address):
    is_continuation = raw['is_continuation']
    return {
        'time_range': format_time_range(raw['start'], raw['end']),
        'shift_type': shift_type,
        'shift_label': _shift_label(shift_type, lang),
        'is_continuation': is_continuation,
        'continuation_label': _continuation_label(lang) if is_continuation else '',
        'location_name': location_name,
        'location_address': location_address,
        'is_booked': False,
        'is_night': shift_type == 'night',
        'start': raw['start'],
    }


def _apply_booked_status(days, masseuse_id, booked_lookup):
    for day in days:
        weekday = day['weekday']
        for entry in day['entries']:
            if entry['is_continuation']:
                continue
            key = (weekday, entry['start'], masseuse_id)
            entry['is_booked'] = booked_lookup.get(key, False)


def build_masseuse_week_cards(masseuses, lang='cs'):
    masseuse_by_slug = {m.slug: m for m in masseuses}
    location_name, location_address = _location_meta(lang)
    booked_lookup = _booked_lookup()
    cards = []

    for slug, day_shifts in _shifts_source().items():
        masseuse = masseuse_by_slug.get(slug)
        if not masseuse:
            continue

        shift_types_by_day = {d: s['shift'] for d, s in day_shifts.items()}
        split_parts = [
            split_shift_to_days(shift['start'], shift['end'], weekday)
            for weekday, shift in day_shifts.items()
        ]
        merged = merge_shift_days(split_parts)

        days = []
        for weekday in range(7):
            entries = [
                _make_entry(
                    raw,
                    _resolve_shift_type(raw, weekday, shift_types_by_day),
                    lang,
                    location_name,
                    location_address,
                )
                for raw in merged[weekday]
            ]
            days.append({
                'weekday': weekday,
                'is_free': not entries,
                'entries': entries,
            })

        _apply_booked_status(days, masseuse.id, booked_lookup)

        cards.append({
            'masseuse_id': masseuse.id,
            'masseuse': masseuse,
            'name': masseuse.name,
            'slug': masseuse.slug,
            'spec': localized_field(masseuse, 'spec', lang),
            'days': days,
        })

    return cards


def build_on_shift_now(cards, lang='cs', now=None):
    now = timezone.localtime(now or timezone.now())
    now_weekday = now.weekday()
    now_minutes = now.hour * 60 + now.minute
    active = []

    for slug, day_shifts in _shifts_source().items():
        card = next((c for c in cards if c['slug'] == slug), None)
        if not card:
            continue

        for weekday, shift in day_shifts.items():
            if is_active_at(shift['start'], shift['end'], weekday, now_weekday, now_minutes):
                active.append({
                    'name': card['name'],
                    'time_range': format_time_range(shift['start'], shift['end']),
                    'shift_label': _shift_label(shift.get('shift', 'day'), lang),
                    'shift_type': shift.get('shift', 'day'),
                })
                break

    return active


def build_schedule_cards_context(masseuses, lang='cs'):
    today_idx = today_weekday_index()
    now = timezone.localtime(timezone.now())
    days_short = DAYS_SHORT.get(lang, DAYS_SHORT['cs'])
    masseuse_cards = build_masseuse_week_cards(masseuses, lang)

    for card in masseuse_cards:
        for i, day in enumerate(card['days']):
            day['label'] = days_short[i] if i < len(days_short) else ''

    return {
        'salon_address': _salon_address(lang),
        'now_iso': now.isoformat(),
        'on_shift': build_on_shift_now(masseuse_cards, lang, now),
        'masseuse_cards': masseuse_cards,
        'days_short': days_short,
        'today_idx': today_idx,
        'schedule_masseuse_ids': [c['masseuse_id'] for c in masseuse_cards],
    }
