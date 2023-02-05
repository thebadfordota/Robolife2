from datetime import timedelta
from typing import Mapping

from django.db.models import Q, QuerySet

from components.metrics.enums import WeatherMetricsEnum
from components.metrics.models import WeatherMetricsModel
from shared.constants import BASE_BEGIN_DATE
from shared.utills import convert_from_date_to_string


class MetricsRepository:
    """Репозиторий для работы с погодными метриками"""

    model_class = WeatherMetricsModel

    def bulk_create_weather_metrics(self, metric_name: str, values: list[float], dates: list[str]) -> None:
        """Множественное создание погодных метрик"""

        list_length = min(len(values), len(dates))
        self.model_class.objects.bulk_create([
            WeatherMetricsModel(
                name=metric_name,
                value=values[idx],
                date=dates[idx]
            )
            for idx in range(list_length)
        ])

    def get_metric_start_update_date(self, name: str) -> str:
        """Получить начальную дату для обновления погодной метрики"""

        last_record = self.model_class.objects.filter(name=name).order_by('-date').first()
        if not last_record:
            return BASE_BEGIN_DATE

        return convert_from_date_to_string(last_record.date + timedelta(hours=1))

    @staticmethod
    def filter_metrics_by_date_range(queryset: WeatherMetricsModel, query_params: dict) -> WeatherMetricsModel:
        """Фильтровать метрики по временному диапазону"""

        return queryset.filter(date__range=(
            query_params.get('startDate'),
            query_params.get('endDate')
        ))

    @staticmethod
    def filter_weather_metrics_by_query_params(queryset: QuerySet,
                                               query_params: dict) -> QuerySet:
        """Фильтровать погодные метрики по query параметрам"""

        if 'maxTemperature' in query_params and 'minTemperature' in query_params:
            queryset = queryset.filter(Q(name='Max Temperature') | Q(name='Min Temperature'))
        elif 'maxTemperature' in query_params:
            queryset = queryset.filter(name='Max Temperature')
        elif 'minTemperature' in query_params:
            queryset = queryset.filter(name='Min Temperature')

        elif 'maxWindSpeed' in query_params and 'dominantWindDirection' in query_params:
            queryset = queryset.filter(Q(name='Max Wind Speed') | Q(name='Dominant Wind Direction'))
        elif 'maxWindSpeed' in query_params:
            queryset = queryset.filter(name='Max Wind Speed')
        elif 'dominantWindDirection' in query_params:
            queryset = queryset.filter(name='Dominant Wind Direction')

        elif 'precipitationSum' in query_params:
            queryset = queryset.filter(name='Precipitation Sum')

        return queryset

    @staticmethod
    def filter_soil_moisture_metrics_by_ground_level(metrics: WeatherMetricsModel) -> Mapping[str, WeatherMetricsModel]:
        """Фильтровать метрики влажности почвы по query параметрам"""

        return {
            'soil_moisture_10cm': metrics.filter(name=WeatherMetricsEnum.SOIL_MOISTURE_10_SM.value),
            'soil_moisture_20cm': metrics.filter(name=WeatherMetricsEnum.SOIL_MOISTURE_20_SM.value),
            'soil_moisture_100cm': metrics.filter(name=WeatherMetricsEnum.SOIL_MOISTURE_100_SM.value)
        }
