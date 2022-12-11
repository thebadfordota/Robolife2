from rest_framework.serializers import ModelSerializer

from components.accounts.models import UserModel


class UserModelSerializer(ModelSerializer):
    """Сериализатор для метрик погоды"""

    class Meta:
        model = UserModel
        fields = [
            'id',
            'is_superuser',
            'username',
            'password',
            'email',
            'is_staff',
            'first_name',
            'last_name',
            'patronymic',
        ]
