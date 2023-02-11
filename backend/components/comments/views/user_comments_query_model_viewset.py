from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from components.comments.models import UserCommentsModel
from components.comments.serializers import (
    UserCommentsListModelSerializer,
)
from components.metrics.models import WeatherMetricsModel
from shared.api.views import QueryModelViewSet


class UserCommentsQueryModelViewSet(QueryModelViewSet):
    """QueryModelViewSet для работы с комментариями пользователя"""

    queryset = UserCommentsModel.objects.all().order_by('created')
    serializer_class = UserCommentsListModelSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        if 'metricId' in request.query_params:
            metric_id = int(request.query_params.get('metricId'))
            metric_model = WeatherMetricsModel.objects.get(id=metric_id)
            queryset = self.queryset.filter(weather_metric=metric_model)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
