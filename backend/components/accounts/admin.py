from django.contrib import admin

from .models import UserModel


@admin.register(UserModel)
class UserModelAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'username',
        'email',
        'first_name',
        'last_name',
        'is_staff',
        'date_joined',
    )
    list_display_links = ('id', 'username')
    search_fields = (
        'username',
        'email'
        'first_name'
        'last_name'
    )
    list_filter = ('date_joined',)
