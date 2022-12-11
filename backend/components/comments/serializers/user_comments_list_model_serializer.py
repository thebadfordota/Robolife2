from rest_framework.serializers import ModelSerializer

from components.accounts.serializers import UserModelSerializer
from components.comments.models import UserCommentsModel


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
