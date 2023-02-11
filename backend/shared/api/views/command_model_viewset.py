from abc import ABC
from typing import Final

from rest_framework.mixins import (
    CreateModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
)
from rest_framework.viewsets import GenericViewSet


class CommandModelViewSet(GenericViewSet,
                          CreateModelMixin,
                          UpdateModelMixin,
                          DestroyModelMixin,
                          ABC):
    """Базовый ModelViewSet для всех запросов, изменяющих данные"""

    http_method_names: Final = ['post', 'put', 'patch', 'delete']
