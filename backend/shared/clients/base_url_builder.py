from abc import ABCMeta, abstractmethod
from string import Template as StrTemplate

from shared.interfaces import BaseRequestModel


class BaseUrlBuilder(metaclass=ABCMeta):
    """Базовый класс для формирования url-адресов"""

    __template: StrTemplate

    def __init__(self):
        self._init_url_template()

    @property
    def template(self) -> StrTemplate:
        return self.__template

    @template.setter
    def template(self, new_template: StrTemplate) -> None:
        if not isinstance(new_template, StrTemplate):
            raise ValueError(
                f'Передан некорректный шаблон: {new_template} {type(new_template)} '
                f'Шаблон должен принадлежать типу: {StrTemplate}'
            )
        self.__template = new_template

    @abstractmethod
    def _init_url_template(self) -> None:
        """Инициализировать шаблон url-адреса"""
        ...

    @abstractmethod
    def get_url(self, request_params: BaseRequestModel) -> str:
        ...
