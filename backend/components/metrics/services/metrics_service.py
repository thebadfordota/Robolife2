from components.metrics.repository import MetricsRepository
from config.constants import WEATHER_METRIC_NAME_CHOICES
from shared.clients import OpenMeteoForecastClientV2
from shared.exceptions import (
    NotFoundValueError,
    CommandError,
)


class MetricsService:
    """Сервис для работы с погодными метриками"""

    client_class = OpenMeteoForecastClientV2
    repository_class = MetricsRepository

    def __init__(self, start_date: str = '', end_date: str = ''):
        self.start_date = start_date
        self.end_date = end_date
        self.metric_choices = WEATHER_METRIC_NAME_CHOICES

        self.client_class = self.client_class()
        self.repository_class = self.repository_class()

    def update_metrics(self):
        """Обновить данные для всех метрик"""

        self.update_max_temperature_data()
        self.update_min_temperature_data()
        self.update_precipitation_sum_data()
        self.update_max_wind_speed_data()
        self.update_dominant_wind_direction_data()

    def update_max_temperature_data(self):
        """"""

        metric_name = self.metric_choices[0][0]
        start_date, end_date = self.get_time_interval(metric_name)
        if start_date == end_date or end_date < start_date:
            return

        try:
            value, date = self.client_class.get_max_temperature_by_date_interval(start_date, end_date)
        except NotFoundValueError as e:
            print(e)
            raise CommandError('Не получилось обновить данные о максимальной температуре')

        self.repository_class.bulk_create_weather_metrics(metric_name, value, date)

    def update_min_temperature_data(self):
        """"""

        metric_name = self.metric_choices[1][0]
        start_date, end_date = self.get_time_interval(metric_name)
        if start_date == end_date or end_date < start_date:
            return

        try:
            value, date = self.client_class.get_min_temperature_by_date_interval(start_date, end_date)
        except NotFoundValueError as e:
            print(e)
            raise CommandError('Не получилось обновить данные о минимальной температуре')

        self.repository_class.bulk_create_weather_metrics(metric_name, value, date)

    def update_precipitation_sum_data(self):
        """"""

        metric_name = self.metric_choices[2][0]
        start_date, end_date = self.get_time_interval(metric_name)
        if start_date == end_date or end_date < start_date:
            return

        try:
            value, date = self.client_class.get_precipitation_sum_by_date_interval(start_date, end_date)
        except NotFoundValueError as e:
            print(e)
            raise CommandError('Не получилось обновить данные о сумме осадков')

        self.repository_class.bulk_create_weather_metrics(metric_name, value, date)

    def update_max_wind_speed_data(self):
        """"""

        metric_name = self.metric_choices[3][0]
        start_date, end_date = self.get_time_interval(metric_name)
        if start_date == end_date or end_date < start_date:
            return

        try:
            value, date = self.client_class.get_max_wind_speed_by_date_interval(start_date, end_date)
        except NotFoundValueError as e:
            print(e)
            raise CommandError('Не получилось обновить данные о максимальной скорости ветра')

        self.repository_class.bulk_create_weather_metrics(metric_name, value, date)

    def update_dominant_wind_direction_data(self):
        """"""

        metric_name = self.metric_choices[4][0]
        start_date, end_date = self.get_time_interval(metric_name)
        if start_date == end_date or end_date < start_date:
            return

        try:
            value, date = self.client_class.get_dominant_wind_direction_by_date_interval(start_date, end_date)
        except NotFoundValueError as e:
            print(e)
            raise CommandError('Не получилось обновить данные о господствующем направлении ветра')

        self.repository_class.bulk_create_weather_metrics(metric_name, value, date)

    def get_time_interval(self, metric_name: str) -> tuple[str, str]:
        """Получить интервал времени для обновления метрик погоды"""

        start_datetime = self.repository_class.get_metric_start_update_date(metric_name)
        end_datetime = self.repository_class.get_newest_datetime()
        return start_datetime, end_datetime
