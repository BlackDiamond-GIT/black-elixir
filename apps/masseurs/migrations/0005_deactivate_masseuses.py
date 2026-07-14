# -*- coding: utf-8 -*-
"""Deaktivace profilů masérek (Varianta B — personál se na webu nezobrazuje).

Seed je dříve při každém deployi aktivoval; bootstrap_site už je neseeduje
a rozvrh zmizel z ceníku. Tahle migrace zneviditelní existující řádky v DB.
"""
from django.db import migrations


def deactivate(apps, schema_editor):
    Masseuse = apps.get_model('masseurs', 'Masseuse')
    Masseuse.objects.update(is_active=False)


class Migration(migrations.Migration):

    dependencies = [
        ('masseurs', '0004_work_location_and_shift'),
    ]

    operations = [
        migrations.RunPython(deactivate, migrations.RunPython.noop),
    ]
