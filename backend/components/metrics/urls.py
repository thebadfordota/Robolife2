from rest_framework.routers import DefaultRouter

from components.metrics.views import (
    WeatherMetricsModelViewSet,
    RegionNormModelViewSet,
    SoilMoistureModelViewSet,
)

app_name = 'metrics'

router = DefaultRouter()
router.register(r'weather_metrics', WeatherMetricsModelViewSet, basename='weather_metrics')
router.register(r'region_norm', RegionNormModelViewSet, basename='region_norm')
router.register(r'soil_moisture', SoilMoistureModelViewSet, basename='soil_moisture')

urlpatterns = router.urls
