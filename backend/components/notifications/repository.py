from typing import NoReturn

from components.accounts.models import UserModel, UserCommentsModel
from components.notifications.models import UserNotificationsModel


class UserNotificationRepository:
    """Репозиторий для работы с уведомлениями пользователей """

    @staticmethod
    def get_all_users_without_author(author_model: UserModel) -> list[UserModel]:
        """Получить список всех пользователей за исключением автора"""

        return UserModel.objects.all().exclude(id=author_model.id)

    @staticmethod
    def create_user_notifications(users: list[UserModel], user_comment: UserCommentsModel) -> NoReturn:
        """Создать массово уведомления для пользователей"""

        UserNotificationsModel.objects.bulk_create([
            UserNotificationsModel(
                comment=user_comment,
                user=user
            )
            for user in users
        ])
