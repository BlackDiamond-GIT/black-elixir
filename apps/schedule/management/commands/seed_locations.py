from django.core.management.base import BaseCommand

from apps.schedule.models import WorkLocation
from apps.schedule.weekly_schedule import LOCATION_CATALOG


class Command(BaseCommand):
    help = 'Seed work locations for schedule shifts'

    def handle(self, *args, **options):
        created = 0
        catalog_slugs = {item['slug'] for item in LOCATION_CATALOG}

        for item in LOCATION_CATALOG:
            _, was_created = WorkLocation.objects.update_or_create(
                slug=item['slug'],
                defaults={
                    'name_cs': item['name_cs'],
                    'name_en': item['name_en'],
                    'name_ru': item['name_ru'],
                    'address_cs': item['address_cs'],
                    'address_en': item['address_en'],
                    'address_ru': item['address_ru'],
                    'order': item['order'],
                    'is_active': True,
                },
            )
            if was_created:
                created += 1

        deactivated = WorkLocation.objects.exclude(slug__in=catalog_slugs).update(is_active=False)
        if deactivated:
            self.stdout.write(f'Deactivated {deactivated} old location(s)')

        self.stdout.write(self.style.SUCCESS(f'Locations ready ({created} new)'))
