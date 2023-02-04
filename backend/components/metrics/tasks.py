import json
from datetime import datetime

from celery import shared_task

from components.metrics.services import MetricsUpdateService
from shared.exceptions import CommandError


@shared_task
def update_metrics_data():
    """Задача celery для обновления погодных метрик"""

    try:
        MetricsUpdateService().startup_updating()
    except CommandError as error:
        return json.dumps(str(error))

    return json.dumps(f'The weather metrics update was completed successfully in {datetime.now()}')
