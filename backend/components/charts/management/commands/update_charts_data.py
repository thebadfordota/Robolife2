from django.core.management.base import BaseCommand

from components.charts.services import ChartsService
# from shared.clients import OpenMeteoClient
from shared.exceptions import NotFoundValueError, CommandError


class Command(BaseCommand):
    # client_class = OpenMeteoClient
    service_class = ChartsService
    help = 'Обновляет информацию для графиков из api open-meteo'

    def __init__(self, *args, **kwargs):
        super(Command, self).__init__(*args, **kwargs)
        # self.client_class = self.client_class()
        self.service_class = self.service_class()
        self.is_success_command = True

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Инициализировано обновление информации из api open-meteo'))
        try:
            self.service_class.update_wind_speed_data()
        except CommandError as e:
            self.stdout.write(self.style.ERROR(e))
            self.is_success_command = False

        if not self.is_success_command:
            return

        self.stdout.write(self.style.SUCCESS('Обновление информации из api open-meteo успешно завершено'))
