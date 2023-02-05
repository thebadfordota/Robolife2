from typing import Mapping

from django.db.models import QuerySet

from components.metrics.models import WeatherMetricsModel
from components.metrics.repository import MetricsRepository


class MetricsService:
    """Сервис для работы с погодными метриками"""

    __repository_class = MetricsRepository

    def __init__(self):
        self.__repository_class = self.__repository_class()

    def filter_metrics_by_date_range(self, queryset: WeatherMetricsModel, query_params: dict) -> WeatherMetricsModel:
        """Фильтровать метрики по временному диапазону"""

        if self.__does_query_params_have_date_keywords(query_params):
            queryset = self.__repository_class.filter_metrics_by_date_range(
                queryset,
                query_params
            )

        return queryset

    @staticmethod
    def __does_query_params_have_date_keywords(query_params: dict) -> bool:
        """Имеют ли параметры запроса ключевые слова для фильтрации по дате и времени"""

        return 'startDate' in query_params and 'endDate' in query_params

    def filter_weather_metrics_by_query_params(self, queryset: QuerySet,
                                               query_params: dict) -> QuerySet:
        """Фильтровать погодные метрики по query параметрам"""

        return self.__repository_class.filter_weather_metrics_by_query_params(
            queryset,
            query_params
        )

    def filter_soil_moisture_metrics_by_ground_level(self,
                                                     metrics: WeatherMetricsModel) -> Mapping[str, WeatherMetricsModel]:
        """Фильтровать метрики влажности почвы по query параметрам"""

        return self.__repository_class.filter_soil_moisture_metrics_by_ground_level(metrics)
