from django.contrib import admin

from components.notifications.models import UserNotificationsModel


@admin.register(UserNotificationsModel)
class UserNotificationsModelAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'comment',
        'user',
        'created'
    )
    list_display_links = ('id', 'comment')
    search_fields = (
        'comment',
        'user'
    )
    list_filter = ['created']
