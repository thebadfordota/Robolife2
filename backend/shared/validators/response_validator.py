from typing import NoReturn

from shared.exceptions import NotFoundValueError


def validate_response(
        error_message: str,
        metric_response_name: str,
        response: dict) -> NoReturn:
    """Валидация запроса """

    if not response or not response.get('daily'):
        raise NotFoundValueError(error_message)
        # raise NotFoundValueError('Не удалось получить информацию о максимальной температуре')
    if not response.get('daily').get('time'):
        raise NotFoundValueError('Не удалось получить время')
    if not response.get('daily').get(metric_response_name):
        raise NotFoundValueError(f'Не удалось получить значения параметра: {metric_response_name}')
