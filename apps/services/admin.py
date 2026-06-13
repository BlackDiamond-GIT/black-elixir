from django.contrib import admin
from .models import MassageType

@admin.register(MassageType)
class MassageTypeAdmin(admin.ModelAdmin):
    list_display = ('name_cs', 'duration_minutes', 'base_price', 'is_active', 'order')
    list_filter = ('is_active',)
    search_fields = ('name_cs', 'name_en', 'name_ru')
    prepopulated_fields = {'slug': ('name_cs',)}
