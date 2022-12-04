from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from components.charts.services import ChartsService


class TestViewSet(ViewSet):
    permission_classes = (IsAuthenticated,)

    def list(self, request):
        # ChartsService().update_wind_speed_data()
        return Response('test')


