from rest_framework.serializers import Serializer

from components.metrics.serializers import WeatherMetricsModelSerializer


class SoilMoistureListModelSerializer(Serializer):
    """Сериализатор списка метрик влажности почвы"""

    soil_moisture_10cm = WeatherMetricsModelSerializer(many=True)
    soil_moisture_20cm = WeatherMetricsModelSerializer(many=True)
    soil_moisture_100cm = WeatherMetricsModelSerializer(many=True)

