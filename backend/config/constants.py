# Formats

BASE_DATE_TIME_FORMAT = '%Y-%m-%d %H:%M:%S'
BASE_DATE_FORMAT = '%Y-%m-%d'
# BASE_OPEN_METEO_DATE_TIME_FORMAT = '%Y-%m-%d'

# Dates
BASE_BEGIN_DATE = '2022-09-01'
BASE_BEGIN_DATE_TIME = '2022-09-01 01:00:00'

# WEATHER_METRIC_API_URLS = {
#     WeatherMetricsEnum.MAX_TEMPERATURE.value: '&daily=temperature_2m_max',
#     WeatherMetricsEnum.MIN_TEMPERATURE.value: '&daily=temperature_2m_min',
#     WeatherMetricsEnum.PRECIPITATION_SUM.value: '&daily=precipitation_sum',
#     WeatherMetricsEnum.MAX_WIND_SPEED.value: '&daily=windspeed_10m_max',
#     WeatherMetricsEnum.DOMINANT_WIND_DIRECTION.value: '&daily=winddirection_10m_dominant',
# }

# Todo: Заменить на Enum
WEATHER_METRIC_NAME_CHOICES = [
    ('Max Temperature', 'Максимальная температура'),
    ('Min Temperature', 'Минимальная температура'),
    ('Precipitation Sum', 'Сумма осадков'),
    ('Max Wind Speed', 'Максимальная скорость ветра'),
    ('Dominant Wind Direction', 'Господствующее направление ветра'),
]

SOIL_MOISTURE_GROUND_LEVEL_CHOICES = [
    ('10 cm', '10 сантиметров'),
    ('20 cm', '20 сантиметров'),
    ('100 cm', '100 сантиметров'),
]
