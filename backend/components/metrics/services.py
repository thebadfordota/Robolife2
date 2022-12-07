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

    def __init__(self, start_date: str = '', end_date: str = ''):
        self.start_date = start_date
        self.end_date = end_date
        # self.base_begin_date = BASE_BEGIN_DATE

        self.client_class = self.client_class()
        self.repository_class = self.repository_class()

    def update_metrics(self):
        """Обновить данные для всех метрик"""
        self.update_temperature_data()
        # self.update_wind_speed_data()
        # self.update_wind_direction_data()

    def update_temperature_data(self):
        # last_date = self.repository_class.get_metric_last_date('Temperature')
        start_datetime, end_datetime = self.get_time_interval('Temperature')
        try:
            temperature = self.client_class.get_temperature_metrics_by_time_interval(start_datetime, end_datetime)
        except NotFoundValueError as e:
            print(e)
            raise CommandError('Не получилось обновить данные о температуре')
        self.repository_class.bulk_create_weather_metrics(0, temperature[0], temperature[1])

    def update_precipitation_data(self):
        try:
            # precipitation = self.client_class.('2022-06-08', '2022-12-01')
            ...
        except NotFoundValueError as e:
            print(e)
            raise CommandError('Не получилось обновить данные об осадках')
        # self.repository_class.bulk_create_weather_metrics(1, precipitation[0], precipitation[1])

    def update_wind_speed_data(self):
        """Обновить информацию о скорости ветра"""

        try:
            wind_speed = self.client_class.get_wind_speed_metrics_by_time_interval('2022-06-08', '2022-12-01')
        except NotFoundValueError as e:
            print(e)
            raise CommandError('Не получилось обновить данные о скорости ветра')

        self.repository_class.bulk_create_weather_metrics(2, wind_speed[0], wind_speed[1])

    def update_wind_direction_data(self):
        """Обновить информацию о направлении ветра"""
        try:
            wind_direction = self.client_class.get_wind_direction_metrics_by_time_interval('2022-06-08', '2022-12-01')
        except NotFoundValueError as e:
            print(e)
            raise CommandError('Не получилось обновить данные о направлении ветра')
        self.repository_class.bulk_create_weather_metrics(3, wind_direction[0], wind_direction[1])

    def get_time_interval(self, metric_name: str) -> tuple[str, str]:
        """Получить интервал времени для обновления метрик погоды"""

        start_datetime = self.repository_class.get_metric_last_date(metric_name)
        end_datetime = self.repository_class.get_newest_datetime()
        return start_datetime, end_datetime
