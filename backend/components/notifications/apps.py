from django.apps import AppConfig


class NotificationsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'components.notifications'
    label = 'notifications'
    verbose_name = 'Уведомления'
