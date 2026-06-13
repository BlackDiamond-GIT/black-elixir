from django.urls import path

from . import redirect_views

app_name = 'booking_clicks'

urlpatterns = [
    path('out/', redirect_views.booking_out, name='booking_out'),
    path('whatsapp/', redirect_views.whatsapp_general, name='whatsapp_general'),
    path('whatsapp/<slug:slug>/', redirect_views.whatsapp_redirect, name='whatsapp_masseuse'),
]
