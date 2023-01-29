from rest_framework.routers import DefaultRouter

from components.metrics.views import (
    WeatherMetricsQueryModelViewSet,
    SoilMoistureQueryModelViewSet,
)

app_name = 'metrics'

router = DefaultRouter()
router.register(r'q', WeatherMetricsQueryModelViewSet, basename='weather_metrics_query')
router.register(r'soil-moisture/q', SoilMoistureQueryModelViewSet, basename='soil_moisture_query')

urlpatterns = router.urls
