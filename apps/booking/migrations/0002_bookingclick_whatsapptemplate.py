# Generated manually for django-unfold admin

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('booking', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='WhatsAppTemplate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('service_key', models.CharField(
                    choices=[
                        ('general', 'General / No service'),
                        ('klasicka-masaz', 'Classic Massage'),
                        ('cbd-relaxacni-masaz', 'Relax Massage'),
                        ('aromaterapeuticka-masaz', 'Aromatherapy Massage'),
                        ('sportovni-masaz', 'Sports Massage'),
                        ('tehotenska-masaz', 'Prenatal Massage'),
                        ('reflexni-masaz', 'Reflexology'),
                    ],
                    default='general',
                    max_length=30,
                    unique=True,
                    verbose_name='Service key',
                )),
                ('template_cs', models.TextField(help_text='Use {masseuse} and {duration} placeholders.', verbose_name='Message template (CS)')),
                ('template_en', models.TextField(blank=True, verbose_name='Message template (EN)')),
                ('template_ru', models.TextField(blank=True, verbose_name='Message template (RU)')),
            ],
            options={
                'verbose_name': 'WhatsApp Template',
                'verbose_name_plural': 'WhatsApp Templates',
            },
        ),
        migrations.CreateModel(
            name='BookingClick',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('clicked_at', models.DateTimeField(auto_now_add=True, db_index=True, verbose_name='Clicked at')),
                ('channel', models.CharField(db_index=True, max_length=16, verbose_name='Channel')),
                ('placement', models.CharField(db_index=True, max_length=40, verbose_name='Placement')),
                ('page_path', models.CharField(blank=True, max_length=300, verbose_name='Page path')),
                ('lang', models.CharField(blank=True, max_length=5, verbose_name='Language')),
                ('masseuse_slug', models.CharField(blank=True, max_length=100, verbose_name='Masseuse slug')),
                ('service_slug', models.CharField(blank=True, max_length=100, verbose_name='Service slug')),
                ('duration_min', models.PositiveSmallIntegerField(blank=True, null=True, verbose_name='Duration (min)')),
                ('ip_hash', models.CharField(blank=True, max_length=64, verbose_name='IP hash')),
                ('ip_only_hash', models.CharField(blank=True, db_index=True, max_length=64, verbose_name='IP-only hash')),
                ('is_bot', models.BooleanField(db_index=True, default=False, verbose_name='Bot traffic')),
            ],
            options={
                'verbose_name': 'Booking click',
                'verbose_name_plural': 'Booking clicks',
                'ordering': ('-clicked_at',),
                'indexes': [
                    models.Index(fields=['clicked_at', 'placement'], name='booking_boo_clicked_6a8f2d_idx'),
                ],
            },
        ),
    ]
