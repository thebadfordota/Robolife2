from rest_framework.permissions import IsAuthenticated

from components.comments.models import UserCommentsModel
from components.comments.serializers import UserCommentsCreateModelSerializer
from components.notifications.services import UserNotificationService
from shared.api.views import BaseCommandModelViewSet


class UserCommentsCommandModelViewSet(BaseCommandModelViewSet):
    """CommandModelViewSet для работы с комментариями пользователя"""

    queryset = UserCommentsModel.objects.all()
    serializer_class = UserCommentsCreateModelSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None
    service_class = UserNotificationService

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.service_class = self.service_class()

    def perform_create(self, serializer):
        user_comment_model = serializer.save()
        self.service_class.create_user_notifications(user_comment_model)
