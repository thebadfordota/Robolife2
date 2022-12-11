from rest_framework.routers import DefaultRouter

from components.metrics.views import WeatherMetricsModelViewSet

app_name = 'metrics'

router = DefaultRouter()
router.register(r'weather_metrics', WeatherMetricsModelViewSet, basename='weather_metrics')

urlpatterns = router.urls
