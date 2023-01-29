from abc import ABC
from typing import Final

from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.viewsets import GenericViewSet


class BaseQueryModelViewSet(GenericViewSet,
                            ListModelMixin,
                            RetrieveModelMixin,
                            ABC):
    """Базовый ModelViewSet для всех запросов, получающих данные"""

    http_method_names: Final[list[str]] = ['get', 'head', 'options']
