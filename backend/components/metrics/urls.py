from rest_framework.routers import DefaultRouter

from components.metrics.views import WeatherMetricsQueryModelViewSet

app_name = 'metrics'

router = DefaultRouter()
router.register(r'q', WeatherMetricsQueryModelViewSet, basename='weather_metrics_query')

urlpatterns = router.urls
