from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='massagetype',
            name='image',
            field=models.ImageField(blank=True, upload_to='services/'),
        ),
        migrations.AddField(
            model_name='massagetype',
            name='image_alt',
            field=models.CharField(blank=True, default='', max_length=200),
        ),
    ]
