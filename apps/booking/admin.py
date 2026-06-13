from django.contrib import admin
from .models import Reservation

@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('client_name', 'client_email', 'slot', 'confirmed', 'created_at')
    list_filter = ('confirmed', 'created_at')
    search_fields = ('client_name', 'client_email', 'client_phone')
    readonly_fields = ('created_at',)
