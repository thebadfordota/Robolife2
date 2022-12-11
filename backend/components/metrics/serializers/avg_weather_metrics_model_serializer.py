from rest_framework.serializers import ModelSerializer

from components.metrics.models import WeatherAverageMetricsModel


class WeatherMetricsModelSerializer(ModelSerializer):
    """Сериализатор для метрик погоды"""

    class Meta:
        model = WeatherAverageMetricsModel
        fields = [
            'id',
            'name',
            'value',
            'date',
        ]
