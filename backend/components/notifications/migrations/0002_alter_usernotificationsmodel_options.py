# Generated by Django 4.1.3 on 2023-02-08 17:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='usernotificationsmodel',
            options={'ordering': ['-created'], 'verbose_name': 'Уведомление', 'verbose_name_plural': 'Уведомления'},
        ),
    ]