from dataclasses import dataclass
from typing import Optional

from shared.interfaces import BaseRequestModel, BaseResponseModel


@dataclass
class OpenMeteoMetricResponseModel(BaseResponseModel):
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
    metric_response_name: Optional[str] = None
    response: Optional[dict] = None
