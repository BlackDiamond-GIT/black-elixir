# -*- coding: utf-8 -*-
"""Stáhnout z webu článek s medicínskými tvrzeními (imunita, kortizol, léčba zranění).

Článek zmiňoval i odstraněné typy masáží (klasická, thajská, aromaterapie).
Ze seedu (create_initial_posts) byl vyřazen; tahle migrace ho odpublikuje na produkci.
"""
from django.db import migrations


def unpublish(apps, schema_editor):
    Post = apps.get_model('blog', 'Post')
    Post.objects.filter(slug='koristi-masazu-pro-zdorovi').update(is_published=False)


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(unpublish, migrations.RunPython.noop),
    ]
