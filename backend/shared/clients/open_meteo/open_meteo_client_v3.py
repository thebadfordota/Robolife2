from shared.clients.base_api_client import BaseApiClient
from shared.clients.open_meteo.constans import WEATHER_METRIC_API_RESPONSE_NAME

from shared.clients.open_meteo.open_meteo_url_builder import OpenMeteoUrlBuilder
from shared.interfaces import OpenMeteoMetricResponseModel, OpenMeteoRequestModel


class OpenMeteoClientV3(BaseApiClient):
    """Клиент для обращения к api open-meteo"""

    url_builder = OpenMeteoUrlBuilder

    def __init__(self, latitude: float = 45.26, longitude: float = 39.79):

        self.url_builder = self.url_builder(latitude, longitude)

    def get_metric_by_date_interval(self, request_model: OpenMeteoRequestModel):
        """Получить данные для метрики по временному интервалу"""

        request_model.url = self.url_builder.get_url(request_model)
        return self._send_request(request_model)

    def _send_request(self, request_model: OpenMeteoRequestModel) -> OpenMeteoMetricResponseModel:
        """Отправить запрос"""

        request_model.response = self.session.get(url=request_model.url, headers=self.headers).json()
        self._validate_response(request_model)

        response_data = request_model.response.get('daily')
        metric_response_name = WEATHER_METRIC_API_RESPONSE_NAME[request_model.metric_name]
        metric_response_model = OpenMeteoMetricResponseModel(
            values=response_data.get(metric_response_name),
            dates=response_data.get('time')
        )
        return metric_response_model

    def _validate_response(self, request_model: OpenMeteoRequestModel) -> None:
        ...

