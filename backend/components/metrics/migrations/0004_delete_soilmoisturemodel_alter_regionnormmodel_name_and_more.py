# Generated by Django 4.1.3 on 2023-02-05 08:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('metrics', '0003_soilmoisturemodel'),
    ]

    operations = [
        migrations.DeleteModel(
            name='SoilMoistureModel',
        ),
        migrations.AlterField(
            model_name='regionnormmodel',
            name='name',
            field=models.CharField(choices=[('Max Temperature', 'Максимальная температура'), ('Min Temperature', 'Минимальная температура'), ('Precipitation Sum', 'Сумма осадков'), ('Max Wind Speed', 'Максимальная скорость ветра'), ('Dominant Wind Direction', 'Господствующее направление ветра'), ('SOIL MOISTURE 10 SM', 'Влажность почвы на глубине 10 см'), ('SOIL MOISTURE 20 SM', 'Влажность почвы на глубине 20 см'), ('SOIL MOISTURE 100 SM', 'Влажность почвы на глубине 100 см')], max_length=25, verbose_name='Название метрики'),
        ),
        migrations.AlterField(
            model_name='weathermetricsmodel',
            name='name',
            field=models.CharField(choices=[('Max Temperature', 'Максимальная температура'), ('Min Temperature', 'Минимальная температура'), ('Precipitation Sum', 'Сумма осадков'), ('Max Wind Speed', 'Максимальная скорость ветра'), ('Dominant Wind Direction', 'Господствующее направление ветра'), ('SOIL MOISTURE 10 SM', 'Влажность почвы на глубине 10 см'), ('SOIL MOISTURE 20 SM', 'Влажность почвы на глубине 20 см'), ('SOIL MOISTURE 100 SM', 'Влажность почвы на глубине 100 см')], max_length=25, verbose_name='Название метрики'),
        ),
    ]
