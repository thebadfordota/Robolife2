from rest_framework import status
from rest_framework.mixins import (
    CreateModelMixin,
    ListModelMixin,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from components.comments.models import UserCommentsModel
from components.comments.serializers import (
    UserCommentsCreateModelSerializer,
    UserCommentsListModelSerializer,
)
from components.metrics.models import WeatherMetricsModel
from components.notifications.services import UserNotificationService


class UserCommentsModelViewSet(GenericViewSet, CreateModelMixin, ListModelMixin):
    """ViewSet для работы с комментариями пользователя"""

    queryset = UserCommentsModel.objects.all()
    serializer_class = UserCommentsCreateModelSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        if 'metricId' in request.query_params:
            metric_id = int(request.query_params.get('metricId'))
            metric_model = WeatherMetricsModel.objects.get(id=metric_id)
            queryset = self.queryset.filter(weather_metric=metric_model)

        serializer = UserCommentsListModelSerializer(data=queryset, many=True)
        serializer.is_valid()
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_comment = serializer.save()
        headers = self.get_success_headers(serializer.data)
        UserNotificationService().create_user_notifications(user_comment)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
