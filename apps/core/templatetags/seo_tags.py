import json
from django import template
from django.conf import settings
from django.utils.html import format_html

from apps.core.i18n_utils import localized_field
from apps.core.media_utils import media_field_url
from apps.core.url_utils import absolute_reverse, language_path, strip_language_prefix
from apps.pages.content import BLOG_IMAGES, MASSEUSE_IMAGES, SERVICE_IMAGES

register = template.Library()

SITE_ORIGIN = 'https://blackelixir.cz'


@register.simple_tag(takes_context=True)
def canonical_url(context):
    request = context['request']
    path = request.path
    if '?' in path:
        path = path.split('?')[0]
    return request.build_absolute_uri(path)


@register.inclusion_tag('partials/_hreflang.html', takes_context=True)
def hreflang_tags(context):
    request = context['request']
    path = strip_language_prefix(request.path, request.LANGUAGE_CODE)

    hreflangs = []
    for code, _ in settings.LANGUAGES:
        hreflangs.append({
            'code': code,
            'url': request.build_absolute_uri(language_path(code, path)),
        })

    hreflangs.append({
        'code': 'x-default',
        'url': request.build_absolute_uri(language_path('cs', path)),
    })

    return {'hreflangs': hreflangs}


@register.inclusion_tag('partials/_breadcrumbs.html', takes_context=True)
def breadcrumbs(context, items):
    request = context['request']
    current_lang = request.LANGUAGE_CODE
    breadcrumb_list = []
    for idx, item in enumerate(items):
        url = item.get('url', '')
        if url and not url.startswith('http') and not url.startswith(f'/{current_lang}/'):
            url = language_path(current_lang, url)
        schema_url = url
        if url and url != '#' and not url.startswith('http'):
            schema_url = request.build_absolute_uri(url)
        breadcrumb_list.append({
            'name': item.get('name', ''),
            'url': url,
            'schema_url': schema_url,
            'position': idx + 1,
            'is_last': idx == len(items) - 1,
        })

    return {
        'breadcrumbs': breadcrumb_list,
        'schema': json.dumps({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
                {
                    '@type': 'ListItem',
                    'position': bc['position'],
                    'name': bc['name'],
                    'item': bc['schema_url'],
                } for bc in breadcrumb_list if bc['schema_url'] != '#'
            ]
        })
    }


@register.simple_tag(takes_context=True)
def schema_person(context, masseuse):
    request = context['request']
    lang = request.LANGUAGE_CODE
    schema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': masseuse.name,
        'jobTitle': 'Massage Therapist',
        'description': localized_field(masseuse, 'bio', lang),
        'image': media_field_url(masseuse.photo, MASSEUSE_IMAGES.get(masseuse.slug, '')),
        'url': absolute_reverse(request, 'masseurs:detail', kwargs={'slug': masseuse.slug}),
        'worksFor': {
            '@type': 'Organization',
            'name': 'Black Elixir Spa',
        },
        'knowsAbout': [
            localized_field(service, 'name', lang)
            for service in masseuse.services.all()
        ],
    }
    return format_html('<script type="application/ld+json">{}</script>', json.dumps(schema))


@register.simple_tag(takes_context=True)
def schema_service(context, service):
    request = context['request']
    lang = request.LANGUAGE_CODE
    schema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': localized_field(service, 'name', lang),
        'description': localized_field(service, 'description', lang),
        'image': media_field_url(service.image, SERVICE_IMAGES.get(service.slug, '')),
        'provider': {
            '@type': 'Organization',
            'name': 'Black Elixir Spa',
        },
        'offers': {
            '@type': 'Offer',
            'url': absolute_reverse(request, 'services:detail', kwargs={'slug': service.slug}),
            'price': str(service.base_price),
            'priceCurrency': 'CZK',
            'availability': 'https://schema.org/InStock',
        },
        'areaServed': {
            '@type': 'City',
            'name': 'Prague',
        },
    }
    return format_html('<script type="application/ld+json">{}</script>', json.dumps(schema))


@register.simple_tag(takes_context=True)
def schema_article(context, post):
    request = context['request']
    lang = request.LANGUAGE_CODE
    schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': localized_field(post, 'title', lang),
        'description': localized_field(post, 'excerpt', lang),
        'image': media_field_url(post.image, BLOG_IMAGES.get(post.slug, '')),
        'datePublished': post.published_at.isoformat(),
        'dateModified': post.updated_at.isoformat(),
        'author': {
            '@type': 'Organization',
            'name': 'Black Elixir Spa',
        },
        'publisher': {
            '@type': 'Organization',
            'name': 'Black Elixir Spa',
            'logo': {
                '@type': 'ImageObject',
                'url': f'{SITE_ORIGIN}/static/logo.svg',
            }
        },
        'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': absolute_reverse(request, 'blog:detail', kwargs={'slug': post.slug}),
        }
    }
    return format_html('<script type="application/ld+json">{}</script>', json.dumps(schema))


@register.simple_tag(takes_context=True)
def schema_website(context):
    request = context['request']
    schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': 'Black Elixir Spa',
        'url': absolute_reverse(request, 'pages:home'),
        'potentialAction': {
            '@type': 'SearchAction',
            'target': {
                '@type': 'EntryPoint',
                'urlTemplate': f'{SITE_ORIGIN}/search?q={{search_term_string}}',
            },
            'query-input': 'required name=search_term_string',
        }
    }
    return format_html('<script type="application/ld+json">{}</script>', json.dumps(schema))


@register.simple_tag
def schema_faq(faqs):
    items = []
    for faq in faqs:
        items.append({
            '@type': 'Question',
            'name': faq.get('q', ''),
            'acceptedAnswer': {
                '@type': 'Answer',
                'text': faq.get('a', ''),
            }
        })

    schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': items,
    }
    return format_html('<script type="application/ld+json">{}</script>', json.dumps(schema))


@register.simple_tag(takes_context=True)
def schema_local_business(context):
    request = context['request']
    home_url = absolute_reverse(request, 'pages:home')
    schema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': home_url,
        'name': 'Black Elixir Spa',
        'url': home_url,
        'image': f'{SITE_ORIGIN}/static/logo.svg',
        'description': 'Premium spa with massage services in Prague',
        'telephone': '+420 777 123 456',
        'email': 'info@blackelixir.cz',
        'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'Václavské náměstí 12',
            'addressLocality': 'Prague',
            'postalCode': '110 00',
            'addressCountry': 'CZ',
        },
        'openingHours': [
            {
                '@type': 'OpeningHoursSpecification',
                'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                'opens': '10:00',
                'closes': '21:00',
            },
            {
                '@type': 'OpeningHoursSpecification',
                'dayOfWeek': ['Saturday', 'Sunday'],
                'opens': '10:00',
                'closes': '19:00',
            },
        ],
        'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': '4.8',
            'reviewCount': '124',
        },
        'sameAs': [
            'https://www.facebook.com/blackelixir',
            'https://www.instagram.com/blackelixir',
        ],
    }
    return format_html('<script type="application/ld+json">{}</script>', json.dumps(schema))


@register.filter
def price_czk(value):
    try:
        amount = int(float(value))
    except (TypeError, ValueError):
        return value
    return f'{amount:,}'.replace(',', ' ')
