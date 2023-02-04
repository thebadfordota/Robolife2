from datetime import datetime, timedelta

from components.metrics.models import WeatherMetricsModel
from config.constants import BASE_BEGIN_DATE
from shared.utills import convert_from_date_to_string


class MetricsRepository:
    """Репозиторий для работы с погодными метриками"""

    model_class = WeatherMetricsModel

    def __init__(self):
        self.base_begin_date = BASE_BEGIN_DATE

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
            return self.base_begin_date

        return convert_from_date_to_string(last_record.date + timedelta(hours=1))

    @staticmethod
    def get_newest_datetime() -> str:
        return convert_from_date_to_string(datetime.now())
