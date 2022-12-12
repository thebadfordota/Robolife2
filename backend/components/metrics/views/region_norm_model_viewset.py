from django.db.models import Q
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from components.metrics.models import RegionNormModel
from components.metrics.serializers import RegionNormModelSerializer


class RegionNormModelViewSet(ModelViewSet):
    """ViewSet для получения нормы для региона"""

    queryset = RegionNormModel.objects.all()
    serializer_class = RegionNormModelSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None

    def list(self, request, *args, **kwargs):
        data = self.queryset.all().order_by("date")
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

        serializer = RegionNormModelSerializer(data=data, many=True)
        serializer.is_valid()
        return Response(serializer.data)

