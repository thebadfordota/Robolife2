from rest_framework.viewsets import ModelViewSet

from components.charts.models import WindSpeedModel
from components.charts.serializers import WindSpeedModelSerializer


class WindSpeedViewSet(ModelViewSet):
    """ViewSet для получения информации о скорости ветра"""
    queryset = WindSpeedModel.objects.all()
    serializer_class = WindSpeedModelSerializer
    pagination_class = None

