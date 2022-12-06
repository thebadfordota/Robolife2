from django.contrib import admin

from components.metrics.models import (
    WindSpeedModel,
    WeatherMetricsModel,
)

admin.site.register(WindSpeedModel)
admin.site.register(WeatherMetricsModel)
