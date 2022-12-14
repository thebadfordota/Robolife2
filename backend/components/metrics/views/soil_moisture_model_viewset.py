from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from components.metrics.models import SoilMoistureModel
from components.metrics.serializers import (
    SoilMoistureModelSerializer,
    SoilMoistureListModelSerializer,
)


class SoilMoistureModelViewSet(ModelViewSet):
    """ViewSet для получения метрик влажности почвы"""

    queryset = SoilMoistureModel.objects.all()
    serializer_class = SoilMoistureModelSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None

    def list(self, request, *args, **kwargs):
        data = self.queryset.all().order_by("date_and_time")
        if 'startDate' in request.query_params and 'endDate' in request.query_params:
            data = data.filter(date_and_time__range=(
                request.query_params.get('startDate'),
                request.query_params.get('endDate')
            ))


        # if 'maxTemperature' in request.query_params and 'minTemperature' in request.query_params:
        #     data = data.filter(Q(name='Max Temperature') | Q(name='Min Temperature'))
        # elif 'maxTemperature' in request.query_params:
        #     data = data.filter(name='Max Temperature')
        # elif 'minTemperature' in request.query_params:
        #     data = data.filter(name='Min Temperature')
        #
        # elif 'maxWindSpeed' in request.query_params and 'dominantWindDirection' in request.query_params:
        #     data = data.filter(Q(name='Max Wind Speed') | Q(name='Dominant Wind Direction'))
        # elif 'maxWindSpeed' in request.query_params:
        #     data = data.filter(name='Max Wind Speed')
        # elif 'dominantWindDirection' in request.query_params:
        #     data = data.filter(name='Dominant Wind Direction')
        #
        # elif 'precipitationSum' in request.query_params:
        #     data = data.filter(name='Precipitation Sum')
        context = {
            'soil_moisture_10cm': data.filter(name='10 cm'),
            'soil_moisture_20cm': data.filter(name='20 cm'),
            'soil_moisture_100cm': data.filter(name='100 cm')
        }
        serializer = SoilMoistureListModelSerializer(context)
        return Response(serializer.data)

