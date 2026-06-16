"""Weekly shift pattern synced from tantra-prague.com/cs/rozvrh/ (Jun 2026).

Keys are masseuse slugs. Values map weekday (0=Mon … 6=Sun) to shift start time.
Only masseuses present in our catalog are listed.
"""

WEEKLY_SHIFTS = {
    'julia': {
        1: '09:00',  # Tue
        2: '09:00',  # Wed
        3: '09:00',  # Thu
        4: '09:00',  # Fri
    },
    'diana': {
        1: '09:00',  # Tue
        2: '09:00',  # Wed
        3: '09:00',  # Thu
        4: '09:00',  # Fri
        5: '09:00',  # Sat
    },
    'vanessa': {
        1: '11:00',  # Tue — 11:00–04:00
        2: '09:00',  # Wed — 09:00–04:00
        3: '09:00',  # Thu — 09:00–20:30
    },
    'laura': {
        3: '18:30',  # Thu — 18:30–04:00
        4: '18:30',  # Fri
        5: '18:30',  # Sat
        6: '18:30',  # Sun
    },
}
