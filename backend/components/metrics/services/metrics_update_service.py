from shared.clients import OpenMeteoForecastClientV3


class MetricsUpdateService:
    """Сервис для обновления погодных метрик"""

    __client_class = OpenMeteoForecastClientV3

    def __init__(self):
        self.__client_class = self.__client_class()
