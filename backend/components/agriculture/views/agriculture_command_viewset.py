from rest_framework.permissions import IsAuthenticated

from components.agriculture.models import AgricultureModel
from components.agriculture.serializers import AgricultureModelModelSerializer
from shared.api.views import BaseCommandModelViewSet


class AgricultureCommandViewSet(BaseCommandModelViewSet):
    """CommandModelViewSet для работы с агрокультурами"""

    queryset = AgricultureModel.objects.all()
    serializer_class = AgricultureModelModelSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None
