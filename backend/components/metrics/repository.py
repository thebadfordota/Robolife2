from typing import NoReturn

from components.metrics.models import WindSpeedModel, WeatherMetricsModel
from config.constants import WEATHER_METRIC_NAME_CHOICES


class MetricsRepository:

    @staticmethod
    def bulk_create_weather_metrics(metric_type: int, value: list[float], date_and_time: list[str]) -> NoReturn:
        list_length = min(len(value), len(date_and_time))
        # WindSpeedModel.objects.bulk_create([
        #     WindSpeedModel(value=value[idx], date_time=date_time[idx])
        #     for idx in range(list_length)
        # ])
        WeatherMetricsModel.objects.bulk_create([
            WeatherMetricsModel(
                name=WEATHER_METRIC_NAME_CHOICES[metric_type],
                value=value[idx],
                date_and_time=date_and_time[idx]
            )
            for idx in range(list_length)
        ])

