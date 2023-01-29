from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from components.metrics.mixins import MetricsDateRangeFilter
from components.metrics.models import SoilMoistureModel
from components.metrics.serializers import (
    SoilMoistureModelSerializer,
    SoilMoistureListModelSerializer,
)
from shared.api.views import BaseQueryModelViewSet
from shared.exceptions import MethodIsForbiddenError


class SoilMoistureQueryModelViewSet(BaseQueryModelViewSet,
                                    MetricsDateRangeFilter):
    """ViewSet для получения списка метрик влажности почвы"""

    queryset = SoilMoistureModel.objects.all().order_by('date_and_time')
    serializer_class = SoilMoistureModelSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None

    def list(self, request, *args, **kwargs):
        soil_moisture_metrics = self.filter_metrics_by_date_and_time_range(
            self.queryset,
            request.query_params.dict()
        )
        context = {
            'soil_moisture_10cm': soil_moisture_metrics.filter(name='10 cm'),
            'soil_moisture_20cm': soil_moisture_metrics.filter(name='20 cm'),
            'soil_moisture_100cm': soil_moisture_metrics.filter(name='100 cm')
        }
        serializer = SoilMoistureListModelSerializer(context)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        raise MethodIsForbiddenError()
