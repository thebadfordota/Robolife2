from rest_framework.serializers import ModelSerializer

from components.accounts.models import UserCommentsModel


class UserCommentsCreateModelSerializer(ModelSerializer):
    """Сериализатор для метрик погоды"""

    class Meta:
        model = UserCommentsModel
        fields = [
            'id',
            'message',
            'user',
            'weather_metric'
        ]
