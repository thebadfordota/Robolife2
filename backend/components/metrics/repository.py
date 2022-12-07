from datetime import datetime, timedelta
from typing import NoReturn

from components.metrics.models import WeatherMetricsModel
from config.constants import (
    WEATHER_METRIC_NAME_CHOICES,
    BASE_BEGIN_DATE,
)
from shared.utills import convert_from_datetime_to_string


class MetricsRepository:
    model_class = WeatherMetricsModel

    def __init__(self):
        self.base_begin_date = BASE_BEGIN_DATE

    def bulk_create_weather_metrics(self, metric_type: int, value: list[float], date_and_time: list[str]) -> NoReturn:
        list_length = min(len(value), len(date_and_time))
        self.model_class.objects.bulk_create([
            WeatherMetricsModel(
                name=WEATHER_METRIC_NAME_CHOICES[metric_type],
                value=value[idx],
                date_and_time=date_and_time[idx]
            )
            for idx in range(list_length)
        ])

    def get_metric_last_date(self, name: str) -> str:
        last_record = self.model_class.objects.filter(name=name).order_by('-date_and_time').first()
        if not last_record:
            return self.base_begin_date

        return convert_from_datetime_to_string(last_record.date_and_time + timedelta(hours=1))

    @staticmethod
    def get_newest_datetime() -> str:
        return convert_from_datetime_to_string(datetime.now())
