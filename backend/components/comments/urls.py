from rest_framework.routers import DefaultRouter

from components.comments.views import UserCommentsModelViewSet

app_name = 'comments'

router = DefaultRouter()
router.register(r'comments', UserCommentsModelViewSet, basename='user_comments')

urlpatterns = router.urls
