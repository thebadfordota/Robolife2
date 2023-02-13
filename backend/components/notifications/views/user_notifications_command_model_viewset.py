from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT

from components.comments.serializers import UserCommentsCreateModelSerializer
from components.notifications.models import UserNotificationsModel
from shared.api.views import CommandModelViewSet
from shared.exceptions import IncorrectParametersError


class UserNotificationsCommandModelViewSet(CommandModelViewSet):
    """CommandModelViewSet для работы с уведомлениями пользователя"""

    queryset = UserNotificationsModel.objects.all()
    serializer_class = UserCommentsCreateModelSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None

    def destroy(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        if not kwargs.get('pk'):
            raise IncorrectParametersError('Не передан id пользователя')

        user_id = int(kwargs.get('pk'))
        user_model = get_user_model()
        user = user_model.objects.get(id=user_id)
        queryset = queryset.filter(user=user)
        queryset.delete()
        return Response(status=HTTP_204_NO_CONTENT)
