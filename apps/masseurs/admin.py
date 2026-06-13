from django.contrib import admin
from django.utils.html import format_html

from .models import Masseuse


@admin.register(Masseuse)
class MasseuseAdmin(admin.ModelAdmin):
    list_display = ('name', 'exp_years', 'is_active', 'order', 'photo_preview')
    list_filter = ('is_active', 'exp_years')
    search_fields = ('name', 'bio_cs')
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ('created_at', 'updated_at', 'photo_preview')
    filter_horizontal = ('services',)
    fieldsets = (
        (None, {
            'fields': ('name', 'slug', 'exp_years', 'order', 'is_active', 'services'),
        }),
        ('Photo', {
            'fields': ('photo', 'photo_alt', 'photo_preview'),
        }),
        ('Content', {
            'fields': (
                'bio_cs', 'bio_en', 'bio_ru',
                'spec_cs', 'spec_en', 'spec_ru',
                'meta_title', 'meta_description',
            ),
        }),
        ('Meta', {
            'fields': ('created_at', 'updated_at'),
        }),
    )

    @admin.display(description='Preview')
    def photo_preview(self, obj):
        if not obj.photo:
            return '—'
        return format_html(
            '<img src="{}" alt="" style="max-height:120px;border-radius:4px;">',
            obj.photo.url,
        )
