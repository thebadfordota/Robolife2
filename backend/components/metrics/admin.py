from django.contrib import admin

from components.metrics.models import WeatherMetricsModel


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
