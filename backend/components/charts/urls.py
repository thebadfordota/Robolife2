from rest_framework.routers import DefaultRouter

from components.charts.views import WindSpeedViewSet, TestViewSet

app_name = 'charts'

router = DefaultRouter()
router.register(r'wind_speed', WindSpeedViewSet, basename='wind_speed')
router.register(r'test', TestViewSet, basename='test')

urlpatterns = router.urls
