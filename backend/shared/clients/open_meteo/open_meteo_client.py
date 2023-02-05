from shared.clients.base_api_client import BaseApiClient
from shared.clients.open_meteo.open_meteo_url_builder import OpenMeteoUrlBuilder
from shared.clients.open_meteo.shared.constans import (
    WEATHER_METRIC_API_RESPONSE_NAME,
    METRIC_TIME_KEY_NAME,
)
from shared.clients.open_meteo.shared.interfaces import (
    OpenMeteoRequestModel,
    OpenMeteoMetricResponseModel,
)
from shared.exceptions import NotFoundValueError


class OpenMeteoClient(BaseApiClient):
    """Клиент для обращения к api open-meteo"""

    url_builder = OpenMeteoUrlBuilder

    def __init__(self, latitude: float = 45.26, longitude: float = 39.79):
        self.url_builder = self.url_builder(latitude, longitude)

    def get_new_metrics(self, request_model: OpenMeteoRequestModel) -> OpenMeteoMetricResponseModel:
        """Получить новые данные для метрики"""
        request_model.url = self.url_builder.get_url(request_model)
        return self._send_request(request_model)

    def _send_request(self, request_model: OpenMeteoRequestModel) -> OpenMeteoMetricResponseModel:
        """Отправить запрос"""

        request_model.response = self.session.get(url=request_model.url, headers=self.headers).json()
        request_model.metric_response_name = WEATHER_METRIC_API_RESPONSE_NAME[request_model.metric_name]
        self._validate_response(request_model)

        response_data = request_model.response.get(request_model.time_type.value)
        metric_response_name = request_model.metric_response_name
        metric_response_model = OpenMeteoMetricResponseModel(
            values=response_data.get(metric_response_name),
            dates=response_data.get(METRIC_TIME_KEY_NAME)
        )
        return metric_response_model

    def _validate_response(self, request_model: OpenMeteoRequestModel) -> None:
        """Валидировать ответ"""

        if not request_model.response or not request_model.response.get(request_model.time_type.value):
            raise NotFoundValueError(f'Не получилось получать данные о метрике: {request_model.metric_name}')

        response_data = request_model.response.get(request_model.time_type.value)

        if not response_data.get(METRIC_TIME_KEY_NAME):
            raise NotFoundValueError(f'Не удалось получить время для метрики: {request_model.metric_name}')

        if not response_data.get(request_model.metric_response_name):
            raise NotFoundValueError(f'Не удалось получить значения метрики: {request_model.metric_name}')
