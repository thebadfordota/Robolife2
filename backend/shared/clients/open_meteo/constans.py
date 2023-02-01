from components.metrics.enums import WeatherMetricsEnum

# WEATHER_METRIC_API_URLS = {
#     WeatherMetricsEnum.MAX_TEMPERATURE.value: '&daily=temperature_2m_max',
#     WeatherMetricsEnum.MIN_TEMPERATURE.value: '&daily=temperature_2m_min',
#     WeatherMetricsEnum.PRECIPITATION_SUM.value: '&daily=precipitation_sum',
#     WeatherMetricsEnum.MAX_WIND_SPEED.value: '&daily=windspeed_10m_max',
#     WeatherMetricsEnum.DOMINANT_WIND_DIRECTION.value: '&daily=winddirection_10m_dominant',
# }

WEATHER_METRIC_API_RESPONSE_NAME = {
    WeatherMetricsEnum.MAX_TEMPERATURE.value: 'temperature_2m_max',
    WeatherMetricsEnum.MIN_TEMPERATURE.value: 'temperature_2m_min',
    WeatherMetricsEnum.PRECIPITATION_SUM.value: 'precipitation_sum',
    WeatherMetricsEnum.MAX_WIND_SPEED.value: 'windspeed_10m_max',
    WeatherMetricsEnum.DOMINANT_WIND_DIRECTION.value: 'winddirection_10m_dominant',
}
