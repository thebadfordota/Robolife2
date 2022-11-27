from rest_framework.viewsets import ModelViewSet

from components.charts.models import WindSpeedModel


class WindSpeedViewSet(ModelViewSet):
    """ViewSet для получения информации о скорости ветра"""
    queryset = WindSpeedModel.objects.all()
    pagination_class = None

