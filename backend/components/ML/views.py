import pathlib
import os

from PIL import UnidentifiedImageError
from django.http import JsonResponse
from rest_framework import status
from rest_framework.mixins import CreateModelMixin
from rest_framework.viewsets import GenericViewSet

from fastbook import load_learner, PILImage


class CornDiseases(CreateModelMixin, GenericViewSet):
    """
        Cercospora - Серая пятнистость листьев (GLS) — лиственное грибковое заболевание, поражающее кукурузу ,
            Есть два грибковых патогена, которые вызывают GLS: Cercospora zeae-maydis и Cercospora zeina
        -------------------------
		common_rust
		  Обыкновенная ржавчина вызывается грибком Puccinia sorghi.
		  Поздние инфекции имеют ограниченное влияние на урожайность.
		-------------------------
		healthy - здоровый
		--------------------------
		northern_leaf_blight - Северная пятнистость листьев кукурузы (NCLB) или ожог листьев Turcicum (TLB)
		 лиственное заболевание кукурузы ( вызываемое Exserohilum turcicum ,
		 анаморфой аскомицета Setosphaeria turcica .
		 Благодаря своим характерным сигарообразным поражениям это заболевание может привести к значительной потере урожая восприимчивых гибридов кукурузы.

    """

    learn_inf = NotImplemented

    def __init__(self, *args, **kwargs):
        base_path = pathlib.Path(os.path.dirname(__file__))
        self.learn_inf = load_learner(base_path/'learner/corn_diseases.pkl')
        super().__init__(*args, **kwargs)

    def create(self, request, *args, **kwargs):

        file = request.FILES.get('image', None)
        if file is None:
            return JsonResponse({"error": 'Файл не передан'},
                                safe=False, status=status.HTTP_400_BAD_REQUEST)
        try:
            img = PILImage.create(file)
        except UnidentifiedImageError:
            return JsonResponse({"error": 'Неправильный формат изображения'},
                                safe=False, status=status.HTTP_400_BAD_REQUEST)
        learn_result = self.learn_inf.predict(img)
        return JsonResponse({"result": learn_result[0], 'other_date':learn_result[0]},
                            safe=False, status=status.HTTP_200_OK)

