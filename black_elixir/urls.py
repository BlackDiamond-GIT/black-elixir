from django.contrib import admin
from django.conf import settings
from django.conf.urls.i18n import i18n_patterns
from django.conf.urls.static import static
from django.shortcuts import redirect
from django.urls import path, include
from django.contrib.sitemaps.views import sitemap
from apps.core.views import healthz, robots_txt, sitemaps, toggle_admin_language

urlpatterns = [
    path('', lambda request: redirect('/cs/')),
    path('admin/', admin.site.urls),
    path('admin/media-library/', include('apps.media_library.urls')),
    path('admin/toggle-lang/', toggle_admin_language, name='admin_toggle_lang'),
    path('tinymce/', include('tinymce.urls')),
    path('booking/', include('apps.booking.click_urls')),
    path('healthz/', healthz, name='healthz'),
    path('robots.txt', robots_txt, name='robots'),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='sitemap'),
]

if settings.DEBUG:
    urlpatterns.insert(1, path('rosetta/', include('rosetta.urls')))

urlpatterns += i18n_patterns(
    path('', include('apps.pages.urls')),
    path('services/', include('apps.services.urls')),
    path('masseuses/', include('apps.masseurs.urls')),
    path('schedule/', include('apps.schedule.urls')),
    path('reservation/', include('apps.booking.urls')),
    path('blog/', include('apps.blog.urls')),
    prefix_default_language=False,
)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
