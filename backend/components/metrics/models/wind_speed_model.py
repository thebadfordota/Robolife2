from django.db import models

from shared.models import BaseModel


class WindSpeedModel(BaseModel):
    """Модель скорости ветра"""

    value = models.FloatField(blank=True, verbose_name='Значение')
    date_time = models.DateTimeField(blank=True, verbose_name='Дата и время')

    class Meta:
        verbose_name_plural = 'Все метрики скорости ветра'
        verbose_name = 'Скорость ветра'
        ordering = ['date_time']

    def __str__(self):
        return f'{self.value} | {self.date_time}'
