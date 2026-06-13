from django.views.generic import ListView, DetailView
from django.urls import reverse

from apps.blog.models import Post
from apps.core.i18n_utils import localize_post, localized_field
from apps.pages.content import BLOG_IMAGES


def blog_cover_image(post):
    if post.image:
        return post.image.url
    return BLOG_IMAGES.get(post.slug, '')


class PostListView(ListView):
    model = Post
    template_name = 'blog/list.html'
    context_object_name = 'posts'
    queryset = Post.objects.filter(is_published=True).order_by('-published_at')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        lang = self.request.LANGUAGE_CODE
        posts = []
        for post in context['posts']:
            localized = localize_post(post, lang)
            localized.cover_image = blog_cover_image(post)
            posts.append(localized)
        context['posts'] = posts
        context['breadcrumb_items'] = [
            {'name': 'Home', 'url': reverse('pages:home')},
            {'name': 'Blog', 'url': '#'},
        ]
        return context


class PostDetailView(DetailView):
    model = Post
    template_name = 'blog/detail.html'
    context_object_name = 'post'
    slug_field = 'slug'
    queryset = Post.objects.filter(is_published=True)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        lang = self.request.LANGUAGE_CODE
        post = self.object
        context['post_title'] = localized_field(post, 'title', lang)
        context['post_excerpt'] = localized_field(post, 'excerpt', lang)
        context['post_content'] = localized_field(post, 'content', lang)
        context['post_cover_image'] = blog_cover_image(post)
        context['breadcrumb_items'] = [
            {'name': 'Home', 'url': reverse('pages:home')},
            {'name': 'Blog', 'url': reverse('blog:list')},
            {'name': context['post_title'], 'url': '#'},
        ]
        return context
