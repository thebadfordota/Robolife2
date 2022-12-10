

from rest_framework.serializers import ModelSerializer

from components.metrics.models import WeatherMetricsModel


class WeatherMetricsModelSerializer(ModelSerializer):
    """Сериализатор для метрик погоды"""

    class Meta:
        model = WeatherMetricsModel
        fields = '__all__'
