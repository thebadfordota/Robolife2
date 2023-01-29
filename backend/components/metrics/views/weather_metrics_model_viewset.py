from rest_framework.mixins import ListModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.viewsets import GenericViewSet

from components.metrics.mixins import (
    WeatherMetricsFilterMixin,
    MetricsDateRangeFilter,
)
from components.metrics.models import WeatherMetricsModel, RegionNormModel
from components.metrics.serializers import WeatherMetricsListSerializer
from components.metrics.serializers import WeatherMetricsModelSerializer


class WeatherMetricsListModelViewSet(GenericViewSet,
                                     ListModelMixin,
                                     WeatherMetricsFilterMixin,
                                     MetricsDateRangeFilter):
    """ViewSet для получения списка погодных метрик"""

    queryset = WeatherMetricsModel.objects.all().order_by('date')
    serializer_class = WeatherMetricsModelSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None

    def list(self, request, *args, **kwargs):
        query_params = request.query_params.dict()

        metrics = self.filter_metrics_by_date_range(self.queryset, query_params)
        metrics = self.filter_weather_metrics_by_query_params(metrics, query_params)

        region_norm = self.filter_weather_metrics_by_query_params(
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
