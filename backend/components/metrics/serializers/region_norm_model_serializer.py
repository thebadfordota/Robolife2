from rest_framework.serializers import ModelSerializer

from components.metrics.models import RegionNormModel


class RegionNormModelSerializer(ModelSerializer):
    """Сериализатор нормы для региона"""

    class Meta:
        model = RegionNormModel
        fields = [
            'id',
            'name',
            'value',
            'date',
        ]
