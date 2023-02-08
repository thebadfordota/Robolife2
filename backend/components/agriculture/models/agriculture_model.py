from django.db.models import (
    CharField,
    PositiveSmallIntegerField,
    DateField,
    UniqueConstraint,
)

from shared.models import BaseModel


class AgricultureModel(BaseModel):
    """Модель агрокультуры"""

    name = CharField(max_length=255, verbose_name='Название культуры')
    label = CharField(max_length=255, verbose_name='Описание')
    max_permissible_precipitation_level = PositiveSmallIntegerField(
        verbose_name='Максимально допустимый уровень осадков (мм)'
    )
    min_permissible_precipitation_level = PositiveSmallIntegerField(
        verbose_name='Минимально допустимый уровень осадков (мм)'
    )
    vegetation_season_start = DateField(verbose_name='Начало вегетационного периода')
    vegetation_season_end = DateField(verbose_name='Конец вегетационного периода')

    class Meta:
        verbose_name_plural = 'Агрокультуры'
        verbose_name = 'Агрокультура'
        ordering = ['created']
        constraints = [
            UniqueConstraint(fields=['name'], name='unique_agriculture_name'),
        ]

    def __str__(self):
        return self.name
