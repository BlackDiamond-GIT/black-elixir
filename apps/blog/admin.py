from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _

from apps.core.admin_forms import rich_text_widgets
from apps.core.elixir_admin import ElixirModelAdmin

from .models import Post


@admin.register(Post)
class PostAdmin(ElixirModelAdmin):
    list_display = ('title_cs', 'published_at', 'is_published', 'image_preview')
    list_filter = ('is_published', 'published_at')
    list_editable = ('is_published',)
    search_fields = ('title_cs', 'title_en', 'title_ru')
    prepopulated_fields = {'slug': ('title_cs',)}
    readonly_fields = ('published_at', 'updated_at', 'image_preview')
    fieldsets = (
        (None, {
            'fields': ('slug', 'title_cs', 'title_en', 'title_ru', 'is_published'),
        }),
        (_('Зображення'), {
            'fields': ('image', 'image_alt', 'image_preview'),
        }),
        (_('Контент (CS)'), {
            'fields': ('excerpt_cs', 'content_cs'),
        }),
        (_('Контент (EN)'), {
            'fields': ('excerpt_en', 'content_en'),
        }),
        (_('Контент (RU)'), {
            'fields': ('excerpt_ru', 'content_ru'),
        }),
        (_('Meta'), {
            'fields': ('published_at', 'updated_at'),
        }),
    )

    def get_form(self, request, obj=None, **kwargs):
        kwargs.setdefault('widgets', {})
        kwargs['widgets'].update(rich_text_widgets(
            'content_cs', 'content_en', 'content_ru',
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
