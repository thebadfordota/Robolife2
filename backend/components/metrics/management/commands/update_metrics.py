from django.core.management.base import BaseCommand

from components.metrics.services import MetricsUpdateService
from shared.exceptions import CommandError


class Command(BaseCommand):
    """Команда для обновления погодных метрик"""

    __metrics_service_class = MetricsUpdateService
    help = 'Обновляет информацию для графиков из api open-meteo'

    def __init__(self, *args, **kwargs):
        super(Command, self).__init__(*args, **kwargs)
        self.__metrics_service_class = self.__metrics_service_class()
        self.is_success_command = True

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Инициализировано обновление информации из api open-meteo'))
        try:
            self.__metrics_service_class.startup_updating()
        except CommandError as e:
            self.stdout.write(self.style.ERROR(e))
            self.is_success_command = False
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Получена неожиданная ошибка: {e}'))

        if self.is_success_command:
            self.stdout.write(self.style.SUCCESS('Обновление информации из api open-meteo успешно завершено'))
