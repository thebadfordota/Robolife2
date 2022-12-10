from django.contrib import admin

from .models import UserCommentsModel

admin.site.site_title = 'Админ-панель Robolife2'
admin.site.site_header = 'Админ-панель Robolife2'


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
