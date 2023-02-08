from django.db.models import TextChoices


class NotificationsTypeEnum(TextChoices):
    """Enum для видов уведомлений"""

    COMMENT_CREATED = 'COMMENT_CREATED', 'Комментарий создан'
