from rest_framework.routers import DefaultRouter

from components.comments.views import UserCommentsQueryModelViewSet, UserCommentsCommandModelViewSet

app_name = 'comments'

router = DefaultRouter()
router.register(r'q', UserCommentsQueryModelViewSet, basename='user_comments_query')
router.register(r'c', UserCommentsCommandModelViewSet, basename='user_comments_command')

urlpatterns = router.urls
