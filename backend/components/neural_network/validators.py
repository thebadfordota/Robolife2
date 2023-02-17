from typing import NoReturn, Optional

from django.core.files.uploadedfile import InMemoryUploadedFile

from components.neural_network.enums import AgricultureDatasetEnum
from shared.exceptions import IncorrectParametersError


def validate_plant_diseases(agriculture_name: str, file: InMemoryUploadedFile) -> Optional[NoReturn]:
    """"""

    if agriculture_name not in AgricultureDatasetEnum.labels:
        raise IncorrectParametersError('Не передано название агрокультуры')

    if not file:
        raise IncorrectParametersError('Не передан файл')
