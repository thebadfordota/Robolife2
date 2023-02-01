from abc import ABC
from dataclasses import dataclass
from typing import Optional


@dataclass
class BaseRequestModel(ABC):
    ...


@dataclass
class BaseResponseModel(ABC):
    ...


@dataclass
class OpenMeteoMetricResponseModel:
    """Модель ответа на запрос для api open-meteo"""

    values: list[float]
    dates: list[str]


@dataclass
class OpenMeteoRequestModel(BaseRequestModel):
    """Модель запроса для api open-meteo"""

    metric_name: str
    start_date: str
    end_date: str
    url: Optional[str] = None
    response: Optional[dict] = None
