from datetime import datetime

from django.db import transaction
from django.http import HttpResponse
from django.shortcuts import redirect
from django.template.loader import render_to_string
from django.urls import reverse
from django.views import View
from django.views.generic import TemplateView

from apps.core.breadcrumbs import build_breadcrumbs

from apps.booking.models import Reservation
from apps.core.i18n_utils import localized_field
from apps.masseurs.models import Masseuse
from apps.schedule.models import TimeSlot
from apps.services.models import MassageType


class ReservationView(TemplateView):
    template_name = 'reservation/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        lang = self.request.LANGUAGE_CODE
        context['services'] = [
            {
                'obj': service,
                'name': localized_field(service, 'name', lang),
            }
            for service in MassageType.objects.filter(is_active=True)
        ]
        context['breadcrumb_items'] = build_breadcrumbs(
            ('Home', reverse('pages:home')),
            ('Booking', '#'),
        )
        return context


class ReservationStepView(View):
    def post(self, request, step):
        lang = request.LANGUAGE_CODE

        if step == '1':
            service_id = request.POST.get('service_id')
            service = MassageType.objects.get(id=service_id)
            masseuses = Masseuse.objects.filter(
                is_active=True,
                services=service
            )
            html = render_to_string('reservation/partials/step_2.html', {
                'masseuses': [
                    {
                        'obj': masseuse,
                        'name': masseuse.name,
                        'spec': localized_field(masseuse, 'spec', lang),
                    }
                    for masseuse in masseuses
                ],
                'service': service,
            }, request=request)
            return HttpResponse(html)

        elif step == '2':
            masseuse_id = request.POST.get('masseuse_id')
            service_id = request.POST.get('service_id')
            masseuse = Masseuse.objects.get(id=masseuse_id)
            service = MassageType.objects.get(id=service_id)

            slots = TimeSlot.objects.filter(
                masseuse=masseuse,
                service=service,
                is_booked=False,
                start_time__gte=datetime.now()
            ).order_by('start_time')[:30]

            html = render_to_string('reservation/partials/step_3.html', {
                'slots': slots,
                'masseuse': masseuse,
                'service': service,
            }, request=request)
            return HttpResponse(html)

        elif step == '3':
            slot_id = request.POST.get('slot_id')
            slot = TimeSlot.objects.get(id=slot_id)

            html = render_to_string('reservation/partials/step_4.html', {
                'slot': slot,
                'service_name': localized_field(slot.service, 'name', lang),
            }, request=request)
            return HttpResponse(html)

        elif step == '4':
            slot_id = request.POST.get('slot_id')
            client_name = request.POST.get('client_name')
            client_email = request.POST.get('client_email')
            client_phone = request.POST.get('client_phone')
            message = request.POST.get('message', '')

            slot = TimeSlot.objects.get(id=slot_id)

            with transaction.atomic():
                slot.is_booked = True
                slot.save()
                reservation = Reservation.objects.create(
                    slot=slot,
                    client_name=client_name,
                    client_email=client_email,
                    client_phone=client_phone,
                    message=message,
                )

            html = render_to_string('reservation/partials/step_5.html', {
                'reservation': reservation,
            }, request=request)
            return HttpResponse(html)

        return redirect('booking:index')
