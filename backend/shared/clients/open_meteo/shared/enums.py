from django.db.models import TextChoices


class TimeTypeEnum(TextChoices):
    """Enum для типов времени"""

    HOURLY = 'hourly'
    DAILY = 'daily'
