from django.db import models
from django.utils.translation import gettext_lazy as _


class Post(models.Model):
    slug = models.SlugField(_('Slug'), unique=True, max_length=100)

    title_cs = models.CharField(_('Title (CS)'), max_length=200)
    title_en = models.CharField(_('Title (EN)'), max_length=200)
    title_ru = models.CharField(_('Title (RU)'), max_length=200)

    excerpt_cs = models.CharField(_('Excerpt (CS)'), max_length=500, default='')
    excerpt_en = models.CharField(_('Excerpt (EN)'), max_length=500, default='')
    excerpt_ru = models.CharField(_('Excerpt (RU)'), max_length=500, default='')

    content_cs = models.TextField(_('Content (CS)'))
    content_en = models.TextField(_('Content (EN)'))
    content_ru = models.TextField(_('Content (RU)'))

    image = models.ImageField(_('Image'), upload_to='blog/', blank=True)
    image_alt = models.CharField(_('Image alt'), max_length=200, default='')

    published_at = models.DateTimeField(_('Published at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('Updated at'), auto_now=True)

    is_published = models.BooleanField(_('Published'), default=True)

    class Meta:
        ordering = ['-published_at']
        verbose_name = _('Post')
        verbose_name_plural = _('Posts')

    def __str__(self):
        return self.title_cs
