from abc import ABC
from dataclasses import dataclass
from typing import Optional


@dataclass
class BaseRequestModel(ABC):
    ...


@dataclass
class BaseResponseModel(ABC):
    ...


