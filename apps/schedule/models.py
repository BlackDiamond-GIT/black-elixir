from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.masseurs.models import Masseuse
from apps.services.models import MassageType


class TimeSlot(models.Model):
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
