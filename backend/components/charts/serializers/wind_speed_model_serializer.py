

from rest_framework.serializers import ModelSerializer

from components.charts.models import WindSpeedModel


class WindSpeedModelSerializer(ModelSerializer):
    """"""

    class Meta:
        model = WindSpeedModel
        fields = ('value', 'date_time')
