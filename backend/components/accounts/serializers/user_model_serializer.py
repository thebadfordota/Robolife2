from rest_framework.serializers import ModelSerializer

from components.accounts.models import UserModel


class UserModelSerializer(ModelSerializer):
    """Сериализатор для списка комментариев пользователя"""

    class Meta:
        model = UserModel
        fields = [
            'id',
            'first_name',
            'last_name',
            'username'
        ]
