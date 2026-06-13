from django.contrib import admin
from .models import Masseuse

@admin.register(Masseuse)
class MasseuseAdmin(admin.ModelAdmin):
    list_display = ('name', 'exp_years', 'is_active', 'order')
    list_filter = ('is_active', 'exp_years')
    search_fields = ('name', 'bio_cs')
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ('created_at', 'updated_at')
    filter_horizontal = ('services',)
