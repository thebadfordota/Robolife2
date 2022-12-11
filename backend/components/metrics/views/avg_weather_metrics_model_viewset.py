from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from components.metrics.models import WeatherMetricsModel, WeatherAverageMetricsModel
from components.metrics.serializers import WeatherMetricsModelSerializer


class WeatherAvgMetricsViewSet(ModelViewSet):
    """ViewSet для получения нормы для региона"""

    queryset = WeatherAverageMetricsModel.objects.all()
    serializer_class = WeatherMetricsModelSerializer
    permission_classes = (IsAuthenticated, )
    pagination_class = None

