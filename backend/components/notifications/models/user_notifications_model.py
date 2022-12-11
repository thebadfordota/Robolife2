from django.db.models import (
    ForeignKey,
    CASCADE,
)

from components.accounts.models import UserCommentsModel
from config.settings import AUTH_USER_MODEL
from shared.models import BaseModel


class UserNotificationsModel(BaseModel):
    """Модель уведомлений пользователя"""

    comment = ForeignKey(UserCommentsModel, null=True, on_delete=CASCADE, verbose_name='Комментарий')
    user = ForeignKey(AUTH_USER_MODEL, null=True, on_delete=CASCADE, verbose_name='Пользователь')

    class Meta:
        verbose_name_plural = 'Уведомления'
        verbose_name = 'Уведомление'
        ordering = ['-created', '-updated']

    def __str__(self):
        return f'{self.pk} | {self.user} | {self.comment}'
