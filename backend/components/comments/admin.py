from django.contrib import admin

from components.comments.models import UserCommentsModel


@admin.register(UserCommentsModel)
class WeatherMetricsModelAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user',
        'weather_metric',
        'created'
    )
    list_display_links = ('id', 'weather_metric')
    search_fields = (
        'user',
        'weather_metric'
    )
    list_filter = ('created',)