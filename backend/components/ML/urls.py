from rest_framework.routers import DefaultRouter

from components.ML.views import CornDiseases

app_name = 'ML'

router = DefaultRouter()
router.register(r'find-corn-diseases', CornDiseases, basename='find-corn-diseases')

urlpatterns = router.urls
