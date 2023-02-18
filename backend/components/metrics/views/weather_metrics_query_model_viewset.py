from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

from components.metrics.models import (
    WeatherMetricsModel,
    RegionNormModel,
)
from components.metrics.serializers import (
    WeatherMetricsListSerializer,
    SoilMoistureListModelSerializer,
)
from components.metrics.serializers import WeatherMetricsModelSerializer
from components.metrics.services import MetricsService
from shared.api.views import QueryModelViewSet
from shared.exceptions import MethodIsForbiddenError


class WeatherMetricsQueryModelViewSet(QueryModelViewSet):
    """QueryModelViewSet для получения списка погодных метрик"""

    queryset = WeatherMetricsModel.objects.all().order_by('date')
    serializer_class = WeatherMetricsModelSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None
    service_class = MetricsService

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.service_class = self.service_class()

    def list(self, request, *args, **kwargs):
        query_params = request.query_params.dict()
        metrics = self.service_class.filter_metrics_by_date_range(
            self.queryset,
            query_params
        )
        metrics = self.service_class.filter_weather_metrics_by_query_params(
            metrics,
            query_params
        )
        region_norm = self.service_class.filter_weather_metrics_by_query_params(
            RegionNormModel.objects.all().order_by("date"),
            query_params
        )

        serializer = WeatherMetricsListSerializer(
            {
                'metrics': metrics,
                'region_norm': region_norm,
            }
        )
        return Response(serializer.data, status=HTTP_200_OK)

    @action(methods=['get'], detail=False, url_path='soil-moisture')
    def soil_moisture(self, request):
        metrics = self.service_class.filter_metrics_by_date_range(
            self.queryset,
            request.query_params.dict()
        )
        context = self.service_class.filter_soil_moisture_metrics_by_ground_level(metrics)
        serializer = SoilMoistureListModelSerializer(context)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        raise MethodIsForbiddenError()
