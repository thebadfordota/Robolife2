from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from components.accounts.models import UserModel
from components.notifications.models import UserNotificationsModel
from components.notifications.serializers import UserNotificationsModelSerializer
from shared.api.views import QueryModelViewSet
from shared.exceptions import IncorrectParametersError


class UserNotificationsQueryModelViewSet(QueryModelViewSet):
    """QueryModelViewSet для работы с уведомлениями пользователя"""

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

        serializer = UserNotificationsModelSerializer(queryset, many=True)
        return Response(serializer.data)
