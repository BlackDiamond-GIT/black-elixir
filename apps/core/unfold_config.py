from django.templatetags.static import static
from django.urls import reverse_lazy


UNFOLD = {
    'SITE_TITLE': 'Black Elixir Admin',
    'SITE_HEADER': 'Black Elixir Spa',
    'SITE_SUBHEADER': 'Керування контентом',
    'SITE_URL': '/cs/',
    'SITE_ICON': lambda request: static('img/brand/favicon.svg'),
    'SITE_LOGO': lambda request: static('img/brand/favicon.svg'),
    'SITE_FAVICONS': [
        {
            'rel': 'icon',
            'type': 'image/svg+xml',
            'href': lambda request: static('img/brand/favicon.svg'),
        },
    ],
    'SITE_SYMBOL': 'spa',
    'THEME': 'dark',
    'SHOW_HISTORY': True,
    'SHOW_VIEW_ON_SITE': True,
    'STYLES': [
        lambda request: static('css/admin-header.css?v=2'),
    ],
    'COLORS': {
        'primary': {
            '50': 'oklch(97% 0.015 15)',
            '100': 'oklch(94% 0.03 15)',
            '200': 'oklch(88% 0.05 15)',
            '300': 'oklch(82% 0.07 15)',
            '400': 'oklch(76% 0.08 15)',
            '500': 'oklch(68% 0.09 15)',
            '600': 'oklch(58% 0.08 15)',
            '700': 'oklch(48% 0.07 15)',
            '800': 'oklch(38% 0.06 15)',
            '900': 'oklch(28% 0.04 15)',
            '950': 'oklch(18% 0.03 15)',
        },
        'base': {
            '50': 'oklch(98% 0.005 0)',
            '100': 'oklch(95% 0.005 0)',
            '200': 'oklch(90% 0.005 0)',
            '300': 'oklch(82% 0.005 0)',
            '400': 'oklch(70% 0.005 0)',
            '500': 'oklch(58% 0.005 0)',
            '600': 'oklch(48% 0.005 0)',
            '700': 'oklch(38% 0.005 0)',
            '800': 'oklch(22% 0.005 0)',
            '900': 'oklch(14% 0.005 0)',
            '950': 'oklch(8% 0.005 0)',
        },
    },
    'SIDEBAR': {
        'show_search': True,
        'search_placeholder': 'Пошук додатків і моделей…',
        'show_all_applications': False,
        'navigation': [
            {
                'title': 'Огляд',
                'separator': True,
                'items': [
                    {
                        'title': 'Панель',
                        'icon': 'dashboard',
                        'link': reverse_lazy('admin:index'),
                    },
                ],
            },
            {
                'title': 'Масажистки',
                'collapsible': True,
                'items': [
                    {
                        'title': 'Масажистки',
                        'icon': 'groups',
                        'link': reverse_lazy('admin:masseurs_masseuse_changelist'),
                    },
                    {
                        'title': 'Бібліотека фото',
                        'icon': 'collections',
                        'link': reverse_lazy('admin:media_library_cloudinaryimage_changelist'),
                    },
                    {
                        'title': 'Розклад',
                        'icon': 'schedule',
                        'link': reverse_lazy('admin:schedule_timeslot_changelist'),
                    },
                ],
            },
            {
                'title': 'Послуги',
                'collapsible': True,
                'items': [
                    {
                        'title': 'Масажі',
                        'icon': 'spa',
                        'link': reverse_lazy('admin:services_massagetype_changelist'),
                    },
                ],
            },
            {
                'title': 'Бронювання',
                'collapsible': True,
                'items': [
                    {
                        'title': 'Кліки',
                        'icon': 'ads_click',
                        'link': reverse_lazy('admin:booking_bookingclick_changelist'),
                    },
                    {
                        'title': 'WhatsApp шаблони',
                        'icon': 'chat',
                        'link': reverse_lazy('admin:booking_whatsapptemplate_changelist'),
                    },
                    {
                        'title': 'Резервації',
                        'icon': 'event_available',
                        'link': reverse_lazy('admin:booking_reservation_changelist'),
                    },
                ],
            },
            {
                'title': 'Блог',
                'collapsible': True,
                'items': [
                    {
                        'title': 'Статті',
                        'icon': 'article',
                        'link': reverse_lazy('admin:blog_post_changelist'),
                    },
                ],
            },
        ],
    },
}
