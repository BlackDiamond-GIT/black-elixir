from django.http import HttpResponse
from django.urls import reverse
from django.contrib.sitemaps import Sitemap
from django.contrib.sitemaps.views import sitemap as sitemap_view
from django.views.decorators.cache import cache_page
from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import redirect

from apps.masseurs.models import Masseuse
from apps.services.models import MassageType
from apps.blog.models import Post

from .middleware import _ADMIN_LANG_COOKIE


@staff_member_required(login_url='/admin/login/')
def toggle_admin_language(request):
    redirect_to = request.META.get('HTTP_REFERER', '/admin/')
    current = request.COOKIES.get(_ADMIN_LANG_COOKIE, 'cs')
    next_lang = 'en' if current == 'cs' else 'cs'
    response = redirect(redirect_to)
    response.set_cookie(
        _ADMIN_LANG_COOKIE,
        next_lang,
        max_age=60 * 60 * 24 * 365,
        httponly=True,
        samesite='Lax',
    )
    return response


def healthz(request):
    return HttpResponse('ok', content_type='text/plain')


def robots_txt(request):
    lines = [
        "User-agent: *",
        "Disallow: /admin/",
        "Disallow: /api/",
        "Disallow: /i18n/",
        "",
        f"Sitemap: {request.build_absolute_uri(reverse('sitemap'))}",
    ]
    return HttpResponse("\n".join(lines), content_type="text/plain")

class HomeSitemap(Sitemap):
    i18n = True
    priority = 1.0
    changefreq = 'weekly'
    
    def items(self):
        return [{'loc': '/', 'priority': 1.0}]
    
    def location(self, item):
        return item['loc']
    
    def priority(self, item):
        return item['priority']

class MasseuseSitemap(Sitemap):
    i18n = True
    priority = 0.8
    changefreq = 'monthly'
    
    def items(self):
        return Masseuse.objects.filter(is_active=True)
    
    def location(self, obj):
        return f"/masseurs/{obj.slug}/"
    
    def lastmod(self, obj):
        return obj.updated_at

class ServiceSitemap(Sitemap):
    i18n = True
    priority = 0.8
    changefreq = 'monthly'
    
    def items(self):
        return MassageType.objects.filter(is_active=True)
    
    def location(self, obj):
        return f"/services/{obj.slug}/"
    
    def lastmod(self, obj):
        return None

class StaticPagesSitemap(Sitemap):
    i18n = True
    priority = 0.6
    changefreq = 'monthly'
    
    def items(self):
        return [
            {'loc': '/massages/', 'priority': 0.8},
            {'loc': '/prices/', 'priority': 0.7},
            {'loc': '/contacts/', 'priority': 0.6},
            {'loc': '/faq/', 'priority': 0.5},
            {'loc': '/about/', 'priority': 0.5},
            {'loc': '/salon-rules/', 'priority': 0.4},
            {'loc': '/privacy/', 'priority': 0.4},
            {'loc': '/schedule/', 'priority': 0.6},
            {'loc': '/reservation/', 'priority': 0.8},
            {'loc': '/blog/', 'priority': 0.5},
        ]
    
    def location(self, item):
        return item['loc']
    
    def priority(self, item):
        return item['priority']

class BlogSitemap(Sitemap):
    i18n = True
    priority = 0.5
    changefreq = 'weekly'
    
    def items(self):
        return Post.objects.filter(is_published=True)
    
    def location(self, obj):
        return f"/blog/{obj.slug}/"
    
    def lastmod(self, obj):
        return obj.updated_at

sitemaps = {
    'home': HomeSitemap,
    'masseuses': MasseuseSitemap,
    'services': ServiceSitemap,
    'static': StaticPagesSitemap,
    'blog': BlogSitemap,
}
