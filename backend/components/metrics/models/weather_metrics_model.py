from django.db.models import (
    FloatField,
    DateField,
    CharField,
)

from components.metrics.enums import WeatherMetricsEnum
from shared.models import BaseModel


class WeatherMetricsModel(BaseModel):
    """Модель метрик погоды"""

    name = CharField(
        max_length=25,
        choices=WeatherMetricsEnum.choices,
        verbose_name='Название метрики'
    )
    value = FloatField(blank=True, null=True, verbose_name='Значение')
    date = DateField(blank=True, null=True, verbose_name='Дата')

    class Meta:
        verbose_name_plural = 'Метрики погоды'
        verbose_name = 'Метрика погоды'
        ordering = ['-date']

    def __str__(self):
        return f'{self.pk} | {self.name} | {self.value} | {self.date}'


