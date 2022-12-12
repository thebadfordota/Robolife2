from rest_framework.routers import DefaultRouter

from components.metrics.views import (
    WeatherMetricsModelViewSet,
    RegionNormModelViewSet,
)

app_name = 'metrics'

router = DefaultRouter()
router.register(r'weather_metrics', WeatherMetricsModelViewSet, basename='weather_metrics')
router.register(r'region_norm', RegionNormModelViewSet, basename='region_norm')

urlpatterns = router.urls
