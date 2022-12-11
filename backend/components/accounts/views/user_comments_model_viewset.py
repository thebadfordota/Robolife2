from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from components.accounts.models import UserCommentsModel
from components.accounts.serializers import UserCommentsModelSerializer


class UserCommentsModelViewSet(ModelViewSet):
    """ViewSet для работы с комментариями пользователя"""

    queryset = UserCommentsModel.objects.all()
    serializer_class = UserCommentsModelSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None

