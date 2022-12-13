from rest_framework.serializers import Serializer

from components.metrics.serializers import WeatherMetricsModelSerializer, RegionNormModelSerializer


class WeatherMetricsListModelSerializer(Serializer):
    """Сериализатор для списка метрик погоды"""

    metric = WeatherMetricsModelSerializer(many=True)
    region_norm = RegionNormModelSerializer(many=True)
