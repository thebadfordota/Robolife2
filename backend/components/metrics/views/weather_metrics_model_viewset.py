from django.db.models import Q
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.viewsets import ModelViewSet

from components.metrics.models import WeatherMetricsModel, RegionNormModel
from components.metrics.serializers import WeatherMetricsModelSerializer
from components.metrics.serializers.weather_metrics_list_model_serializer import WeatherMetricsListModelSerializer


class WeatherMetricsModelViewSet(ModelViewSet):
    """ViewSet для получения метрик погоды"""

    queryset = WeatherMetricsModel.objects.all()
    serializer_class = WeatherMetricsModelSerializer
    # permission_classes = [IsAuthenticated]
    pagination_class = None

    def list(self, request, *args, **kwargs):

        metric = self.queryset.all().order_by("date")
        if 'startDate' in request.query_params and 'endDate' in request.query_params:
            metric = metric.filter(date__range=(
                request.query_params.get('startDate'),
                request.query_params.get('endDate')
            ))

        if 'maxTemperature' in request.query_params and 'minTemperature' in request.query_params:
            metric = metric.filter(Q(name='Max Temperature') | Q(name='Min Temperature'))
        elif 'maxTemperature' in request.query_params:
            metric = metric.filter(name='Max Temperature')
        elif 'minTemperature' in request.query_params:
            metric = metric.filter(name='Min Temperature')

        elif 'maxWindSpeed' in request.query_params and 'dominantWindDirection' in request.query_params:
            metric = metric.filter(Q(name='Max Wind Speed') | Q(name='Dominant Wind Direction'))
        elif 'maxWindSpeed' in request.query_params:
            metric = metric.filter(name='Max Wind Speed')
        elif 'dominantWindDirection' in request.query_params:
            metric = metric.filter(name='Dominant Wind Direction')

        elif 'precipitationSum' in request.query_params:
            metric = metric.filter(name='Precipitation Sum')

        region_norm = RegionNormModel.objects.all().order_by("date")

        if 'maxTemperature' in request.query_params and 'minTemperature' in request.query_params:
            region_norm = region_norm.filter(Q(name='Max Temperature') | Q(name='Min Temperature'))
        elif 'maxTemperature' in request.query_params:
            region_norm = region_norm.filter(name='Max Temperature')
        elif 'minTemperature' in request.query_params:
            region_norm = region_norm.filter(name='Min Temperature')

        elif 'maxWindSpeed' in request.query_params and 'dominantWindDirection' in request.query_params:
            region_norm = region_norm.filter(Q(name='Max Wind Speed') | Q(name='Dominant Wind Direction'))
        elif 'maxWindSpeed' in request.query_params:
            region_norm = region_norm.filter(name='Max Wind Speed')
        elif 'dominantWindDirection' in request.query_params:
            region_norm = region_norm.filter(name='Dominant Wind Direction')

        elif 'precipitationSum' in request.query_params:
            region_norm = region_norm.filter(name='Precipitation Sum')

        print(region_norm)
        serializer = WeatherMetricsListModelSerializer(
            {
                'metric': metric,
                'region_norm': region_norm
            },
            # many=True
        )
        # serializer.is_valid()
        return Response(serializer.data, status=HTTP_200_OK)
