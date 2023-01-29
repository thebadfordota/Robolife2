from rest_framework.routers import DefaultRouter

from components.metrics.views import (
    WeatherMetricsListModelViewSet,
    SoilMoistureListModelViewSet,
)

app_name = 'metrics'

router = DefaultRouter()
router.register(r'list', WeatherMetricsListModelViewSet, basename='weather-metrics')
router.register(r'soil-moisture/list', SoilMoistureListModelViewSet, basename='soil-moisture')

urlpatterns = router.urls
