from django.contrib import admin

from components.metrics.models import (
    WeatherMetricsModel,
    SoilMoistureModel,
)


@admin.register(WeatherMetricsModel)
class WeatherMetricsModelAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'value',
        'date'
    )
    list_display_links = ('name',)
    search_fields = (
        'name',
        'value'
    )
    list_filter = ('date',)


@admin.register(SoilMoistureModel)
class SoilMoistureModelAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'value',
        'date_and_time'
    )
    list_display_links = ('name',)
    search_fields = (
        'name',
        'value'
    )
    list_filter = ('date_and_time',)
