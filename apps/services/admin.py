from django.contrib import admin
from django.utils.html import format_html

from .models import MassageType


@admin.register(MassageType)
class MassageTypeAdmin(admin.ModelAdmin):
    list_display = ('name_cs', 'duration_minutes', 'base_price', 'is_active', 'order', 'image_preview')
    list_filter = ('is_active',)
    search_fields = ('name_cs', 'name_en', 'name_ru')
    prepopulated_fields = {'slug': ('name_cs',)}
    readonly_fields = ('image_preview',)
    fieldsets = (
        (None, {
            'fields': ('slug', 'name_cs', 'name_en', 'name_ru', 'order', 'is_active'),
        }),
        ('Image', {
            'fields': ('image', 'image_alt', 'image_preview'),
        }),
        ('Content', {
            'fields': (
                'description_cs', 'description_en', 'description_ru',
                'duration_minutes', 'base_price',
                'meta_title', 'meta_description',
            ),
        }),
    )

    @admin.display(description='Preview')
    def image_preview(self, obj):
        if not obj.image:
            return '—'
        return format_html(
            '<img src="{}" alt="" style="max-height:120px;border-radius:4px;">',
            obj.image.url,
        )
