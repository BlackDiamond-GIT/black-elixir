GRID_TIMES = ['09:00', '11:00', '18:30', '20:30', '02:00', '04:00', '06:00']


def time_to_minutes(value):
    hour, minute = map(int, value.split(':'))
    return hour * 60 + minute


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
