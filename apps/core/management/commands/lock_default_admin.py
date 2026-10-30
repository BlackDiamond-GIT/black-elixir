from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

KNOWN_PASSWORDS = ('admin',)


class Command(BaseCommand):
    help = 'Lock any account that still uses a well-known password; never creates users'

    def handle(self, *args, **options):
        User = get_user_model()
        locked = 0
        for user in User.objects.all():
            if user.has_usable_password() and any(user.check_password(p) for p in KNOWN_PASSWORDS):
                user.set_unusable_password()
                user.save()
                locked += 1
                self.stdout.write(f'Secured "{user.get_username()}": password')
        self.stdout.write(self.style.SUCCESS(f'lock_default_admin: {locked} account(s) secured.'))
