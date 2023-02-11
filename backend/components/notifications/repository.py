from typing import NoReturn

from components.accounts.models import UserModel
from components.comments.models import UserCommentsModel
from components.notifications.enums import NotificationsTypeEnum
from components.notifications.models import UserNotificationsModel


class UserNotificationRepository:
    """Репозиторий для работы с уведомлениями пользователей """

    model_class = UserNotificationsModel

    def create_user_notifications(self,
                                  users: list[UserModel],
                                  user_comment: UserCommentsModel,
                                  notification_type: NotificationsTypeEnum) -> NoReturn:
        """Создать массово уведомления для пользователей"""

        self.model_class.objects.bulk_create([
            UserNotificationsModel(
                comment=user_comment,
                user=user,
                notification_type=notification_type.value
            )
            for user in users
        ])
