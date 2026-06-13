from django.views.generic import TemplateView
from django.urls import reverse

from apps.core.i18n_utils import localized_field
from apps.masseurs.models import Masseuse
from apps.schedule.schedule_data import DAYS_SHORT, TIMES
from apps.services.models import MassageType
from .content import (
    SERVICE_IMAGES, MASSEUSE_IMAGES, MASSEUSE_SURNAMES,
    SERVICE_CAPTIONS, FAQ_ITEMS,
)
from .legal_content import LEGAL_PAGES


class LegalPageView(TemplateView):
    template_name = 'legal/index.html'
    page_key = ''

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        lang = self.request.LANGUAGE_CODE
        page = LEGAL_PAGES[self.page_key].get(lang, LEGAL_PAGES[self.page_key]['cs'])
        context['page'] = page
        context['breadcrumb_items'] = [
            {'name': 'Home', 'url': reverse('pages:home')},
            {'name': page['title'], 'url': '#'},
        ]
        return context

class HomeView(TemplateView):
    template_name = 'home/index.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        lang = self.request.LANGUAGE_CODE
        captions = SERVICE_CAPTIONS.get(lang, SERVICE_CAPTIONS['cs'])
        services = list(MassageType.objects.filter(is_active=True))
        masseuses = list(Masseuse.objects.filter(is_active=True)[:4])

        context['services_preview'] = [
            {
                'obj': svc,
                'name': localized_field(svc, 'name', lang),
                'image': SERVICE_IMAGES.get(svc.slug, ''),
                'caption': captions[i % len(captions)],
            }
            for i, svc in enumerate(services[:4])
        ]
        context['masseuses_preview'] = [
            {
                'obj': mas,
                'image': MASSEUSE_IMAGES.get(mas.slug, ''),
                'surname': MASSEUSE_SURNAMES.get(mas.slug, ''),
            }
            for mas in masseuses
        ]
        context['faqs'] = FAQ_ITEMS.get(lang, FAQ_ITEMS['cs'])
        return context

class MassagesView(TemplateView):
    template_name = 'massages/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        lang = self.request.LANGUAGE_CODE
        captions = SERVICE_CAPTIONS.get(lang, SERVICE_CAPTIONS['cs'])
        services = list(MassageType.objects.filter(is_active=True))

        context['services_grid'] = [
            {
                'obj': svc,
                'name': localized_field(svc, 'name', lang),
                'image': SERVICE_IMAGES.get(svc.slug, ''),
                'caption': captions[i % len(captions)],
            }
            for i, svc in enumerate(services)
        ]
        context['breadcrumb_items'] = [
            {'name': 'Home', 'url': reverse('pages:home')},
            {'name': 'Massages', 'url': '#'},
        ]
        return context


class PricesView(TemplateView):
    template_name = 'prices/index.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        lang = self.request.LANGUAGE_CODE
        captions = SERVICE_CAPTIONS.get(lang, SERVICE_CAPTIONS['cs'])
        services = list(MassageType.objects.filter(is_active=True))

        context['services_grid'] = [
            {
                'obj': svc,
                'name': getattr(svc, f'name_{lang}', None) or svc.name_cs,
                'image': SERVICE_IMAGES.get(svc.slug, ''),
                'caption': captions[i % len(captions)],
            }
            for i, svc in enumerate(services)
        ]
        context['breadcrumb_items'] = [
            {'name': 'Home', 'url': reverse('pages:home')},
            {'name': 'Prices', 'url': '#'},
        ]
        context['schedule_times'] = TIMES
        context['schedule_days'] = DAYS_SHORT.get(lang, DAYS_SHORT['cs'])
        return context

class ContactsView(TemplateView):
    template_name = 'contacts/index.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['breadcrumb_items'] = [
            {'name': 'Home', 'url': reverse('pages:home')},
            {'name': 'Contact', 'url': '#'},
        ]
        return context


class FaqView(TemplateView):
    template_name = 'faq/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        lang = self.request.LANGUAGE_CODE
        context['faqs'] = FAQ_ITEMS.get(lang, FAQ_ITEMS['cs'])
        context['breadcrumb_items'] = [
            {'name': 'Home', 'url': reverse('pages:home')},
            {'name': 'FAQ', 'url': '#'},
        ]
        return context


class AboutView(LegalPageView):
    page_key = 'about'


class SalonRulesView(LegalPageView):
    page_key = 'salon_rules'


class PrivacyView(LegalPageView):
    page_key = 'privacy'
