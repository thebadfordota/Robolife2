from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from components.accounts.models import UserModel
from components.accounts.serializers import UserModelSerializer


class UserModelViewSet(ModelViewSet):
    """ViewSet для информации о пользователе"""

    queryset = UserModel.objects.all()
    serializer_class = UserModelSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None

    # def list(self, request, *args, **kwargs):
    #     data = self.queryset.all()
    #     if 'maxTemperature' in request.query_params:
    #         data = self.queryset.filter(name='Max Temperature')
    #     elif 'minTemperature' in request.query_params:
    #         data = self.queryset.filter(name='Min Temperature')
    #     elif 'precipitationSum' in request.query_params:
    #         data = self.queryset.filter(name='Precipitation Sum')
    #     elif 'dominantWindDirection' in request.query_params:
    #         data = self.queryset.filter(name='Dominant Wind Direction')
    #
    #     serializer = WeatherMetricsModelSerializer(data=data, many=True)
    #     serializer.is_valid()
    #     return Response(serializer.data)
