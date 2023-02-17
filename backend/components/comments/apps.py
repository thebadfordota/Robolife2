from django.apps import AppConfig


class CommentsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'components.comments'
    label = 'comments'
    verbose_name = 'Комментарии'
