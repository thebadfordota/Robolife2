from django.db.models import CharField
from django.contrib.auth.models import AbstractUser


class UserModel(AbstractUser):
    """Модель пользователя"""

    first_name = CharField("Имя", max_length=150)
    last_name = CharField("Фамилия", max_length=150)
    patronymic = CharField("Отчество", max_length=150, blank=True)
    phone = CharField("Номер телефона", max_length=20, blank=True, null=True)

    class Meta(AbstractUser.Meta):
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

    def __str__(self):
        return f'{self.pk} | {self.username}'
