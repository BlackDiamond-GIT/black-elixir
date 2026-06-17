"""Sync schedule from tantra-prague.com Hub API into local TimeSlot records.

Replaces the previous approach of hardcoded WEEKLY_SHIFTS in weekly_schedule.py.
Hub API provides date-specific entries (not recurring weekday patterns).

Flow:
  Hub API /api/v1/black-elixir/schedule/ → raw entries (who works when) →
  1. Cache weekly patterns (for schedule page display)
  2. Expand into individual TimeSlots (per booking slot) using shift_utils →
     upsert into local TimeSlot table (leave is_booked=True slots untouched)
"""

from __future__ import annotations

import datetime
from collections import defaultdict

from django.core.cache import cache
from django.core.management.base import BaseCommand
from django.utils import timezone

from apps.hub_client.client import HubClient
from apps.hub_client.exceptions import HubAPIError, HubUnavailableError
from apps.masseurs.models import Masseuse
from apps.schedule.models import TimeSlot, WorkLocation
from apps.schedule.shift_utils import expand_shift_times
from apps.schedule.weekly_schedule import WEEKLY_SHIFTS

# Key used by schedule_cards.py to read patterns built from hub sync
HUB_SHIFTS_CACHE_KEY = "hub:weekly_shifts"
HUB_SHIFTS_CACHE_TTL = 86400  # 24h — cron refreshes every 30 min


def _shift_datetime(day: datetime.date, time_str: str) -> datetime.datetime:
    hour, minute = map(int, time_str.split(':'))
    naive = datetime.datetime.combine(day, datetime.time(hour, minute))
    return timezone.make_aware(naive, timezone.get_current_timezone())


def _weekly_fallback_entries(days: int) -> list[dict]:
    """Build date-specific entries from hardcoded WEEKLY_SHIFTS."""
    today = timezone.localdate()
    entries: list[dict] = []
    for offset in range(days):
        day = today + datetime.timedelta(days=offset)
        weekday = day.weekday()
        for slug, day_shifts in WEEKLY_SHIFTS.items():
            shift = day_shifts.get(weekday)
            if not shift:
                continue
            entries.append({
                'date': day.isoformat(),
                'masseuse_slug': slug,
                'time_from': shift['start'],
                'time_to': shift['end'],
                'shift_type': shift.get('shift', 'day'),
            })
    return entries


def _build_weekly_patterns(raw_entries: list[dict]) -> dict:
    """Convert date-specific hub entries to WEEKLY_SHIFTS-compatible dict.

    Returns {masseuse_slug: {weekday(0-6): {start, end, shift}}}
    Each weekday keeps only the most-recent entry (last sync wins).
    """
    patterns: dict[str, dict] = defaultdict(dict)
    for entry in raw_entries:
        day = datetime.date.fromisoformat(entry["date"])
        weekday = day.weekday()
        slug = entry["masseuse_slug"]
        patterns[slug][weekday] = {
            "start": entry["time_from"],
            "end": entry["time_to"],
            "shift": entry.get("shift_type", "day"),
        }
    return dict(patterns)


class Command(BaseCommand):
    help = "Sync schedule from tantra-prague.com Hub API into local TimeSlot records."

    def add_arguments(self, parser):
        parser.add_argument(
            "--days",
            type=int,
            default=35,
            help="Number of days ahead to fetch (default: 35)",
        )
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Count only, do not write to DB",
        )

    def handle(self, *args, **options):
        days = options["days"]
        dry_run = options["dry_run"]
        now = timezone.now()

        client = HubClient()
        source = 'hub'
        try:
            raw_entries = client.fetch_schedule_json(days=days)
        except HubUnavailableError as exc:
            self.stderr.write(
                self.style.WARNING(f'Hub unavailable: {exc}. Using WEEKLY_SHIFTS fallback.')
            )
            raw_entries = _weekly_fallback_entries(days)
            source = 'fallback'
        except HubAPIError as exc:
            self.stderr.write(
                self.style.WARNING(
                    f'Hub API error ({exc.status_code}): {exc}. Using WEEKLY_SHIFTS fallback.'
                )
            )
            raw_entries = _weekly_fallback_entries(days)
            source = 'fallback'

        # Always update the weekly patterns cache (used by schedule page display)
        weekly_patterns = _build_weekly_patterns(raw_entries)
        if not dry_run:
            cache.set(HUB_SHIFTS_CACHE_KEY, weekly_patterns, HUB_SHIFTS_CACHE_TTL)
            self.stdout.write(f"Cached weekly patterns for {len(weekly_patterns)} masseuses.")

        masseuse_by_slug = {
            m.slug: m
            for m in Masseuse.objects.filter(is_active=True).prefetch_related("services")
        }
        default_location = WorkLocation.objects.filter(is_active=True).first()

        skipped = 0
        created = 0

        for entry in raw_entries:
            masseuse = masseuse_by_slug.get(entry["masseuse_slug"])
            if not masseuse:
                skipped += 1
                continue

            services = list(masseuse.services.filter(is_active=True))
            if not services:
                skipped += 1
                continue

            day = datetime.date.fromisoformat(entry["date"])
            shift_type = entry.get("shift_type", TimeSlot.SHIFT_DAY)

            for time_str in expand_shift_times(entry["time_from"], entry["time_to"]):
                start_time = _shift_datetime(day, time_str)
                if start_time < now:
                    continue

                if dry_run:
                    created += len(services)
                    continue

                for service in services:
                    _, was_created = TimeSlot.objects.get_or_create(
                        masseuse=masseuse,
                        service=service,
                        start_time=start_time,
                        defaults={
                            "is_booked": False,
                            "location": default_location,
                            "shift_type": shift_type,
                        },
                    )
                    if was_created:
                        created += 1

        prefix = "[dry-run] " if dry_run else ""
        self.stdout.write(
            f"{prefix}Fetched {len(raw_entries)} entries, created {created} slots, "
            f"skipped {skipped} (unknown masseuse/no services)"
        )
        if not dry_run:
            self.stdout.write(self.style.SUCCESS(f'Schedule synced from {source}.'))

