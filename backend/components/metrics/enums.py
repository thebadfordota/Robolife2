from typing import Final

from django.db.models import TextChoices


class WeatherMetricsEnum(TextChoices):
    """Enum для всех видов погодных метрик"""

    MAX_TEMPERATURE = 'Max Temperature', 'Максимальная температура'
    MIN_TEMPERATURE = 'Min Temperature', 'Минимальная температура'
    PRECIPITATION_SUM = 'Precipitation Sum', 'Сумма осадков'
    MAX_WIND_SPEED = 'Max Wind Speed', 'Максимальная скорость ветра'
    DOMINANT_WIND_DIRECTION = 'Dominant Wind Direction', 'Господствующее направление ветра'
    SOIL_MOISTURE_10_SM = 'SOIL MOISTURE 10 SM', 'Влажность почвы на глубине 10 см'
    SOIL_MOISTURE_20_SM = 'SOIL MOISTURE 20 SM', 'Влажность почвы на глубине 20 см'
    SOIL_MOISTURE_100_SM = 'SOIL MOISTURE 100 SM', 'Влажность почвы на глубине 100 см'



SOIL_MOISTURE_PREFIX: Final = 'SOIL MOISTURE'
