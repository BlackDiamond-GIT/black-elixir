from django.contrib import admin
from django.conf import settings
from django.conf.urls.i18n import i18n_patterns
from django.conf.urls.static import static
from django.urls import path, include
from django.contrib.sitemaps.views import sitemap
from apps.core.views import healthz, robots_txt, sitemaps

urlpatterns = [
    path('admin/', admin.site.urls),
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
    prefix_default_language=True,
)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
