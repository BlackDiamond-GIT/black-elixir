from datetime import datetime, timedelta

from django.core.management.base import BaseCommand
from django.utils import timezone

from apps.masseurs.models import Masseuse
from apps.schedule.models import TimeSlot
from apps.schedule.weekly_schedule import WEEKLY_SHIFTS


def _week_start(reference=None):
    ref = reference or timezone.localdate()
    return ref - timedelta(days=ref.weekday())


def _shift_datetime(week_start, weekday, time_str):
    hour, minute = map(int, time_str.split(':'))
    day = week_start + timedelta(days=weekday)
    naive = datetime.combine(day, datetime.min.time().replace(hour=hour, minute=minute))
    return timezone.make_aware(naive, timezone.get_current_timezone())


class Command(BaseCommand):
    help = 'Sync weekly schedule from tantra-prague pattern into TimeSlot records'

    def add_arguments(self, parser):
        parser.add_argument(
            '--weeks',
            type=int,
            default=2,
            help='Number of weeks ahead to generate (default: 2)',
        )

    def handle(self, *args, **options):
        weeks = max(1, options['weeks'])
        now = timezone.now()
        week_start = _week_start()

        deleted, _ = TimeSlot.objects.filter(
            is_booked=False,
            start_time__gte=now,
        ).delete()
        self.stdout.write(f'Removed {deleted} unbooked future slots')

        masseuse_by_slug = {
            m.slug: m for m in Masseuse.objects.filter(is_active=True).prefetch_related('services')
        }
        created = 0

        for week_offset in range(weeks):
            start = week_start + timedelta(weeks=week_offset)

            for slug, day_shifts in WEEKLY_SHIFTS.items():
                masseuse = masseuse_by_slug.get(slug)
                if not masseuse:
                    self.stdout.write(self.style.WARNING(f'Skip unknown slug: {slug}'))
                    continue

                services = list(masseuse.services.filter(is_active=True))
                if not services:
                    continue

                for weekday, time_str in day_shifts.items():
                    start_time = _shift_datetime(start, weekday, time_str)
                    if start_time < now:
                        continue

                    for service in services:
                        _, was_created = TimeSlot.objects.get_or_create(
                            masseuse=masseuse,
                            service=service,
                            start_time=start_time,
                            defaults={'is_booked': False},
                        )
                        if was_created:
                            created += 1

        self.stdout.write(self.style.SUCCESS(f'Created {created} schedule slots'))
