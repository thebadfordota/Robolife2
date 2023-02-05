from abc import ABCMeta, abstractmethod

from requests import Session

from shared.interfaces import BaseResponseModel, BaseRequestModel


class BaseApiClient(metaclass=ABCMeta):
    """Базовый класс для api-клиентов"""
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
    }
    session = Session()

    @abstractmethod
    def _send_request(self, request_model: BaseRequestModel) -> BaseResponseModel:
        """Отправить запрос"""
        ...

    @abstractmethod
    def _validate_response(self, request_model: BaseRequestModel) -> None:
        """Валидировать ответ"""
        ...
