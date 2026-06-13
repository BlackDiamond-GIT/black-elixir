from django.contrib import admin
from django.utils.html import format_html

from .models import Post


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title_cs', 'published_at', 'is_published', 'image_preview')
    list_filter = ('is_published', 'published_at')
    search_fields = ('title_cs', 'title_en', 'title_ru')
    prepopulated_fields = {'slug': ('title_cs',)}
    readonly_fields = ('published_at', 'updated_at', 'image_preview')
    fieldsets = (
        (None, {
            'fields': ('slug', 'title_cs', 'title_en', 'title_ru', 'is_published'),
        }),
        ('Image', {
            'fields': ('image', 'image_alt', 'image_preview'),
        }),
        ('Content', {
            'fields': (
                'excerpt_cs', 'excerpt_en', 'excerpt_ru',
                'content_cs', 'content_en', 'content_ru',
            ),
        }),
        ('Meta', {
            'fields': ('published_at', 'updated_at'),
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
