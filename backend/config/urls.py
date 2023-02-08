"""config URL Configuration"""
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls import (
    path,
    re_path,
    include
)
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

from config.settings import MEDIA_URL, MEDIA_ROOT

admin.site.site_title = 'Админ-панель Robolife2'
admin.site.site_header = 'Админ-панель Robolife2'

schema_view = get_schema_view(
    openapi.Info(
        title="Robolife2 API",
        default_version='v1',
        description="Robolife2 API for AgroIntelligence.Meteo",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include('components.accounts.urls')),
    path('api/metrics/', include('components.metrics.urls')),
    path('api/comments/', include('components.comments.urls')),
    path('api/notifications/', include('components.notifications.urls')),
    path('api/agriculture/', include('components.agriculture.urls')),
    # swagger urls
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(MEDIA_URL, document_root=MEDIA_ROOT)
