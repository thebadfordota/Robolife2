from rest_framework.routers import DefaultRouter

from components.notifications.views import (
    UserNotificationsQueryModelViewSet,
    UserNotificationsCommandModelViewSet,
)

app_name = 'notifications'

router = DefaultRouter()
router.register(r'q', UserNotificationsQueryModelViewSet, basename='notifications_query')
router.register(r'c', UserNotificationsCommandModelViewSet, basename='notifications_command')

urlpatterns = router.urls
