"""Django settings for config project 'Django 4.1.3'"""

import os
from pathlib import Path

import environ

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Get environment settings
env = environ.Env()
env_file = os.path.join(BASE_DIR, '.env.dev')
if os.path.exists(env_file):
    env.read_env(env_file)

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env('DEBUG', cast=bool, default=False)

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # external libraries
    'rest_framework',
    'drf_yasg',
]

COMPONENTS = [
    'components.main',
    'components.charts'
]


def setup_components(installed_apps, components) -> tuple[list, dict]:
    migration_modules = {}
    for component in components:
        component_name = component.split('.')[1]
        migration_modules[component_name] = f'{component}.migrations'
    return installed_apps + components, migration_modules


INSTALLED_APPS, MIGRATION_MODULES = setup_components(INSTALLED_APPS, COMPONENTS)


MIDDLEWARE = [
    # custom middleware
    # 'shared.middlewares.logging_middleware.RequestTimeMiddleware',
    # default middleware
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATE_DIR = os.path.join(BASE_DIR, 'templates')
APP_DIRS = True

OPTIONS = {
    'context_processors': [
        'django.template.context_processors.debug',
        'django.template.context_processors.request',
        'django.contrib.auth.context_processors.auth',
        'django.contrib.messages.context_processors.messages',
    ],
}

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [TEMPLATE_DIR],
        'APP_DIRS': APP_DIRS,
        'OPTIONS': OPTIONS,
    },
]

WSGI_APPLICATION = 'config.wsgi.application'


# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# DATABASES = {
#     "default": {
#         "ENGINE": os.environ.get("POSTGRES_ENGINE", "django.db.backends.postgresql_psycopg2"),
#         "NAME": os.environ.get("POSTGRES_DB", "insure_brother"),
#         "USER": os.environ.get("POSTGRES_USER", "postgres"),
#         "PASSWORD": os.environ.get("POSTGRES_PASSWORD", "322322"),
#         "HOST": os.environ.get("POSTGRES_HOST", "localhost"),
#         "PORT": os.environ.get("POSTGRES_PORT", "5432"),
#     }
# }

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
LANGUAGE_CODE = 'ru-Ru'

TIME_ZONE = 'Europe/Samara'

USE_I18N = True

USE_TZ = False

# SMTP Settings
EMAIL_HOST = env('EMAIL_HOST')
EMAIL_PORT = env('EMAIL_PORT', cast=int, default=1337)
EMAIL_HOST_USER = env('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD')
EMAIL_USE_TLS = env('EMAIL_USE_TLS', cast=bool, default=True)
EMAIL_USE_SSL = env('EMAIL_USE_SSL', cast=bool, default=False)
SERVER_EMAIL = EMAIL_HOST_USER
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER


# Static files (CSS, JavaScript, Images)
# STATIC_URL = 'static/'
STATIC_URL = env('STATIC_URL', default='/static/')
DEFAULT_FILE_STORAGE = env('DEFAULT_FILE_STORAGE', default='django.core.files.storage.FileSystemStorage')
STATICFILES_STORAGE = env('STATICFILES_STORAGE', default='django.contrib.staticfiles.storage.StaticFilesStorage')


# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Django Rest Framework settings
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny'
    ],

    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    ),
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
        # 'rest_framework.renderers.BrowsableAPIRenderer',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    # 'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
    'PAGE_SIZE': 20
}

# External urls
OPEN_METEO_BASE_URL = env('OPEN_METEO_BASE_URL')

# Constants
BASE_DATE_TIME_FORMAT = '%Y-%m-%d %H:%M:%S'
