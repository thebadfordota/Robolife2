from components.metrics.models import WindSpeedModel
from components.metrics.repository import MetricsRepository
from shared.clients import OpenMeteoClient
from shared.exceptions import (
    NotFoundValueError,
    CommandError,
)


class MetricsService:
    """Сервис для работы с погодными метриками"""

    client_class = OpenMeteoClient
    repository_class = MetricsRepository

    def __init__(self):
        self.client_class = self.client_class()
        self.repository_class = self.repository_class()

    def update_metrics(self):
        """Обновить данные для всех метрик"""

        self.update_wind_speed_data()

    def update_wind_speed_data(self):
        """Обновить информацию о скорости ветра"""

        try:
            wind_speed = self.client_class.get_wind_speed_metrics_by_time_interval('2022-06-08', '2022-08-27')
        except NotFoundValueError as e:
            print(e)
            raise CommandError('Не получилось обновить данные о скорости ветра')

        self.repository_class.bulk_create_wind_speed_objects(wind_speed[0], wind_speed[1])

    def update_wind_direction_data(self):
        ...

    def update_temperature_data(self):
        ...

    def update_precipitation_data(self):
        ...

