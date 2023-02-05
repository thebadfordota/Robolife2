from datetime import datetime, timedelta

from components.metrics.enums import WeatherMetricsEnum
from components.metrics.repository import MetricsRepository
from shared.clients.open_meteo import OpenMeteoClient
from shared.clients.open_meteo.shared.enums import TimeTypeEnum
from shared.clients.open_meteo.shared.interfaces import (
    OpenMeteoRequestModel,
    OpenMeteoMetricResponseModel,
)
from shared.exceptions import NotFoundValueError, CommandError
from shared.utills import (
    convert_from_date_to_string,
    convert_from_string_to_date,
)


class MetricsUpdateService:
    """Сервис для обновления погодных метрик"""

    __client_class = OpenMeteoClient
    __repository_class = MetricsRepository

    def __init__(self):
        self.__client_class = self.__client_class()
        self.__repository_class = self.__repository_class()

    def startup_updating(self) -> None:
        """Запуски обновления погодных метрик"""
        for metric in WeatherMetricsEnum:
            self.update_selected_metric(metric)

    def update_selected_metric(self, metric: WeatherMetricsEnum) -> None:
        """Обновление выбранной погодной метрики"""

        start_date, end_date = self.get_date_interval_by_metric_name(metric.value)
        if start_date == end_date or end_date < start_date:
            return

        try:
            response_model = self._get_new_metrics(metric, start_date, end_date)
        except NotFoundValueError as e:
            print(e)
            raise CommandError(f'Не получилось обновить данные для метрики ({metric.label})')

        self.__repository_class.bulk_create_weather_metrics(
            metric.value,
            response_model.values,
            response_model.dates
        )

    def get_date_interval_by_metric_name(self, metric_name: str) -> tuple[str, str]:
        """Получить интервал времени для обновления метрик погоды"""

        start_datetime = self.__repository_class.get_metric_start_update_date(metric_name)
        end_datetime = convert_from_date_to_string(datetime.now())
        return start_datetime, end_datetime

    def _get_new_metrics(self,
                         metric: WeatherMetricsEnum,
                         start_date: str,
                         end_date: str) -> OpenMeteoMetricResponseModel:
        """Получить новые данные метрики"""

        request_model = OpenMeteoRequestModel(metric.value, start_date, end_date)
        if metric.is_soil_moisture_metric:
            request_model.time_type = TimeTypeEnum.HOURLY

        response_model = self.__client_class.get_new_metrics(request_model)

        if metric.is_soil_moisture_metric:
            response_model = self._convert_from_hourly_to_daily_format(
                response_model,
                metric.value,
                start_date
            )

        return response_model

    @staticmethod
    def _convert_from_hourly_to_daily_format(response_model: OpenMeteoMetricResponseModel,
                                             metric_name: str,
                                             start_date: str) -> OpenMeteoMetricResponseModel:
        """Конвертировать данные из формата по часам в формат по дням"""

        if len(response_model.values) == 0:
            raise NotFoundValueError(f'Был получен пустой набор данных для метрики: {metric_name}')

        count_hours_per_day = 24
        count_new_days = len(response_model.values) // count_hours_per_day
        start_date = convert_from_string_to_date(start_date)
        values, dates = [], []

        for metric_id in range(count_new_days):
            values.append(response_model.values[metric_id * count_hours_per_day])
            dates.append(convert_from_date_to_string(start_date))
            start_date += timedelta(days=1)

        response_model.values, response_model.dates = values, dates
        return response_model
