from django.utils.translation import get_language
from django.views.generic import TemplateView
from django.urls import reverse

from apps.core.breadcrumbs import build_breadcrumbs
from apps.masseurs.models import Masseuse
from apps.schedule.schedule_data import build_schedule_context


class ScheduleView(TemplateView):
    template_name = 'schedule/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        lang = (get_language() or 'cs')[:2]
        masseuses = Masseuse.objects.filter(is_active=True).prefetch_related('services')

        context.update(build_schedule_context(masseuses, lang))
        context['breadcrumb_items'] = build_breadcrumbs(
            ('Home', reverse('pages:home')),
            ('Schedule', '#'),
        )
        return context
