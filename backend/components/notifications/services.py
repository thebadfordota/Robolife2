from typing import NoReturn

from components.comments.models import UserCommentsModel
from components.notifications.repository import UserNotificationRepository


class UserNotificationService:
    """Сервис для работы с уведомлениями пользователей"""

    __repository_class = UserNotificationRepository

    def __init__(self):
        self.__repository_class = self.__repository_class()

    def create_user_notifications(self, user_comment: UserCommentsModel) -> NoReturn:
        """Создать уведомления для всех пользователей кроме его автора"""

        users = self.__repository_class.get_all_users_without_author(user_comment.user)
        self.__repository_class.create_user_notifications(users, user_comment)

