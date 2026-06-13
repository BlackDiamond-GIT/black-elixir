from django.views.generic import ListView, DetailView
from django.urls import reverse

from apps.blog.models import Post
from apps.core.i18n_utils import localize_post, localized_field
from apps.core.media_utils import media_field_url
from apps.masseurs.models import Masseuse
from apps.masseurs.seed_content import generate_masseuse_faqs
from apps.pages.content import MASSEUSE_IMAGES


class MasseuseListView(ListView):
    model = Masseuse
    template_name = 'masseurs/list.html'
    context_object_name = 'masseuses'
    queryset = Masseuse.objects.filter(is_active=True)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        lang = self.request.LANGUAGE_CODE
        context['masseuse_cards'] = [
            {
                'obj': masseuse,
                'image': media_field_url(
                    masseuse.photo,
                    MASSEUSE_IMAGES.get(masseuse.slug, ''),
                ),
                'spec': localized_field(masseuse, 'spec', lang),
            }
            for masseuse in context['masseuses']
        ]
        context['breadcrumb_items'] = [
            {'name': 'Home', 'url': reverse('pages:home')},
            {'name': 'Masseuses', 'url': '#'},
        ]
        return context


class MasseuseDetailView(DetailView):
    model = Masseuse
    template_name = 'masseurs/detail.html'
    context_object_name = 'masseuse'
    slug_field = 'slug'

    def get_queryset(self):
        return Masseuse.objects.filter(is_active=True)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        lang = self.request.LANGUAGE_CODE
        masseuse = self.object

        context['masseuse_spec'] = localized_field(masseuse, 'spec', lang)
        context['masseuse_bio'] = localized_field(masseuse, 'bio', lang)
        context['masseuse_image'] = media_field_url(
            masseuse.photo,
            MASSEUSE_IMAGES.get(masseuse.slug, ''),
        )
        context['related_services'] = masseuse.services.filter(is_active=True)
        context['related_posts'] = [
            localize_post(post, lang)
            for post in Post.objects.filter(is_published=True)[:3]
        ]
        context['faqs'] = generate_masseuse_faqs(masseuse, lang)
        context['breadcrumb_items'] = [
            {'name': 'Home', 'url': reverse('pages:home')},
            {'name': 'Masseuses', 'url': reverse('masseurs:list')},
            {'name': masseuse.name, 'url': '#'},
        ]
        return context
