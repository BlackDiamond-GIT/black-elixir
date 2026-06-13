from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _

from apps.core.admin_forms import rich_text_widgets
from apps.core.elixir_admin import ElixirModelAdmin

from .models import Masseuse
from .widgets import CloudinaryFKWidget, CloudinaryM2MWidget


@admin.register(Masseuse)
class MasseuseAdmin(ElixirModelAdmin):
    list_display = (
        'photo_preview',
        'name',
        'exp_years',
        'is_active',
        'order',
    )
    list_filter = ('is_active', 'exp_years')
    list_editable = ('is_active', 'order')
    search_fields = ('name', 'slug', 'bio_cs', 'spec_cs')
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ('created_at', 'updated_at', 'photo_preview')
    filter_horizontal = ('services', 'gallery_cloudinary')
    fieldsets = (
        (_('Профіль'), {
            'fields': ('name', 'slug', 'exp_years', 'order', 'is_active', 'services'),
        }),
        (_('Фото — бібліотека Cloudinary'), {
            'fields': ('photo_preview', 'main_cloudinary_photo', 'gallery_cloudinary'),
        }),
        (_('Фото — локальний файл'), {
            'fields': ('photo', 'photo_alt'),
            'classes': ('collapse',),
        }),
        (_('Контент (CS)'), {
            'fields': ('bio_cs', 'spec_cs'),
        }),
        (_('Контент (EN)'), {
            'fields': ('bio_en', 'spec_en'),
        }),
        (_('Контент (RU)'), {
            'fields': ('bio_ru', 'spec_ru'),
        }),
        (_('SEO'), {
            'fields': ('meta_title', 'meta_description'),
            'classes': ('collapse',),
        }),
        (_('Системне'), {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',),
        }),
    )

    def get_form(self, request, obj=None, **kwargs):
        kwargs.setdefault('widgets', {})
        kwargs['widgets'].update(rich_text_widgets('bio_cs', 'bio_en', 'bio_ru'))
        form = super().get_form(request, obj, **kwargs)
        if 'main_cloudinary_photo' in form.base_fields:
            form.base_fields['main_cloudinary_photo'].widget = CloudinaryFKWidget(
                choices=form.base_fields['main_cloudinary_photo'].widget.choices,
            )
        if 'gallery_cloudinary' in form.base_fields:
            form.base_fields['gallery_cloudinary'].widget = CloudinaryM2MWidget(
                choices=form.base_fields['gallery_cloudinary'].widget.choices,
            )
        return form

    @admin.display(description=_('Фото'))
    def photo_preview(self, obj):
        url = obj.photo_url
        if url:
            return format_html(
                '<img src="{}" style="height:60px;width:48px;object-fit:cover;border-radius:4px">',
                url,
            )
        return '—'
