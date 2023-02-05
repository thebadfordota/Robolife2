from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from components.metrics.models import WeatherMetricsModel
from components.metrics.serializers import (
    SoilMoistureListModelSerializer,
    WeatherMetricsModelSerializer,
)
from components.metrics.services import MetricsService
from shared.api.views import BaseQueryModelViewSet
from shared.exceptions import MethodIsForbiddenError


class SoilMoistureQueryModelViewSet(BaseQueryModelViewSet):
    """ViewSet для получения списка метрик влажности почвы"""

    queryset = WeatherMetricsModel.objects.all().order_by('date')
    serializer_class = WeatherMetricsModelSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None
    service_class = MetricsService

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.service_class = self.service_class()

    def list(self, request, *args, **kwargs):
        metrics = self.service_class.filter_metrics_by_date_range(
            self.queryset,
            request.query_params.dict()
        )
        context = self.service_class.filter_soil_moisture_metrics_by_ground_level(metrics)
        serializer = SoilMoistureListModelSerializer(context)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        raise MethodIsForbiddenError()
