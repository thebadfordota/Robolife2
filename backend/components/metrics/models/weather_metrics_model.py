from django.db.models import (
    FloatField,
    DateTimeField,
    CharField,
)

from config.constants import WEATHER_METRIC_NAME_CHOICES
from shared.models import BaseModel


class WeatherMetricsModel(BaseModel):
    """Модель метрик погоды"""

    name = CharField(
        max_length=25,
        choices=WEATHER_METRIC_NAME_CHOICES,
        verbose_name='Название метрики'
    )
    value = FloatField(blank=True, verbose_name='Значение')
    date_and_time = DateTimeField(blank=True, verbose_name='Дата и время')

    class Meta:
        verbose_name_plural = 'Метрики погоды'
        verbose_name = 'Метрика погоды'
        ordering = ['-date_and_time']

    def __str__(self):
        return f'{self.name} | {self.value} | {self.date_and_time}'
