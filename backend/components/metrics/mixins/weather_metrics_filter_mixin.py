from django.db.models import QuerySet, Q


# Todo: Перенести логику в отдельный сервис и репозиторий
class WeatherMetricsFilterMixin:
    """Mixin для фильтрации погодных метрик"""

    @staticmethod
    def filter_weather_metrics_by_query_params(queryset: QuerySet, query_params: dict) -> QuerySet:
        """Фильтровать погодные метрики по Http Query параметрам"""

        if 'maxTemperature' in query_params and 'minTemperature' in query_params:
            queryset = queryset.filter(Q(name='Max Temperature') | Q(name='Min Temperature'))
        elif 'maxTemperature' in query_params:
            queryset = queryset.filter(name='Max Temperature')
        elif 'minTemperature' in query_params:
            queryset = queryset.filter(name='Min Temperature')

        elif 'maxWindSpeed' in query_params and 'dominantWindDirection' in query_params:
            queryset = queryset.filter(Q(name='Max Wind Speed') | Q(name='Dominant Wind Direction'))
        elif 'maxWindSpeed' in query_params:
            queryset = queryset.filter(name='Max Wind Speed')
        elif 'dominantWindDirection' in query_params:
            queryset = queryset.filter(name='Dominant Wind Direction')

        elif 'precipitationSum' in query_params:
            queryset = queryset.filter(name='Precipitation Sum')

        return queryset
