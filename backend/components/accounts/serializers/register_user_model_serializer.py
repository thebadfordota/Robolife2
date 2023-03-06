from rest_framework.serializers import ModelSerializer

from components.accounts.models import UserModel


class RegisterUserModelSerializer(ModelSerializer):
    """Сериализатор регистрации пользователя"""

    class Meta:
        model = UserModel
        fields = [
            'id',
            'username',
            'password',
            'email',
            'phone',
            'first_name',
            'last_name',
            'patronymic',
        ]
