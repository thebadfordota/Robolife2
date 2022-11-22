import django.utils.timezone
from django.db import models

from shared.models.base_model import BaseModel


class ProductModel(BaseModel):
    """Модель продукта"""

    name = models.CharField(max_length=100, verbose_name="Название")
    appearance_date = models.DateField(default=django.utils.timezone.now, verbose_name="Дата появления")
    price = models.IntegerField(verbose_name="Ежемесячная цена")
    duration_of_action = models.IntegerField(verbose_name="Длительность действия в месяцах")
    about_product = models.CharField(blank=True, max_length=100, verbose_name="О продукте")
    is_published = models.BooleanField(blank=True, default=True, verbose_name="Опубликовать")

    class Meta:
        verbose_name_plural = 'Продукты'
        verbose_name = 'Продукт'
        ordering = ['appearance_date']

    def __str__(self):
        return self.name
