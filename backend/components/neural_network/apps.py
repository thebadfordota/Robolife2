from django.apps import AppConfig


class NeuralNetworkConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'components.neural_network'
    label = 'neural_network'
    verbose_name = 'Нейронные сети'
