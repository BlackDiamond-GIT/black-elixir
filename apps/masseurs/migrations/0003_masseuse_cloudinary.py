# Generated manually for django-unfold admin

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('media_library', '0001_initial'),
        ('masseurs', '0002_alter_masseuse_photo'),
    ]

    operations = [
        migrations.AddField(
            model_name='masseuse',
            name='main_cloudinary_photo',
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name='masseuse_main',
                to='media_library.cloudinaryimage',
                verbose_name='Головне фото (Cloudinary)',
            ),
        ),
        migrations.AddField(
            model_name='masseuse',
            name='gallery_cloudinary',
            field=models.ManyToManyField(
                blank=True,
                related_name='masseuse_gallery',
                to='media_library.cloudinaryimage',
                verbose_name='Галерея (Cloudinary)',
            ),
        ),
    ]
