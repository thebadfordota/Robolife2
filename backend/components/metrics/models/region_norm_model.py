from django.db.models import CharField, FloatField, DateField

from components.metrics.enums import WeatherMetricsEnum
from shared.models import BaseModel


class RegionNormModel(BaseModel):
    """Модель нормы для региона"""

    name = CharField(
        max_length=128,
        choices=WeatherMetricsEnum.choices,
        verbose_name='Название метрики'
    )
    value = FloatField(blank=True, verbose_name='Значение', null=True)
    date = DateField(blank=True, null=True, verbose_name='Дата')

    class Meta:
        verbose_name_plural = 'Нормы для региона'
        verbose_name = 'Норма для региона'
        ordering = ['-date']

    def __str__(self):
        return f'{self.name} | {self.value} | {self.date}'
