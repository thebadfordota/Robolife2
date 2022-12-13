from typing import NoReturn

from components.metrics.repository import SoilMoistureRepository
from config.constants import SOIL_MOISTURE_GROUND_LEVEL_CHOICES
from shared.clients import OpenMeteoForecastClientV2
from shared.exceptions import NotFoundValueError, CommandError


class SoilMoistureService:
    """Сервис для работы с метриками влажности почвы"""

    client_class = OpenMeteoForecastClientV2
    repository_class = SoilMoistureRepository

    def __init__(self, start_date: str = '', end_date: str = ''):
        self.start_date = start_date
        self.end_date = end_date
        self.metric_choices = SOIL_MOISTURE_GROUND_LEVEL_CHOICES

        self.client_class = self.client_class()
        self.repository_class = self.repository_class()

    def update_metrics(self) -> NoReturn:
        """Обновить метрики влажности почвы"""

        self.update_soil_moisture_10cm_level_data()
        self.update_soil_moisture_20cm_level_data()
        self.update_soil_moisture_100cm_level_data()

    def update_soil_moisture_10cm_level_data(self) -> NoReturn:
        metric_name = self.metric_choices[0][0]
        start_date, end_date = self.get_time_interval(metric_name)
        if start_date == end_date or end_date < start_date:
            return

        try:
            value, date = self.client_class.get_soil_moisture_10cm_level_by_date_interval(start_date, end_date)
        except NotFoundValueError as e:
            print(e)
            raise CommandError('Не получилось обновить данные о влажности почвы 10 см')

        self.repository_class.bulk_create_weather_metrics(metric_name, value, date)

    def update_soil_moisture_20cm_level_data(self) -> NoReturn:
        metric_name = self.metric_choices[1][0]
        start_date, end_date = self.get_time_interval(metric_name)
        if start_date == end_date or end_date < start_date:
            return

        try:
            value, date = self.client_class.get_soil_moisture_20cm_level_by_date_interval(start_date, end_date)
        except NotFoundValueError as e:
            print(e)
            raise CommandError('Не получилось обновить данные о влажности почвы 20 см')

        self.repository_class.bulk_create_weather_metrics(metric_name, value, date)

    def update_soil_moisture_100cm_level_data(self) -> NoReturn:
        metric_name = self.metric_choices[2][0]
        start_date, end_date = self.get_time_interval(metric_name)
        if start_date == end_date or end_date < start_date:
            return

        try:
            value, date = self.client_class.get_soil_moisture_100cm_level_by_date_interval(start_date, end_date)
        except NotFoundValueError as e:
            print(e)
            raise CommandError('Не получилось обновить данные о влажности почвы 100 см')

        self.repository_class.bulk_create_weather_metrics(metric_name, value, date)

    def get_time_interval(self, metric_name: str) -> tuple[str, str]:
        start_date = self.repository_class.get_start_date(metric_name)
        end_date = self.repository_class.get_end_date()
        start_date = start_date.split(' ')[0]
        end_date = end_date.split(' ')[0]
        return start_date, end_date
