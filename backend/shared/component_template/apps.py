from django.apps import AppConfig


class MyComponentConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'components.mycomponent'
    label = 'mycomponent'
    verbose_name = 'My Comp'
