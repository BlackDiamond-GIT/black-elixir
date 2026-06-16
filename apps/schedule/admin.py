from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from apps.core.elixir_admin import ElixirModelAdmin

from .models import TimeSlot, WorkLocation


@admin.register(WorkLocation)
class WorkLocationAdmin(ElixirModelAdmin):
    list_display = ('name_cs', 'slug', 'address_cs', 'order', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('name_cs', 'name_en', 'slug', 'address_cs')
    prepopulated_fields = {'slug': ('name_cs',)}


@admin.register(TimeSlot)
class TimeSlotAdmin(ElixirModelAdmin):
    list_display = ('masseuse', 'service', 'location', 'shift_type', 'start_time', 'is_booked')
    list_filter = ('is_booked', 'shift_type', 'masseuse', 'service', 'location')
    search_fields = ('masseuse__name',)
    readonly_fields = ('created_at',)
    date_hierarchy = 'start_time'

    fieldsets = (
        (None, {
            'fields': ('masseuse', 'service', 'location', 'shift_type', 'start_time', 'is_booked'),
        }),
        (_('Meta'), {
            'fields': ('created_at',),
        }),
    )
