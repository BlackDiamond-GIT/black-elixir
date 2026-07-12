# Generated manually — deactivates all previous services and installs the four
# tantraclub-matching services (VIP, Relaxační, pro ženy, pro páry).
# New services are created by bootstrap_site → seed_service_descriptions on deploy.

from django.db import migrations


def deactivate_old_services(apps, schema_editor):
    MassageType = apps.get_model('services', 'MassageType')
    MassageType.objects.filter(
        slug__in=[
            'klasicka-masaz',
            'cbd-relaxacni-masaz',
            'thajska-masaz',
            'aromaterapie',
        ]
    ).update(is_active=False)


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0004_deactivate_removed_services'),
    ]

    operations = [
        migrations.RunPython(
            deactivate_old_services,
            migrations.RunPython.noop,
        ),
    ]
