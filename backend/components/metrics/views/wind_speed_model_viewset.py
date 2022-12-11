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
        if 'maxTemperature' in request.query_params:
            data = self.queryset.filter(name='Max Temperature')
        elif 'minTemperature' in request.query_params:
            data = self.queryset.filter(name='Min Temperature')
        elif 'precipitationSum' in request.query_params:
            data = self.queryset.filter(name='Precipitation Sum')
        elif 'dominantWindDirection' in request.query_params:
            data = self.queryset.filter(name='Dominant Wind Direction')

        serializer = WeatherMetricsModelSerializer(data=data, many=True)
        serializer.is_valid()
        return Response(serializer.data)
