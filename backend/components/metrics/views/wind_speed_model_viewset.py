from rest_framework.viewsets import ModelViewSet

from components.metrics.models import WeatherMetricsModel
from components.metrics.serializers import WeatherMetricsModelSerializer


class WeatherMetricsViewSet(ModelViewSet):
    """ViewSet для получения метрик погоды"""

    queryset = WeatherMetricsModel.objects.all()
    serializer_class = WeatherMetricsModelSerializer
    pagination_class = None

