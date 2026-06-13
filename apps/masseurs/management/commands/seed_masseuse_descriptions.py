from django.core.management.base import BaseCommand

from apps.masseurs.models import Masseuse
from apps.masseurs.seed_catalog import MASSEUSE_CATALOG
from apps.masseurs.seed_content import generate_masseuse_content
from apps.services.models import MassageType


class Command(BaseCommand):
    help = 'Seed or update masseuse profiles, bios and service assignments'

    def handle(self, *args, **options):
        for item in MASSEUSE_CATALOG:
            content = generate_masseuse_content(item)
            masseuse, created = Masseuse.objects.update_or_create(
                slug=item['slug'],
                defaults={
                    'name': item['name'],
                    'bio_cs': content['bio_cs'],
                    'bio_en': content['bio_en'],
                    'bio_ru': content['bio_ru'],
                    'spec_cs': item['spec_cs'],
                    'spec_en': item['spec_en'],
                    'spec_ru': item['spec_ru'],
                    'photo_alt': content['photo_alt'],
                    'meta_title': content['meta_title'],
                    'meta_description': content['meta_description'],
                    'exp_years': item['exp_years'],
                    'order': item['order'],
                    'is_active': True,
                },
            )
            services = MassageType.objects.filter(
                slug__in=item['service_slugs'],
                is_active=True,
            )
            masseuse.services.set(services)
            status = 'Created' if created else 'Updated'
            self.stdout.write(
                self.style.SUCCESS(
                    f'{status}: {masseuse.name} ({services.count()} services linked)'
                )
            )

        active_slugs = {item['slug'] for item in MASSEUSE_CATALOG}
        obsolete = Masseuse.objects.exclude(slug__in=active_slugs)
        for masseuse in obsolete:
            masseuse.services.clear()
        deactivated = obsolete.update(
            is_active=False,
            bio_cs='',
            bio_en='',
            bio_ru='',
            spec_cs='',
            spec_en='',
            spec_ru='',
            meta_title='',
            meta_description='',
            photo_alt='',
        )
        if deactivated:
            self.stdout.write(
                self.style.WARNING(f'Deactivated and cleared {deactivated} obsolete masseuse(s)')
            )
