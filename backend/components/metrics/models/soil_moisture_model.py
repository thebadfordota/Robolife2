from django.db.models import (
    FloatField,
    DateField,
    CharField,
)

from config.constants import SOIL_MOISTURE_GROUND_LEVEL_CHOICES
from shared.models import BaseModel


class SoilMoistureModel(BaseModel):
    """Модель метрик влажности почвы"""

    name = CharField(
        max_length=25,
        choices=SOIL_MOISTURE_GROUND_LEVEL_CHOICES,
        verbose_name='Глубина почвы'
    )
    value = FloatField(blank=True, null=True, verbose_name='Значение')
    date = DateField(blank=True, null=True, verbose_name='Дата')

    class Meta:
        verbose_name_plural = 'Метрики влажности почвы'
        verbose_name = 'Метрика влажности почвы'
        ordering = ['-date']

    def __str__(self):
        return f'{self.pk} | {self.name} | {self.value} | {self.date}'


