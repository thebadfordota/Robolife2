import os
import pathlib

from PIL import UnidentifiedImageError
from django.http import JsonResponse
from fastbook import load_learner, PILImage
from rest_framework import status
from rest_framework.mixins import CreateModelMixin
from rest_framework.viewsets import GenericViewSet


class Diseases(CreateModelMixin, GenericViewSet):
    agricultures = {'corn': 'corn_diseases.pkl',
                    'soy': 'soy_diseases.pkl',
                    'sunflower': 'sunflower_diseases.pkl',
                    'wheat': 'wheat_diseases.pkl'}

    tensors_name = {
        "corn": {
            0: 'cercospora',
            1: 'common_rust',
            2: 'healthy',
            3: 'northern_leaf_blight'},
        "sunflower": {
            0: 'Downy_mildew',
            1: 'Gray_mold',
            2: 'Healthy',
            3: 'Leaf_scars'},
        "soy": {
            0: 'Caterpillar',
            1: 'Diabrotica_speciosa',
            2: 'Healthy'
        },
        "wheat": {
            0: "Healthy",
            1: "septoria",
            2: "stripe_rust"
        }

    }

    def create(self, request, *args, **kwargs):
        temp = pathlib.PosixPath
        pathlib.PosixPath = pathlib.WindowsPath

        agriculture = request.POST.get('agriculture', None)
        file = request.FILES.get('image', None)
        if agriculture is None or agriculture not in self.agricultures.keys():
            return JsonResponse({"error": 'Нету такой агрокультуры'},
                                safe=False, status=status.HTTP_400_BAD_REQUEST)
        if file is None:
            return JsonResponse({"error": 'Файл не передан'},
                                safe=False, status=status.HTTP_400_BAD_REQUEST)
        try:
            img = PILImage.create(file)
        except UnidentifiedImageError:
            return JsonResponse({"error": 'Неправильный формат изображения'},
                                safe=False, status=status.HTTP_400_BAD_REQUEST)
        base_path = pathlib.Path(os.path.dirname(__file__))
        learn_inf = load_learner(base_path / 'learner' / self.agricultures[agriculture])

        learn_result = learn_inf.predict(img)

        response_result = []
        for index, tensor in enumerate(learn_result[2]):
            coincidence = float(tensor)
            tensor_name = self.tensors_name[agriculture][index]
            response_result.append({tensor_name: coincidence})

        return JsonResponse(response_result,
                            safe=False, status=status.HTTP_200_OK)
