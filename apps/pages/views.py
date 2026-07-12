from django.views.generic import TemplateView
from django.urls import reverse

from apps.core.breadcrumbs import build_breadcrumbs, make_breadcrumb
from apps.core.i18n_utils import localized_field
from apps.core.media_utils import media_field_url
from apps.masseurs.models import Masseuse
from apps.schedule.schedule_data import build_schedule_context
from apps.services.models import MassageType
from .content import (
    SERVICE_IMAGES, SERVICE_CAPTIONS, FAQ_ITEMS,
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
            make_breadcrumb('Home', reverse('pages:home')),
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

        context['services_preview'] = [
            {
                'obj': svc,
                'name': localized_field(svc, 'name', lang),
                'image': media_field_url(svc.image, SERVICE_IMAGES.get(svc.slug, '')),
                'caption': captions[i % len(captions)],
            }
            for i, svc in enumerate(services[:4])
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
                'image': media_field_url(svc.image, SERVICE_IMAGES.get(svc.slug, '')),
                'caption': captions[i % len(captions)],
            }
            for i, svc in enumerate(services)
        ]
        context['breadcrumb_items'] = build_breadcrumbs(
            ('Home', reverse('pages:home')),
            ('Massages', '#'),
        )
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
                'image': media_field_url(svc.image, SERVICE_IMAGES.get(svc.slug, '')),
                'caption': captions[i % len(captions)],
            }
            for i, svc in enumerate(services)
        ]
        context['breadcrumb_items'] = build_breadcrumbs(
            ('Home', reverse('pages:home')),
            ('Prices', '#'),
        )
        masseuses = Masseuse.objects.filter(is_active=True).prefetch_related('services')
        context.update(build_schedule_context(masseuses, lang))
        return context

class ContactsView(TemplateView):
    template_name = 'contacts/index.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['breadcrumb_items'] = build_breadcrumbs(
            ('Home', reverse('pages:home')),
            ('Contact', '#'),
        )
        return context


class FaqView(TemplateView):
    template_name = 'faq/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        lang = self.request.LANGUAGE_CODE
        context['faqs'] = FAQ_ITEMS.get(lang, FAQ_ITEMS['cs'])
        context['breadcrumb_items'] = build_breadcrumbs(
            ('Home', reverse('pages:home')),
            ('FAQ', '#'),
        )
        return context


class AboutView(LegalPageView):
    page_key = 'about'


class SalonRulesView(LegalPageView):
    page_key = 'salon_rules'


class PrivacyView(LegalPageView):
    page_key = 'privacy'
