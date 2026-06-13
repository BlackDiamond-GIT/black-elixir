import os
from pathlib import Path

import dj_database_url
from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config('SECRET_KEY', default='dev-secret-key-change-in-production')
DEBUG = config('DEBUG', default=True, cast=bool)

ALLOWED_HOSTS = [
    host.strip()
    for host in config('ALLOWED_HOSTS', default='localhost,127.0.0.1').split(',')
    if host.strip()
]

RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
if RENDER_EXTERNAL_HOSTNAME and RENDER_EXTERNAL_HOSTNAME not in ALLOWED_HOSTS:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)

SITE_DOMAIN = config('SITE_DOMAIN', default='').strip()
if SITE_DOMAIN:
    for host in (SITE_DOMAIN, f'www.{SITE_DOMAIN}'):
        if host not in ALLOWED_HOSTS:
            ALLOWED_HOSTS.append(host)

INSTALLED_APPS = [
    'unfold',
    'unfold.contrib.filters',
    'unfold.contrib.forms',
    'unfold.contrib.inlines',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sitemaps',
    'django.contrib.humanize',
    'tinymce',
    'rosetta',
    'apps.core',
    'apps.media_library',
    'apps.masseurs',
    'apps.services',
    'apps.schedule',
    'apps.booking',
    'apps.blog',
    'apps.pages',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'apps.core.middleware.AdminLocaleMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'black_elixir.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.template.context_processors.i18n',
                'apps.core.context_processors.site_languages',
                'apps.core.context_processors.site_settings',
            ],
        },
    },
]

WSGI_APPLICATION = 'black_elixir.wsgi.application'

DATABASES = {
    'default': dj_database_url.config(
        default=f'sqlite:///{BASE_DIR / "db.sqlite3"}',
        conn_max_age=600,
        ssl_require=not DEBUG,
    )
}

if config('DB_ENGINE', default='') == 'postgresql' and not os.environ.get('DATABASE_URL'):
    DATABASES['default'] = {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME', 'black_elixir'),
        'USER': config('DB_USER', 'postgres'),
        'PASSWORD': config('DB_PASSWORD', ''),
        'HOST': config('DB_HOST', 'localhost'),
        'PORT': config('DB_PORT', '5432'),
    }

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'cs'
TIME_ZONE = 'Europe/Prague'
USE_I18N = True
USE_TZ = True

LANGUAGES = [
    ('cs', 'Čeština'),
    ('en', 'English'),
    ('ru', 'Русский'),
]

LOCALE_PATHS = [BASE_DIR / 'locale']

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [BASE_DIR / 'static']

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

STATICFILES_BACKEND = 'whitenoise.storage.CompressedStaticFilesStorage'

CLOUDINARY_URL = config('CLOUDINARY_URL', default='')
CLOUDINARY_CLOUD_NAME = config('CLOUDINARY_CLOUD_NAME', default='')
USE_CLOUDINARY = bool(CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME)

if USE_CLOUDINARY:
    static_index = INSTALLED_APPS.index('django.contrib.staticfiles')
    INSTALLED_APPS.insert(static_index + 1, 'cloudinary_storage')
    INSTALLED_APPS.insert(static_index + 2, 'cloudinary')

    if CLOUDINARY_CLOUD_NAME:
        CLOUDINARY_STORAGE = {
            'CLOUD_NAME': CLOUDINARY_CLOUD_NAME,
            'API_KEY': config('CLOUDINARY_API_KEY', default=''),
            'API_SECRET': config('CLOUDINARY_API_SECRET', default=''),
        }

    STORAGES = {
        'default': {
            'BACKEND': 'cloudinary_storage.storage.MediaCloudinaryStorage',
        },
        'staticfiles': {
            'BACKEND': STATICFILES_BACKEND,
        },
    }
else:
    STORAGES = {
        'default': {
            'BACKEND': 'django.core.files.storage.FileSystemStorage',
        },
        'staticfiles': {
            'BACKEND': STATICFILES_BACKEND,
        },
    }

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CSRF_TRUSTED_ORIGINS = [
    origin.strip()
    for origin in config('CSRF_TRUSTED_ORIGINS', default='http://localhost:8000').split(',')
    if origin.strip()
]
if RENDER_EXTERNAL_HOSTNAME:
    render_origin = f'https://{RENDER_EXTERNAL_HOSTNAME}'
    if render_origin not in CSRF_TRUSTED_ORIGINS:
        CSRF_TRUSTED_ORIGINS.append(render_origin)
if SITE_DOMAIN:
    for origin in (f'https://{SITE_DOMAIN}', f'https://www.{SITE_DOMAIN}'):
        if origin not in CSRF_TRUSTED_ORIGINS:
            CSRF_TRUSTED_ORIGINS.append(origin)

if DEBUG:
    SECURE_SSL_REDIRECT = config('SECURE_SSL_REDIRECT', default=False, cast=bool)
    SESSION_COOKIE_SECURE = config('SESSION_COOKIE_SECURE', default=False, cast=bool)
    CSRF_COOKIE_SECURE = config('CSRF_COOKIE_SECURE', default=False, cast=bool)
else:
    # Render terminates SSL at the edge; redirect breaks internal health checks.
    on_render = bool(os.environ.get('RENDER'))
    SECURE_SSL_REDIRECT = config(
        'SECURE_SSL_REDIRECT',
        default=False if on_render else True,
        cast=bool,
    )
    SESSION_COOKIE_SECURE = config('SESSION_COOKIE_SECURE', default=True, cast=bool)
    CSRF_COOKIE_SECURE = config('CSRF_COOKIE_SECURE', default=True, cast=bool)
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

SECURE_REDIRECT_EXEMPT = [r'^healthz/$']

CSRF_COOKIE_HTTPONLY = True

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {'class': 'logging.StreamHandler'},
    },
    'root': {'handlers': ['console'], 'level': 'INFO'},
}

SITE_WHATSAPP = config('SITE_WHATSAPP', default='+420000000000')

from apps.core.unfold_config import UNFOLD  # noqa: E402

TINYMCE_DEFAULT_CONFIG = {
    'height': 360,
    'width': '100%',
    'menubar': False,
    'plugins': 'link lists code',
    'toolbar': 'undo redo | bold italic | bullist numlist | link | code',
    'skin': 'oxide-dark',
    'content_css': 'dark',
}
