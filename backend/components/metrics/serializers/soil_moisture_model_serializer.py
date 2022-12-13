from rest_framework.serializers import ModelSerializer

from components.metrics.models import SoilMoistureModel


class SoilMoistureModelSerializer(ModelSerializer):
    """Сериализатор метрик влажности почвы"""

    class Meta:
        model = SoilMoistureModel
        fields = [
            'id',
            'name',
            'value',
            'date_and_time',
        ]
