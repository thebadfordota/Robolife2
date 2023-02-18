from django.urls import path

from components.neural_network.views import CheckPlantDiseasesAPIView

app_name = 'neural_network'


urlpatterns = [
    path('check-plant-diseases/c/', CheckPlantDiseasesAPIView.as_view(), name='check_plant_diseases'),
]


