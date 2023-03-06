from rest_framework.serializers import ModelSerializer

from components.agriculture.models import AgricultureModel


class AgricultureModelModelSerializer(ModelSerializer):
    """Сериализатор для агрокультур"""

    class Meta:
        model = AgricultureModel
        fields = '__all__'
