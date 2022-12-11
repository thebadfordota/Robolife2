from django.urls import path
from rest_framework.routers import DefaultRouter

from components.accounts.views import UserModelViewSet, TokenObtainPairView

app_name = 'accounts'

router = DefaultRouter()
router.register(r'user', UserModelViewSet, basename='user')

urlpatterns = router.urls

urlpatterns += [
    path('authorization/', TokenObtainPairView.as_view(), name='token'),
]
