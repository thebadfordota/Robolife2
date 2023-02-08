from typing import Sequence

from django.contrib.auth import get_user_model

UserModel = get_user_model()


class UserRepository:
    """Репозиторий для работы с пользователями"""

    model_class = UserModel

    def get_all_users_without_specified(self, users: Sequence[int]) -> list[UserModel]:
        """Получить список пользователей за исключением указанных"""

        return self.model_class.objects.all().exclude(id__in=users)
