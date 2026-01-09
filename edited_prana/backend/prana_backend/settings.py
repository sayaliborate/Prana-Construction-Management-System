
import os
from datetime import timedelta
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))



SECRET_KEY = 'prana-demo-secret-key'
DEBUG = True
ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    "unfold",  # Must come before django.contrib.admin
    "unfold.contrib.filters",         # Optional: for advanced filtering
    "unfold.contrib.forms",           # Optional: better form widgets
    "unfold.contrib.inlines",         # Optional: improved inlines
    "unfold.contrib.import_export",   # Optional: if using import-export
    "unfold.contrib.guardian",        # Optional: if using django-guardian
    "unfold.contrib.simple_history",  # Optional: if using simple-history
    
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'users',
    'projects',
    'employees',
    'inventory',
    'billing',
    'company',
    'import_export',
    
    
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    
]



ROOT_URLCONF = 'prana_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'prana_backend.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'prana_db',       # change to your database name
        'USER': 'root',           # your MySQL username
        'PASSWORD': 'Root@123',  # your MySQL password
        'HOST': '127.0.0.1',      # or 'localhost'
        'PORT': '3306',
    }
}



AUTH_PASSWORD_VALIDATORS = []

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True
STATIC_URL = '/static/'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',  # ✅
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    )
}



from rest_framework_simplejwt.settings import api_settings as jwt_settings

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
}

CORS_ALLOWED_ORIGINS = [
    "http://localhost:4200",  # Angular dev server
]

CORS_ALLOW_CREDENTIALS = True  # 👈 important for session cookies


AUTH_USER_MODEL = 'users.User'

CORS_ALLOW_ALL_ORIGINS = True


UNFOLD = {
    "SITE_TITLE": "Prana Admin",
    "SITE_HEADER": "Prana Dashboard",

}