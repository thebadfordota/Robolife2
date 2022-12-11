from rest_framework.status import HTTP_204_NO_CONTENT
from rest_framework.mixins import ListModelMixin, DestroyModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from components.accounts.models import UserModel
from components.notifications.models import UserNotificationsModel
from components.notifications.serializers import UserNotificationsModelSerializer
from shared.exceptions import IncorrectParametersError


class UserNotificationsModelViewSet(GenericViewSet, ListModelMixin, DestroyModelMixin):
    """ViewSet для работы с уведомлениями пользователя"""

    queryset = UserNotificationsModel.objects.all()
    serializer_class = UserNotificationsModelSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        if 'userId' not in request.query_params:
            raise IncorrectParametersError('Не передан параметр userId')

        user_id = request.query_params.get('userId')
        user_model = UserModel.objects.get(id=user_id)
        queryset = queryset.filter(user=user_model)

        serializer = UserNotificationsModelSerializer(data=queryset, many=True)
        serializer.is_valid()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        if not kwargs.get('pk'):
            raise IncorrectParametersError('Не передан id пользователя')

        user_id = kwargs.get('pk')
        user_model = UserModel.objects.get(id=user_id)
        queryset = queryset.filter(user=user_model)
        queryset.delete()
        return Response(status=HTTP_204_NO_CONTENT)

