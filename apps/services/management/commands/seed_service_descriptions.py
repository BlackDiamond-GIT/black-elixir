from django.core.management.base import BaseCommand

from apps.services.models import MassageType
from apps.services.seed_catalog import SERVICE_CATALOG
from apps.services.seed_content import generate_service_descriptions


class Command(BaseCommand):
    help = 'Seed or update massage service descriptions and meta tags'

    def handle(self, *args, **options):
        for item in SERVICE_CATALOG:
            content = generate_service_descriptions(item)
            service, created = MassageType.objects.update_or_create(
                slug=item['slug'],
                defaults={
                    'name_cs': item['name_cs'],
                    'name_en': item['name_en'],
                    'name_ru': item['name_ru'],
                    'duration_minutes': item['duration_minutes'],
                    'base_price': item['base_price'],
                    'order': item['order'],
                    'description_cs': content['description_cs'],
                    'description_en': content['description_en'],
                    'description_ru': content['description_ru'],
                    'meta_title': content['meta_title'],
                    'meta_description': content['meta_description'],
                    'is_active': True,
                },
            )
            status = 'Created' if created else 'Updated'
            word_count = len(content['description_cs'].split())
            self.stdout.write(
                self.style.SUCCESS(f'{status}: {service.name_cs} ({word_count} words CS)')
            )

        active_slugs = {item['slug'] for item in SERVICE_CATALOG}
        deactivated = MassageType.objects.exclude(slug__in=active_slugs).update(
            is_active=False,
            description_cs='',
            description_en='',
            description_ru='',
            meta_title='',
            meta_description='',
        )
        if deactivated:
            self.stdout.write(
                self.style.WARNING(f'Deactivated and cleared {deactivated} obsolete service(s)')
            )
