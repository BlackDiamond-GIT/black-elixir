from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _

from apps.core.admin_forms import rich_text_widgets
from apps.core.elixir_admin import ElixirModelAdmin

from .models import MassageType


@admin.register(MassageType)
class MassageTypeAdmin(ElixirModelAdmin):
    list_display = ('name_cs', 'duration_minutes', 'base_price', 'is_active', 'order', 'image_preview')
    list_filter = ('is_active',)
    list_editable = ('is_active', 'order')
    search_fields = ('name_cs', 'name_en', 'name_ru')
    prepopulated_fields = {'slug': ('name_cs',)}
    readonly_fields = ('image_preview',)
    fieldsets = (
        (None, {
            'fields': ('slug', 'name_cs', 'name_en', 'name_ru', 'order', 'is_active'),
        }),
        (_('Зображення'), {
            'fields': ('image', 'image_alt', 'image_preview'),
        }),
        (_('Контент (CS)'), {
            'fields': ('description_cs',),
        }),
        (_('Контент (EN)'), {
            'fields': ('description_en',),
        }),
        (_('Контент (RU)'), {
            'fields': ('description_ru',),
        }),
        (_('Ціна та тривалість'), {
            'fields': ('duration_minutes', 'base_price'),
        }),
        (_('SEO'), {
            'fields': ('meta_title', 'meta_description'),
            'classes': ('collapse',),
        }),
    )

    def get_form(self, request, obj=None, **kwargs):
        kwargs.setdefault('widgets', {})
        kwargs['widgets'].update(rich_text_widgets(
            'description_cs', 'description_en', 'description_ru',
        ))
        return super().get_form(request, obj, **kwargs)

    @admin.display(description=_('Náhled'))
    def image_preview(self, obj):
        if not obj.image:
            return '—'
        return format_html(
            '<img src="{}" alt="" style="max-height:120px;border-radius:4px;">',
            obj.image.url,
        )
