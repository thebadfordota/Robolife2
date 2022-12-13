from rest_framework.serializers import Serializer

from components.metrics.serializers import SoilMoistureModelSerializer


class SoilMoistureListModelSerializer(Serializer):
    """Сериализатор списка метрик влажности почвы"""

    soil_moisture_10cm = SoilMoistureModelSerializer(many=True)
    soil_moisture_20cm = SoilMoistureModelSerializer(many=True)
    soil_moisture_100cm = SoilMoistureModelSerializer(many=True)

