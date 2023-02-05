from rest_framework.routers import DefaultRouter

from components.notifications.views import (
    UserNotificationsQueryModelViewSet,
    UserNotificationsCommandModelViewSet,
)

app_name = 'notifications'

router = DefaultRouter()
router.register(r'notification/q', UserNotificationsQueryModelViewSet, basename='notifications_query')
router.register(r'notification/c', UserNotificationsCommandModelViewSet, basename='notifications_command')

urlpatterns = router.urls
