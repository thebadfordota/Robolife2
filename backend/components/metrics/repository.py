from components.metrics.models import WindSpeedModel


class MetricsRepository:

    @staticmethod
    def bulk_create_wind_speed_objects(value: list[float], date_time: list[str]):
        list_length = min(len(value), len(date_time))
        WindSpeedModel.objects.bulk_create([
            WindSpeedModel(value=value[idx], date_time=date_time[idx])
            for idx in range(list_length)
        ])
