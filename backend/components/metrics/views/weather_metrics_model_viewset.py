from django.db.models import Q
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from components.metrics.models import WeatherMetricsModel
from components.metrics.serializers import WeatherMetricsModelSerializer


class WeatherMetricsModelViewSet(ModelViewSet):
    """ViewSet для получения метрик погоды"""

    queryset = WeatherMetricsModel.objects.all()
    serializer_class = WeatherMetricsModelSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None

    def list(self, request, *args, **kwargs):
        data = self.queryset.all()
        if 'startDate' in request.query_params and 'endDate' in request.query_params:
            data = data.filter(date__range=(
                request.query_params.get('startDate'),
                request.query_params.get('endDate')
            ))

        if 'maxTemperature' in request.query_params and 'minTemperature' in request.query_params:
            data = data.filter(Q(name='Max Temperature') | Q(name='Min Temperature'))
        elif 'maxTemperature' in request.query_params:
            data = data.filter(name='Max Temperature')
        elif 'minTemperature' in request.query_params:
            data = data.filter(name='Min Temperature')

        elif 'maxWindSpeed' in request.query_params and 'dominantWindDirection' in request.query_params:
            data = data.filter(Q(name='Max Wind Speed') | Q(name='Dominant Wind Direction'))
        elif 'maxWindSpeed' in request.query_params:
            data = data.filter(name='Max Wind Speed')
        elif 'dominantWindDirection' in request.query_params:
            data = data.filter(name='Dominant Wind Direction')

        elif 'precipitationSum' in request.query_params:
            data = data.filter(name='Precipitation Sum')

        serializer = WeatherMetricsModelSerializer(data=data, many=True)
        serializer.is_valid()
        return Response(serializer.data)
