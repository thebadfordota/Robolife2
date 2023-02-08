from components.metrics.enums import WeatherMetricsEnum

OPEN_METEO_BASE_URL = 'https://api.open-meteo.com/v1/'

WEATHER_METRIC_API_RESPONSE_NAME = {
    WeatherMetricsEnum.MAX_TEMPERATURE.value: 'temperature_2m_max',
    WeatherMetricsEnum.MIN_TEMPERATURE.value: 'temperature_2m_min',
    WeatherMetricsEnum.PRECIPITATION_SUM.value: 'precipitation_sum',
    WeatherMetricsEnum.MAX_WIND_SPEED.value: 'windspeed_10m_max',
    WeatherMetricsEnum.DOMINANT_WIND_DIRECTION.value: 'winddirection_10m_dominant',
    WeatherMetricsEnum.SOIL_MOISTURE_10_SM.value: 'soil_moisture_3_9cm',
    WeatherMetricsEnum.SOIL_MOISTURE_20_SM.value: 'soil_moisture_9_27cm',
    WeatherMetricsEnum.SOIL_MOISTURE_100_SM.value: 'soil_moisture_27_81cm',
}

METRIC_TIME_KEY_NAME = 'time'
