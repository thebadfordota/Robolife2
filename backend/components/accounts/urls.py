from django.urls import path
from rest_framework.routers import DefaultRouter

from components.accounts.views import (
    RegisterUserModelViewSet,
    TokenObtainPairView,
    UserCommentsModelViewSet,
)

app_name = 'accounts'

router = DefaultRouter()
router.register(r'register', RegisterUserModelViewSet, basename='user')
router.register(r'comments', UserCommentsModelViewSet, basename='user_comments')

urlpatterns = router.urls

urlpatterns += [
    path('authorization/', TokenObtainPairView.as_view(), name='token'),
]
