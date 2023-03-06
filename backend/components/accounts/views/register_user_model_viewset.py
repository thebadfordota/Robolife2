from rest_framework.mixins import CreateModelMixin
from rest_framework.viewsets import GenericViewSet

from components.accounts.models import UserModel
from components.accounts.serializers import RegisterUserModelSerializer


class RegisterUserModelViewSet(GenericViewSet, CreateModelMixin):
    """ViewSet для регистрации пользователя"""

    queryset = UserModel.objects.all()
    serializer_class = RegisterUserModelSerializer
    pagination_class = None

    def perform_create(self, serializer):
        instance = serializer.save()
        instance.set_password(instance.password)
        instance.save()


