from django.core.management.base import BaseCommand

from components.metrics.services import MetricsService, SoilMoistureService
from shared.exceptions import CommandError


class Command(BaseCommand):
    """Команда для обновления погодных метрик"""

    _metrics_service_class = MetricsService
    _soil_moisture_service_class = SoilMoistureService
    help = 'Обновляет информацию для графиков из api open-meteo'

    def __init__(self, *args, **kwargs):
        super(Command, self).__init__(*args, **kwargs)
        self._metrics_service_class = self._metrics_service_class()
        self._soil_moisture_service_class = self._soil_moisture_service_class()
        self.is_success_command = True

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Инициализировано обновление информации из api open-meteo'))
        try:
            self._metrics_service_class.update_metrics()
            self._soil_moisture_service_class.update_metrics()
        except CommandError as e:
            self.stdout.write(self.style.ERROR(e))
            self.is_success_command = False

        if not self.is_success_command:
            return

        self.stdout.write(self.style.SUCCESS('Обновление информации из api open-meteo успешно завершено'))
