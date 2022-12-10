from rest_framework.routers import DefaultRouter

from components.metrics.views import WeatherMetricsViewSet, TestViewSet

app_name = 'metrics'

router = DefaultRouter()
router.register(r'weather_metrics', WeatherMetricsViewSet, basename='weather_metrics')
router.register(r'test', TestViewSet, basename='test')

urlpatterns = router.urls
