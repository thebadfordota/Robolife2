from rest_framework.routers import DefaultRouter

from components.metrics.views import WeatherMetricsModelViewSet, TestViewSet, WeatherAvgMetricsViewSet

app_name = 'metrics'

router = DefaultRouter()
router.register(r'weather_metrics', WeatherMetricsModelViewSet, basename='weather_metrics')
router.register(r'weather_avg_metrics', WeatherAvgMetricsViewSet, basename='weather_avg_metrics')
router.register(r'test', TestViewSet, basename='test')

urlpatterns = router.urls
