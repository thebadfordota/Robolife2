from rest_framework.viewsets import ModelViewSet

from components.metrics.models import WindSpeedModel
from components.metrics.serializers import WindSpeedModelSerializer


class WindSpeedViewSet(ModelViewSet):
    """ViewSet для получения информации о скорости ветра"""
    queryset = WindSpeedModel.objects.all()
    serializer_class = WindSpeedModelSerializer
    pagination_class = None

