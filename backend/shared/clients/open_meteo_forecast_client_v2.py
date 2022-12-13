from requests import Session

from config.settings import OPEN_METEO_BASE_URL
from shared.validators import validate_response


class OpenMeteoForecastClientV2:
    """Клиент для обращения к api open-meteo"""
    coordinates_params = 'forecast?latitude=45.26&longitude=39.79'
    # time_format_params = '&timeformat=unixtime&timezone=Europe%2FMoscow'
    time_format_params = '&timezone=Europe%2FMoscow'
    time_interval_params = '&start_date={}&end_date={}'
    # Endpoints
    base_url = OPEN_METEO_BASE_URL
    endpoint_max_temperature = '&daily=temperature_2m_max'
    endpoint_min_temperature = '&daily=temperature_2m_min'
    endpoint_precipitation_sum = '&daily=precipitation_sum'
    endpoint_max_wind_speed = '&daily=windspeed_10m_max'
    endpoint_dominant_wind_direction = '&daily=winddirection_10m_dominant'

    endpoint_soil_moisture_10cm_level = '&hourly=soil_moisture_3_9cm'
    endpoint_soil_moisture_20cm_level = '&hourly=soil_moisture_9_27cm'
    endpoint_soil_moisture_100cm_level = '&hourly=soil_moisture_27_81cm'

    def __init__(self):
        self.session = Session()
        self.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
        }

    def get_max_temperature_by_date_interval(self, start_date: str, end_date: str) -> tuple[list[float], list[str]]:
        """Получить данные о максимальной температуре"""

        url = ''.join((
            self.base_url,
            self.coordinates_params,
            self.endpoint_max_temperature,
            self.time_format_params,
            self.time_interval_params.format(start_date, end_date)
        ))
        return self.get_response(
            url=url,
            error_message='Не удалось получить информацию о максимальной температуре',
            metric_response_name='temperature_2m_max'
        )

    def get_min_temperature_by_date_interval(self, start_date: str, end_date: str) -> tuple[list[float], list[str]]:
        """Получить данные о минимальной температуре"""

        url = ''.join((
            self.base_url,
            self.coordinates_params,
            self.endpoint_min_temperature,
            self.time_format_params,
            self.time_interval_params.format(start_date, end_date)
        ))
        return self.get_response(
            url=url,
            error_message='Не удалось получить информацию о минимальной температуре',
            metric_response_name='temperature_2m_min'
        )

    def get_precipitation_sum_by_date_interval(self, start_date: str, end_date: str) -> tuple[list[float], list[str]]:
        """Получить данные о сумме осадков"""

        url = ''.join((
            self.base_url,
            self.coordinates_params,
            self.endpoint_precipitation_sum,
            self.time_format_params,
            self.time_interval_params.format(start_date, end_date)
        ))
        return self.get_response(
            url=url,
            error_message='Не удалось получить информацию о сумме осадков',
            metric_response_name='precipitation_sum'
        )

    def get_max_wind_speed_by_date_interval(self, start_date: str, end_date: str) -> tuple[list[float], list[str]]:
        """Получить информацию о максимальной скорости ветра"""

        url = ''.join((
            self.base_url,
            self.coordinates_params,
            self.endpoint_max_wind_speed,
            self.time_format_params,
            self.time_interval_params.format(start_date, end_date)
        ))
        return self.get_response(
            url=url,
            error_message='Не удалось получить информацию о максимальной скорости ветра',
            metric_response_name='windspeed_10m_max'
        )

    def get_dominant_wind_direction_by_date_interval(self,
                                                     start_date: str,
                                                     end_date: str) -> tuple[list[float], list[str]]:
        """Получить информацию о господствующем направлении ветра"""

        url = ''.join((
            self.base_url,
            self.coordinates_params,
            self.endpoint_dominant_wind_direction,
            self.time_format_params,
            self.time_interval_params.format(start_date, end_date)
        ))
        return self.get_response(
            url=url,
            error_message='Не удалось получить информацию о господствующем направлении ветра',
            metric_response_name='winddirection_10m_dominant'
        )

    def get_response(self,
                     url: str,
                     error_message: str,
                     metric_response_name: str,
                     response_type: str = 'daily') -> tuple[list[float], list[str]]:
        """Выполнить запрос к api"""

        response = self.session.get(url=url, headers=self.headers).json()
        validate_response(
            error_message=error_message,
            metric_response_name=metric_response_name,
            response=response,
            response_type=response_type
        )
        data = response.get(response_type)
        return data.get(metric_response_name), data.get('time')

    def get_soil_moisture_10cm_level_by_date_interval(self,
                                                      start_date: str,
                                                      end_date: str) -> tuple[list[float], list[str]]:
        url = ''.join((
            self.base_url,
            self.coordinates_params,
            self.endpoint_soil_moisture_10cm_level,
            self.time_format_params,
            self.time_interval_params.format(start_date, end_date)
        ))
        return self.get_response(
            url=url,
            error_message='Не удалось получить информацию о влажности почвы 10 см',
            metric_response_name='soil_moisture_3_9cm',
            response_type='hourly'
        )

    def get_soil_moisture_20cm_level_by_date_interval(self,
                                                      start_date: str,
                                                      end_date: str) -> tuple[list[float], list[str]]:
        url = ''.join((
            self.base_url,
            self.coordinates_params,
            self.endpoint_soil_moisture_20cm_level,
            self.time_format_params,
            self.time_interval_params.format(start_date, end_date)
        ))
        return self.get_response(
            url=url,
            error_message='Не удалось получить информацию о влажности почвы 20 см',
            metric_response_name='soil_moisture_9_27cm',
            response_type='hourly'
        )

    def get_soil_moisture_100cm_level_by_date_interval(self,
                                                      start_date: str,
                                                      end_date: str) -> tuple[list[float], list[str]]:
        url = ''.join((
            self.base_url,
            self.coordinates_params,
            self.endpoint_soil_moisture_100cm_level,
            self.time_format_params,
            self.time_interval_params.format(start_date, end_date)
        ))
        return self.get_response(
            url=url,
            error_message='Не удалось получить информацию о влажности почвы 20 см',
            metric_response_name='soil_moisture_27_81cm',
            response_type='hourly'
        )

