from datetime import timedelta, datetime
from typing import NoReturn

from components.metrics.models import SoilMoistureModel
from shared.constants import BASE_BEGIN_DATE_TIME
from shared.utills import convert_from_datetime_to_string


class SoilMoistureRepository:
    model_class = SoilMoistureModel

    def __init__(self):
        self.base_begin_date = BASE_BEGIN_DATE_TIME

    def get_start_date(self, name: str):
        last_record = self.model_class.objects.filter(name=name).order_by('-date_and_time').first()
        if not last_record:
            return self.base_begin_date

        return convert_from_datetime_to_string(last_record.date_and_time + timedelta(hours=1))

    @staticmethod
    def get_end_date():
        return convert_from_datetime_to_string(datetime.now() + timedelta(days=1))

    def bulk_create_weather_metrics(self, metric_name: str, value: list[float], date_and_time: list[str]) -> NoReturn:
        list_length = min(len(value), len(date_and_time))
        self.model_class.objects.bulk_create([
            self.model_class(
                name=metric_name,
                value=value[idx],
                date_and_time=date_and_time[idx]
            )
            for idx in range(list_length)
        ])
