from rest_framework.fields import CharField
from rest_framework.serializers import ModelSerializer

from components.accounts.models import UserCommentsModel
from components.accounts.serializers.user_model_serializer import UserModelSerializer


class UserCommentsListModelSerializer(ModelSerializer):
    """Сериализатор для списка комментариев пользователя"""

    user = UserModelSerializer(read_only=True)

    class Meta:
        model = UserCommentsModel
        fields = [
            'id',
            'message',
            'user',
            'created'
        ]
