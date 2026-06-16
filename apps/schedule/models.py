from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.masseurs.models import Masseuse
from apps.services.models import MassageType


class WorkLocation(models.Model):
    slug = models.SlugField(_('Slug'), unique=True, max_length=100)
    name_cs = models.CharField(_('Name (CS)'), max_length=120)
    name_en = models.CharField(_('Name (EN)'), max_length=120)
    name_ru = models.CharField(_('Name (RU)'), max_length=120)
    address_cs = models.CharField(_('Address (CS)'), max_length=255)
    address_en = models.CharField(_('Address (EN)'), max_length=255)
    address_ru = models.CharField(_('Address (RU)'), max_length=255)
    order = models.IntegerField(_('Order'), default=0)
    is_active = models.BooleanField(_('Active'), default=True)

    class Meta:
        ordering = ['order', 'slug']
        verbose_name = _('Work location')
        verbose_name_plural = _('Work locations')

    def __str__(self):
        return self.name_cs


class TimeSlot(models.Model):
    SHIFT_DAY = 'day'
    SHIFT_NIGHT = 'night'
    SHIFT_CHOICES = [
        (SHIFT_DAY, _('Day shift')),
        (SHIFT_NIGHT, _('Night shift')),
    ]

    masseuse = models.ForeignKey(
        Masseuse,
        on_delete=models.CASCADE,
        related_name='slots',
        verbose_name=_('Masseuse'),
    )
    service = models.ForeignKey(
        MassageType,
        on_delete=models.CASCADE,
        verbose_name=_('Massage type'),
    )
    location = models.ForeignKey(
        WorkLocation,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='slots',
        verbose_name=_('Location'),
    )
    shift_type = models.CharField(
        _('Shift type'),
        max_length=8,
        choices=SHIFT_CHOICES,
        blank=True,
    )

    start_time = models.DateTimeField(_('Start time'), db_index=True)
    is_booked = models.BooleanField(_('Is booked'), default=False, db_index=True)

    created_at = models.DateTimeField(_('Created at'), auto_now_add=True)

    class Meta:
        ordering = ['start_time']
        unique_together = ['masseuse', 'start_time', 'service']
        verbose_name = _('Time slot')
        verbose_name_plural = _('Time slots')

    def __str__(self):
        return f'{self.masseuse.name} - {self.start_time.strftime("%Y-%m-%d %H:%M")}'
