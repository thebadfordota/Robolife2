# Formats
BASE_DATE_TIME_FORMAT = '%Y-%m-%d %H:%M:%S'
BASE_DATE_FORMAT = '%Y-%m-%d'
BASE_OPEN_METEO_DATE_TIME_FORMAT = '%Y-%m-%d'

# Dates
BASE_BEGIN_DATE = '2022-09-01'
BASE_BEGIN_DATE_TIME = '2022-09-01 01:00:00'

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
