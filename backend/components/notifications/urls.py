from rest_framework.routers import DefaultRouter

from components.notifications.views import UserNotificationsModelViewSet

app_name = 'notifications'

router = DefaultRouter()
router.register(r'notification', UserNotificationsModelViewSet, basename='notifications')

urlpatterns = router.urls
