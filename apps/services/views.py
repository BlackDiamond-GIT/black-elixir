from django.views.generic import DetailView
from django.urls import reverse

from apps.blog.models import Post
from apps.core.breadcrumbs import build_breadcrumbs
from apps.core.i18n_utils import localize_post, localized_field
from apps.masseurs.models import Masseuse
from apps.core.media_utils import media_field_url
from apps.pages.content import SERVICE_IMAGES
from apps.services.text_utils import parse_description_sections
from apps.services.content_data import get_service_faqs
from apps.services.models import MassageType


class ServiceDetailView(DetailView):
    model = MassageType
    template_name = 'services/detail.html'
    context_object_name = 'service'
    slug_field = 'slug'

    def get_queryset(self):
        return MassageType.objects.filter(is_active=True)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        lang = self.request.LANGUAGE_CODE
        service = self.object

        context['service_name'] = localized_field(service, 'name', lang)
        context['service_description'] = localized_field(service, 'description', lang)
        description_sections = parse_description_sections(
            context['service_description']
        )
        context['description_sections'] = description_sections
        context['content_sections'] = [
            section for section in description_sections
            if section['type'] == 'section'
        ]
        context['service_image'] = media_field_url(
            service.image,
            SERVICE_IMAGES.get(service.slug, ''),
        )
        context['faqs'] = get_service_faqs(service.slug, lang)
        context['masseuses'] = (
            Masseuse.objects.filter(is_active=True, services=service)
            .distinct()
            .order_by('order', 'name')
        )
        context['related_posts'] = [
            localize_post(post, lang)
            for post in Post.objects.filter(is_published=True)[:2]
        ]
        context['breadcrumb_items'] = build_breadcrumbs(
            ('Home', reverse('pages:home')),
            ('Prices', reverse('pages:prices')),
            (context['service_name'], '#'),
        )
        return context
