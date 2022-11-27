from components.charts.models import WindSpeedModel
from shared.clients import OpenMeteoClient
from shared.exceptions import (
    NotFoundValueError,
    CommandError,
)


class ChartsService:
    client_class = OpenMeteoClient

    def __init__(self):
        self.client_class = self.client_class()

    def update_wind_speed_data(self):
        """Обновить информацию о скорости ветра"""
        try:
            wind_speed = self.client_class.get_wind_speed_metrics_by_time_interval('2022-06-08', '2022-08-27')
        except NotFoundValueError as e:
            print(e)
            raise CommandError('Не получилось обновить данные о скорости ветра')

        self._bulk_create_wind_speed_objects(wind_speed[0], wind_speed[1])

    @staticmethod
    def _bulk_create_wind_speed_objects(value: list[float], date_time: list[str]):
        list_length = min(len(value), len(date_time))
        WindSpeedModel.objects.bulk_create([
            WindSpeedModel(value=value[idx], date_time=date_time[idx])
            for idx in range(list_length)
        ])