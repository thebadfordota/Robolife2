from rest_framework.serializers import ModelSerializer

from components.comments.models import UserCommentsModel


class UserCommentsCreateModelSerializer(ModelSerializer):
    """Сериализатор для создания комментария пользователя"""

    class Meta:
        model = UserCommentsModel
        fields = [
            'id',
            'message',
            'user',
            'weather_metric'
        ]
