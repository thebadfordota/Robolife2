from rest_framework.routers import DefaultRouter

from components.ML.views import Diseases

app_name = 'ML'

router = DefaultRouter()
router.register(r'find-diseases', Diseases, basename='find-diseases')

urlpatterns = router.urls
