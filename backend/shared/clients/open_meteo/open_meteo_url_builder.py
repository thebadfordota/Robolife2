from string import Template as StrTemplate

from shared.clients.base_url_builder import BaseUrlBuilder
from shared.clients.open_meteo.shared.constans import (
    WEATHER_METRIC_API_RESPONSE_NAME, OPEN_METEO_BASE_URL,
)
from shared.clients.open_meteo.shared.interfaces import OpenMeteoRequestModel


class OpenMeteoUrlBuilder(BaseUrlBuilder):
    """Класс, формирующий url-адреса для api open-meteo"""

    def __init__(self, latitude: float, longitude: float):
        super().__init__()
        self.base_url = OPEN_METEO_BASE_URL
        self.coordinates_params = self._get_coordinates_params(latitude, longitude)
        self.time_format_params = '&timezone=Europe%2FMoscow'

    def _init_url_template(self) -> None:
        """Инициализировать шаблон url-адреса"""

        url = '$base_url$coordinates&$time_type=$metric_name$time_format$time_interval'
        self.template = StrTemplate(url)

    def get_url(self, request_params: OpenMeteoRequestModel) -> str:
        """Получить url для запроса"""

        metric_name = WEATHER_METRIC_API_RESPONSE_NAME[request_params.metric_name]
        time_interval = self._get_time_interval(
            request_params.start_date,
            request_params.end_date
        )
        url = self.template.substitute(
            base_url=self.base_url,
            coordinates=self.coordinates_params,
            time_type=request_params.time_type.value,
            metric_name=metric_name,
            time_format=self.time_format_params,
            time_interval=time_interval
        )
        return url

    @staticmethod
    def _get_coordinates_params(latitude: float, longitude: float) -> str:
        """Получить параметры для координат"""

        return f'forecast?latitude={latitude}&longitude={longitude}'

    @staticmethod
    def _get_time_interval(start_date: str, end_date: str) -> str:
        """Получить time-interval для query параметров"""

        return f'&start_date={start_date}&end_date={end_date}'
