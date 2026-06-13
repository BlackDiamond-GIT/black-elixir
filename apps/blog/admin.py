from django.contrib import admin
from .models import Post

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title_cs', 'published_at', 'is_published')
    list_filter = ('is_published', 'published_at')
    search_fields = ('title_cs', 'title_en', 'title_ru')
    prepopulated_fields = {'slug': ('title_cs',)}
    readonly_fields = ('published_at', 'updated_at')
