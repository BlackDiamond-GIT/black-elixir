from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.services.models import MassageType


class Masseuse(models.Model):
    name = models.CharField(_('Name'), max_length=100)
    slug = models.SlugField(_('Slug'), unique=True, max_length=100)

    bio_cs = models.TextField(_('Bio (CS)'))
    bio_en = models.TextField(_('Bio (EN)'))
    bio_ru = models.TextField(_('Bio (RU)'))

    spec_cs = models.CharField(_('Specialization (CS)'), max_length=200)
    spec_en = models.CharField(_('Specialization (EN)'), max_length=200)
    spec_ru = models.CharField(_('Specialization (RU)'), max_length=200)

    photo = models.ImageField(_('Photo'), upload_to='masseuses/', blank=True)
    main_cloudinary_photo = models.ForeignKey(
        'media_library.CloudinaryImage',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='masseuse_main',
        verbose_name=_('Main photo (Cloudinary)'),
    )
    gallery_cloudinary = models.ManyToManyField(
        'media_library.CloudinaryImage',
        blank=True,
        related_name='masseuse_gallery',
        verbose_name=_('Gallery (Cloudinary)'),
    )
    photo_alt = models.CharField(_('Photo alt'), max_length=200)

    meta_title = models.CharField(_('Meta title'), max_length=60, default='')
    meta_description = models.CharField(_('Meta description'), max_length=160, default='')

    services = models.ManyToManyField(MassageType, verbose_name=_('Services'))
    exp_years = models.IntegerField(_('Years of experience'), default=0)

    is_active = models.BooleanField(_('Active'), default=True)
    order = models.IntegerField(_('Order'), default=0)

    created_at = models.DateTimeField(_('Created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Updated at'), auto_now=True)

    class Meta:
        ordering = ['order', 'name']
        verbose_name = _('Masseuse')
        verbose_name_plural = _('Masseuses')

    def __str__(self):
        return self.name

    @property
    def photo_url(self):
        if self.main_cloudinary_photo_id:
            return self.main_cloudinary_photo.thumbnail_url
        if self.photo:
            return self.photo.url
        return ''
