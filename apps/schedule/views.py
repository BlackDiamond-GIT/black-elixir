from datetime import datetime

from django.utils.translation import get_language
from django.views.generic import TemplateView
from django.urls import reverse

from apps.masseurs.models import Masseuse
from apps.schedule.models import TimeSlot
from apps.schedule.schedule_data import (
    DAYS_SHORT,
    TIMES,
    build_db_grid,
    build_demo_grid,
    build_schedule_rows,
    today_weekday_index,
)


class ScheduleView(TemplateView):
    template_name = 'schedule/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        lang = (get_language() or 'cs')[:2]
        masseuses = Masseuse.objects.filter(is_active=True).prefetch_related('services')
        today_idx = today_weekday_index()

        db_slots = TimeSlot.objects.filter(
            start_time__gte=datetime.now()
        ).select_related('masseuse', 'service').order_by('start_time')[:200]

        if db_slots.exists():
            grid = build_db_grid(db_slots, lang)
        else:
            grid = build_demo_grid(masseuses, lang)

        context.update({
            'masseuses': masseuses,
            'times': TIMES,
            'days_short': DAYS_SHORT.get(lang, DAYS_SHORT['cs']),
            'today_idx': today_idx,
            'rows': build_schedule_rows(grid, today_idx),
            'breadcrumb_items': [
                {'name': 'Home', 'url': reverse('pages:home')},
                {'name': 'Schedule', 'url': '#'},
            ],
        })
        return context
