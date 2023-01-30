from requests import Session

from config.settings import OPEN_METEO_BASE_URL


class OpenMeteoForecastClientV3:
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
