GRID_TIMES = ['09:00', '11:00', '18:30', '20:30', '02:00', '04:00', '06:00']


def time_to_minutes(value):
    hour, minute = map(int, value.split(':'))
    return hour * 60 + minute


def format_time_range(start, end):
    return f'{start}–{end}'


def is_overnight(start, end):
    return time_to_minutes(end) <= time_to_minutes(start)


def expand_shift_times(start, end, grid_times=None):
    """Return grid time rows where a shift is active (incl. after midnight)."""
    grid_times = grid_times or GRID_TIMES
    start_m = time_to_minutes(start)
    end_m = time_to_minutes(end)
    overnight = end_m <= start_m

    active = []
    for slot_time in grid_times:
        current = time_to_minutes(slot_time)
        if overnight:
            if current >= start_m or current <= end_m:
                active.append(slot_time)
        elif start_m <= current <= end_m:
            active.append(slot_time)
    return active


def is_active_at(start, end, shift_weekday, now_weekday, now_minutes):
    """True if local time falls inside a shift (handles overnight spans)."""
    start_m = time_to_minutes(start)
    end_m = time_to_minutes(end)

    if not is_overnight(start, end):
        if now_weekday != shift_weekday:
            return False
        return start_m <= now_minutes <= end_m

    next_day = (shift_weekday + 1) % 7
    if now_weekday == shift_weekday and now_minutes >= start_m:
        return True
    if now_weekday == next_day and now_minutes <= end_m:
        return True
    return False


def split_shift_to_days(start, end, shift_weekday):
    """Split one shift into display entries keyed by weekday."""
    entries_by_day = {day: [] for day in range(7)}

    entries_by_day[shift_weekday].append({
        'start': start,
        'end': end,
        'is_continuation': False,
    })

    if is_overnight(start, end):
        next_day = (shift_weekday + 1) % 7
        entries_by_day[next_day].append({
            'start': '00:00',
            'end': end,
            'is_continuation': True,
        })

    return entries_by_day


def merge_shift_days(all_shift_entries):
    """Merge multiple shift splits into one dict weekday -> entries list."""
    merged = {day: [] for day in range(7)}
    for day_entries in all_shift_entries:
        for day, entries in day_entries.items():
            merged[day].extend(entries)

    for day in range(7):
        merged[day].sort(key=lambda item: (not item['is_continuation'], item['start']))

    return merged
