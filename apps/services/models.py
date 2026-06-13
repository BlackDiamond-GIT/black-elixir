from django.db import models
from django.utils.translation import gettext_lazy as _


class MassageType(models.Model):
    slug = models.SlugField(_('Slug'), unique=True, max_length=100)
    name_cs = models.CharField(_('Name (CS)'), max_length=100)
    name_en = models.CharField(_('Name (EN)'), max_length=100)
    name_ru = models.CharField(_('Name (RU)'), max_length=100)

    description_cs = models.TextField(_('Description (CS)'))
    description_en = models.TextField(_('Description (EN)'))
    description_ru = models.TextField(_('Description (RU)'))

    duration_minutes = models.IntegerField(_('Duration (minutes)'))
    base_price = models.IntegerField(_('Base price'))

    meta_title = models.CharField(_('Meta title'), max_length=60, default='')
    meta_description = models.CharField(_('Meta description'), max_length=160, default='')

    image = models.ImageField(_('Image'), upload_to='services/', blank=True)
    image_alt = models.CharField(_('Image alt'), max_length=200, default='', blank=True)

    order = models.IntegerField(_('Order'), default=0)
    is_active = models.BooleanField(_('Active'), default=True)

    class Meta:
        ordering = ['order']
        verbose_name = _('Massage type')
        verbose_name_plural = _('Massage types')

    def __str__(self):
        return self.name_cs
