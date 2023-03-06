from rest_framework.routers import DefaultRouter

from components.agriculture.views import AgricultureQueryModelViewSet, AgricultureCommandViewSet

app_name = 'agriculture'

router = DefaultRouter()
router.register(r'q', AgricultureQueryModelViewSet, basename='agriculture_query')
router.register(r'c', AgricultureCommandViewSet, basename='agriculture_command')

urlpatterns = router.urls
