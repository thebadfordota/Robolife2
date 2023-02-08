from abc import ABC
from dataclasses import dataclass


@dataclass
class BaseRequestModel(ABC):
    ...


@dataclass
class BaseResponseModel(ABC):
    ...


