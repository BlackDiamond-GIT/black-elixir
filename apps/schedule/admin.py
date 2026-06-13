from django.contrib import admin
from .models import TimeSlot

@admin.register(TimeSlot)
class TimeSlotAdmin(admin.ModelAdmin):
    list_display = ('masseuse', 'service', 'start_time', 'is_booked')
    list_filter = ('is_booked', 'masseuse', 'service')
    search_fields = ('masseuse__name',)
    readonly_fields = ('created_at',)
