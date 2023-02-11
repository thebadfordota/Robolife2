from django.db.models import (
    CharField,
    ForeignKey,
    SET_NULL,
)

from components.metrics.models import WeatherMetricsModel
from config.settings import AUTH_USER_MODEL
from shared.models import BaseModel


class UserCommentsModel(BaseModel):
    """Модель комментариев пользователей"""

    message = CharField(max_length=256, blank=True, verbose_name='Комментарий')
    user = ForeignKey(AUTH_USER_MODEL, null=True, on_delete=SET_NULL, verbose_name='Пользователь')
    weather_metric = ForeignKey(WeatherMetricsModel, null=True, on_delete=SET_NULL, verbose_name='Метрика погоды')

    class Meta:
        verbose_name_plural = 'Комментарии'
        verbose_name = 'Комментарий'
        ordering = ['-created']

    def __str__(self):
        return f'{self.pk} | {self.user} | {self.weather_metric}'




