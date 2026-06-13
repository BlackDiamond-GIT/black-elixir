from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from apps.core.elixir_admin import ElixirModelAdmin

from .models import TimeSlot


@admin.register(TimeSlot)
class TimeSlotAdmin(ElixirModelAdmin):
    list_display = ('masseuse', 'service', 'start_time', 'is_booked')
    list_filter = ('is_booked', 'masseuse', 'service')
    search_fields = ('masseuse__name',)
    readonly_fields = ('created_at',)
    date_hierarchy = 'start_time'

    fieldsets = (
        (None, {
            'fields': ('masseuse', 'service', 'start_time', 'is_booked'),
        }),
        (_('Meta'), {
            'fields': ('created_at',),
        }),
    )
