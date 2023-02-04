from django.db.models import QuerySet


class MetricsDateRangeFilterMixin:
    """Mixin для фильтрации погодных метрик по временному промежутку"""

    @classmethod
    def filter_metrics_by_date_range(cls, queryset: QuerySet, query_params: dict) -> QuerySet:
        """Фильтровать метрики по диапазону даты"""

        if cls.__does_query_params_have_date_keywords(query_params):
            queryset = queryset.filter(date__range=(
                query_params.get('startDate'),
                query_params.get('endDate')
            ))
        return queryset

    @classmethod
    def filter_metrics_by_date_and_time_range(cls, queryset: QuerySet, query_params: dict) -> QuerySet:
        """Фильтровать метрики по диапазону даты и времени"""

        if cls.__does_query_params_have_date_keywords(query_params):
            queryset = queryset.filter(date_and_time__range=(
                query_params.get('startDate'),
                query_params.get('endDate')
            ))
        return queryset

    @staticmethod
    def __does_query_params_have_date_keywords(query_params: dict) -> bool:
        """Имеют ли параметры запроса ключевые слова для фильтрации по дате и времени"""

        return 'startDate' in query_params and 'endDate' in query_params
