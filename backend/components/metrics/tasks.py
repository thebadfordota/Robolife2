import json
from datetime import datetime

from celery import shared_task

from components.metrics.services import MetricsService, SoilMoistureService
from shared.exceptions import CommandError


@shared_task
def update_metrics_data():
    """Задача celery для обновления погодных метрик"""
    print('task work!')
    try:
        MetricsService().update_metrics()
        SoilMoistureService().update_metrics()
    except CommandError as error:
        return json.dumps(str(error))

    return json.dumps(f'The weather metrics update was completed successfully in {datetime.now()}')
