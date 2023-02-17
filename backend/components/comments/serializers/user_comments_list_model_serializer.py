from rest_framework.serializers import ModelSerializer

from components.accounts.serializers import UserModelSerializer
from components.comments.models import UserCommentsModel
from components.metrics.serializers import WeatherMetricsModelSerializer


class UserCommentsListModelSerializer(ModelSerializer):
    """Сериализатор для списка комментариев пользователя"""

    user = UserModelSerializer(read_only=True)
    weather_metric = WeatherMetricsModelSerializer(read_only=True)

    class Meta:
        model = UserCommentsModel
        fields = [
            'id',
            'message',
            'user',
            'weather_metric',
            'created'
        ]
