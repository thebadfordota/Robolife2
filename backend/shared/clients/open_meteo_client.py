from datetime import datetime

from requests import Session

from config.constants import BASE_DATE_TIME_FORMAT
from config.settings import (
    OPEN_METEO_BASE_URL,
)
from shared.exceptions import NotFoundValueError
from shared.utills import convert_to_base_date_time_format


class OpenMeteoClient:
    """Клиент для обращения к api open-meteo"""
    coordinates_params = 'forecast?latitude=45.26&longitude=39.79'
    time_settings_params = '&timeformat=unixtime&timezone=Europe%2FMoscow'
    time_interval_params = '&start_date={}&end_date={}'
    # Endpoints
    base_url = OPEN_METEO_BASE_URL
    endpoint_temperature = '&hourly=temperature_2m'
    endpoint_wind_speed = '&hourly=windspeed_10m'
    endpoint_wind_direction = '&hourly=winddirection_10m'

    def __init__(self):
        self.session = Session()
        self.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
        }

    def get_temperature_metrics_by_time_interval(self, start_date: str, end_date: str) -> tuple[list[float], list[str]]:
        url = ''.join((
            self.base_url,
            self.coordinates_params,
            self.endpoint_temperature,
            self.time_settings_params + self.time_interval_params.format(start_date, end_date)
        ))
        response = self.session.get(url=url, headers=self.headers).json()
        if not response or not response.get('hourly'):
            raise NotFoundValueError('Не удалось получить информацию о температуре')

        temperatures = response.get('hourly')
        if not temperatures.get('time'):
            raise NotFoundValueError('Не удалось получить время')
        if not temperatures.get('temperature_2m'):
            raise NotFoundValueError('Не удалось получить значения параметра')

        date_time = [ convert_to_base_date_time_format(time) for time in temperatures.get('time')]
        return temperatures.get('temperature_2m'), date_time

    def get_precipitation_metrics_by_time_interval(self, start_date: str, end_date: str) -> tuple[list[float], list[str]]:
        url = ''.join((
            self.base_url,
            self.coordinates_params,
            self.endpoint_temperature,
            self.time_settings_params + self.time_interval_params.format(start_date, end_date)
        ))
        response = self.session.get(url=url, headers=self.headers).json()


    def get_wind_speed_metrics_by_time_interval(self, start_date: str, end_date: str) -> tuple[list[float], list[str]]:
        url = ''.join((
            self.base_url,
            self.coordinates_params,
            self.endpoint_wind_speed,
            self.time_settings_params + self.time_interval_params.format(start_date, end_date)
        ))
        response = self.session.get(url=url, headers=self.headers).json()
        if not response or not response.get('hourly'):
            raise NotFoundValueError('Не удалось получить информацию о скорости ветра')

        wind_speeds = response.get('hourly')
        if not wind_speeds.get('time'):
            raise NotFoundValueError('Не удалось получить время')
        if not wind_speeds.get('windspeed_10m'):
            raise NotFoundValueError('Не удалось получить значения параметра')

        #  datetime.utcfromtimestamp(wind_speed_metrics['hourly']['time'][0]).strftime('%Y-%m-%d %H:%M:%S')
        date_time = [ convert_to_base_date_time_format(time) for time in wind_speeds.get('time')]
        return wind_speeds.get('windspeed_10m'), date_time

    def get_wind_direction_metrics_by_time_interval(self, start_date: str, end_date: str) -> tuple[list[int], list[str]]:
        url = ''.join((
            self.base_url,
            self.coordinates_params,
            self.endpoint_wind_direction,
            self.time_settings_params + self.time_interval_params.format(start_date, end_date)
        ))
        response = self.session.get(url=url, headers=self.headers).json()
        if not response or not response.get('hourly'):
            raise NotFoundValueError('Не удалось получить информацию о направлении ветра')

        wind_directions = response.get('hourly')
        if not wind_directions.get('time'):
            raise NotFoundValueError('Не удалось получить время')
        if not wind_directions.get('winddirection_10m'):
            raise NotFoundValueError('Не удалось получить значения параметра')

        date_time = [convert_to_base_date_time_format(time) for time in wind_directions.get('time')]
        return wind_directions.get('winddirection_10m"'), date_time
