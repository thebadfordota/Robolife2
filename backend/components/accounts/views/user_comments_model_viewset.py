from rest_framework.mixins import CreateModelMixin, ListModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from components.accounts.models import UserCommentsModel
from components.accounts.serializers import (
    UserCommentsCreateModelSerializer,
    UserCommentsListModelSerializer,
)


class UserCommentsModelViewSet(GenericViewSet, CreateModelMixin, ListModelMixin):
    """ViewSet для работы с комментариями пользователя"""

    queryset = UserCommentsModel.objects.all()
    serializer_class = UserCommentsCreateModelSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        # page = self.paginate_queryset(queryset)
        # if page is not None:
        #     serializer = self.get_serializer(page, many=True)
        #     return self.get_paginated_response(serializer.data)

        # serializer = self.get_serializer(queryset, many=True)
        serializer = UserCommentsListModelSerializer(data=queryset, many=True)
        serializer.is_valid()
        return Response(serializer.data)
