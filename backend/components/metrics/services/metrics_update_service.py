from components.metrics.enums import WeatherMetricsEnum
from components.metrics.repository import MetricsRepository
from shared.clients.open_meteo import OpenMeteoClientV3
from shared.exceptions import NotFoundValueError, CommandError


class MetricsUpdateService:
    """Сервис для обновления погодных метрик"""

    __client_class = OpenMeteoClientV3
    __repository_class = MetricsRepository

    def __init__(self):
        self.__client_class = self.__client_class()
        self.__repository_class = self.__repository_class()

    def startup_updating(self) -> None:
        """Запуски обновления погодных метрик"""
        for metric in WeatherMetricsEnum:
            self._update_selected_metric(metric.value, metric.label)

    def _update_selected_metric(self, metric_name: str, metric_label: str) -> None:
        """Обновление выбранной погодной метрики"""
        start_date, end_date = self.get_date_interval_by_metric_name(metric_name)
        if start_date == end_date or end_date < start_date:
            return

        try:
            value, date = self.__client_class.get_metric_by_date_interval(metric_name, start_date, end_date)
        except NotFoundValueError as e:
            print(e)
            raise CommandError(f'Не получилось обновить данные для метрики ({metric_label})')

        self.__repository_class.bulk_create_weather_metrics(metric_name, value, date)

    def get_date_interval_by_metric_name(self, metric_name: str) -> tuple[str, str]:
        """Получить интервал времени для обновления метрик погоды"""

        start_datetime = self.__repository_class.get_metric_start_update_date(metric_name)
        end_datetime = self.__repository_class.get_newest_datetime()
        return start_datetime, end_datetime
