from django.shortcuts import redirect
from django.urls import reverse
from django.views import View


class ReservationView(View):
    def get(self, request):
        wa_url = reverse('booking_clicks:whatsapp_general')
        return redirect(f'{wa_url}?placement=reservation_redirect')


class ReservationStepView(View):
    def post(self, request, step):
        wa_url = reverse('booking_clicks:whatsapp_general')
        return redirect(f'{wa_url}?placement=reservation_step_redirect')
