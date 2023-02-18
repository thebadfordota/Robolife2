from django.db.models import (
    ForeignKey,
    CASCADE,
    CharField,
)

from components.comments.models import UserCommentsModel
from components.notifications.enums import NotificationsTypeEnum
from config.settings import AUTH_USER_MODEL
from shared.models import BaseModel


class UserNotificationsModel(BaseModel):
    """Модель уведомлений пользователя"""

    comment = ForeignKey(
        UserCommentsModel,
        null=True,
        on_delete=CASCADE,
        verbose_name='Комментарий'
    )
    user = ForeignKey(
        AUTH_USER_MODEL,
        null=True,
        on_delete=CASCADE,
        verbose_name='Пользователь'
    )
    notification_type = CharField(
        max_length=128,
        choices=NotificationsTypeEnum.choices,
        verbose_name='Тип уведомления',
        null=True,
    )

    class Meta:
        verbose_name_plural = 'Уведомления'
        verbose_name = 'Уведомление'
        ordering = ['created']

    def __str__(self):
        return f'{self.pk} | {self.user} | {self.comment}'
