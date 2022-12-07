

from rest_framework.serializers import ModelSerializer

from components.metrics.models import WindSpeedModel


class WindSpeedModelSerializer(ModelSerializer):
    """"""

    class Meta:
        model = WindSpeedModel
        fields = ('value', 'date_time')
