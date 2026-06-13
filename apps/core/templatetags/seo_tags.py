import json
from django import template
from django.conf import settings
from django.urls import reverse
from django.utils.html import format_html

from apps.core.media_utils import media_field_url
from apps.pages.content import BLOG_IMAGES, MASSEUSE_IMAGES, SERVICE_IMAGES

register = template.Library()

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
    current_lang = request.LANGUAGE_CODE
    path = request.path
    
    if path.startswith(f'/{current_lang}/'):
        path = path.replace(f'/{current_lang}/', '', 1)
    
    hreflangs = []
    for code, _ in settings.LANGUAGES:
        if code == 'cs':
            url = request.build_absolute_uri('/' + path)
        else:
            url = request.build_absolute_uri(f'/{code}/' + path)
        
        hreflangs.append({'code': code, 'url': url})
    
    hreflangs.append({'code': 'x-default', 'url': request.build_absolute_uri('/' + path)})
    
    return {'hreflangs': hreflangs}

@register.inclusion_tag('partials/_breadcrumbs.html', takes_context=True)
def breadcrumbs(context, items):
    request = context['request']
    current_lang = request.LANGUAGE_CODE
    breadcrumb_list = []
    for idx, item in enumerate(items):
        url = item.get('url', '')
        if url and not url.startswith('http'):
            if current_lang != 'cs' and not url.startswith(f'/{current_lang}/'):
                url = f'/{current_lang}{url}'
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

@register.simple_tag
def schema_person(masseuse):
    schema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': masseuse.name,
        'jobTitle': 'Massage Therapist',
        'description': masseuse.bio_cs,
        'image': media_field_url(masseuse.photo, MASSEUSE_IMAGES.get(masseuse.slug, '')),
        'worksFor': {
            '@type': 'Organization',
            'name': 'Black Elixir Spa',
        },
        'knowsAbout': [s.name_cs for s in masseuse.services.all()],
    }
    return format_html('<script type="application/ld+json">{}</script>', json.dumps(schema))

@register.simple_tag
def schema_service(service):
    schema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': service.name_cs,
        'description': service.description_cs,
        'image': media_field_url(service.image, SERVICE_IMAGES.get(service.slug, '')),
        'provider': {
            '@type': 'Organization',
            'name': 'Black Elixir Spa',
        },
        'offers': {
            '@type': 'Offer',
            'url': f'https://blackelixir.cz/services/{service.slug}/',
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

@register.simple_tag
def schema_article(post):
    schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': post.title_cs,
        'description': post.excerpt_cs,
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
                'url': 'https://blackelixir.cz/static/logo.svg',
            }
        },
        'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': f'https://blackelixir.cz/blog/{post.slug}/',
        }
    }
    return format_html('<script type="application/ld+json">{}</script>', json.dumps(schema))

@register.simple_tag
def schema_website():
    schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': 'Black Elixir Spa',
        'url': 'https://blackelixir.cz',
        'potentialAction': {
            '@type': 'SearchAction',
            'target': {
                '@type': 'EntryPoint',
                'urlTemplate': 'https://blackelixir.cz/search?q={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
        }
    }
    return format_html('<script type="application/ld+json">{}</script>', json.dumps(schema))

@register.simple_tag
def schema_faq(faqs):
    items = []
    for idx, faq in enumerate(faqs):
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

@register.simple_tag
def schema_local_business():
    schema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': 'https://blackelixir.cz',
        'name': 'Black Elixir Spa',
        'url': 'https://blackelixir.cz',
        'image': 'https://blackelixir.cz/static/logo.svg',
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
