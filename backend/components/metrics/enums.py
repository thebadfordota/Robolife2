from django.db.models import TextChoices


class WeatherMetricsEnum(TextChoices):
    """Enum для всех видов погодных метрик"""

    MAX_TEMPERATURE = 'Max Temperature', 'Максимальная температура'
    MIN_TEMPERATURE = 'Min Temperature', 'Минимальная температура'
    PRECIPITATION_SUM = 'Precipitation Sum', 'Сумма осадков'
    MAX_WIND_SPEED = 'Max Wind Speed', 'Максимальная скорость ветра'
    DOMINANT_WIND_DIRECTION = 'Dominant Wind Direction', 'Господствующее направление ветра'


