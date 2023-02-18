from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView

from components.neural_network.enums import AgricultureDatasetEnum
from components.neural_network.services import PlantDiseasesService
from components.neural_network.validators import validate_plant_diseases


class CheckPlantDiseasesAPIView(APIView):
    """APIView для проверки растений на болезни"""

    permission_classes = [IsAuthenticated]
    service_class = PlantDiseasesService

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.service_class = self.service_class()

    def post(self, request, *args, **kwargs):
        agriculture_name = request.POST.get('agriculture_name')
        file = request.FILES.get('image')

        validate_plant_diseases(agriculture_name, file)
        agriculture = AgricultureDatasetEnum.get_enum_by_label_name(agriculture_name)
        result = self.service_class.calculate_diseases_probability(file, agriculture)
        return Response(result, status=HTTP_200_OK)
