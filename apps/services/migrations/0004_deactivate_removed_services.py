# Generated manually — deactivates services removed from seed_catalog.py

from django.db import migrations


def deactivate_removed_services(apps, schema_editor):
    MassageType = apps.get_model('services', 'MassageType')
    MassageType.objects.filter(
        slug__in=['lymfaticka-masaz', 'sportovni-masaz']
    ).update(is_active=False)


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0003_work_location_and_shift'),
    ]

    operations = [
        migrations.RunPython(
            deactivate_removed_services,
            migrations.RunPython.noop,
        ),
    ]
