from typing import NoReturn

from components.metrics.repository import SoilMoistureRepository
from config.constants import SOIL_MOISTURE_GROUND_LEVEL_CHOICES
from shared.clients import OpenMeteoForecastClientV2


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
        ...


