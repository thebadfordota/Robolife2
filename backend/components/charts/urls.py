from rest_framework.routers import DefaultRouter

from components.charts.views import WindSpeedViewSet

app_name = 'charts'

router = DefaultRouter()
router.register(r'wind_speed', WindSpeedViewSet, basename='wind_speed')

urlpatterns = router.urls
