from django.db.models import (
    DateTimeField,
    Model,
    Manager
)


class BaseModel(Model):
    created = DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    updated = DateTimeField(auto_now=True, verbose_name='Дата обновления')
    objects = Manager()

    class Meta:
        abstract = True
