from django.core.management import call_command
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Idempotent production bootstrap: services, masseuses, blog posts'

    def handle(self, *args, **options):
        call_command('seed_service_descriptions')
        call_command('seed_masseuse_descriptions')
        call_command('create_initial_posts')
        call_command('ensure_admin')
        self.stdout.write(self.style.SUCCESS('Site bootstrap completed.'))
