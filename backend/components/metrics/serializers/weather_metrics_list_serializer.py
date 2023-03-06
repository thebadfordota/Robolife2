from rest_framework.serializers import Serializer

from components.metrics.serializers import WeatherMetricsModelSerializer, RegionNormModelSerializer


class WeatherMetricsListSerializer(Serializer):
    """Сериализатор для списка метрик погоды"""

    metrics = WeatherMetricsModelSerializer(many=True)
    region_norm = RegionNormModelSerializer(many=True)
