from dataclasses import dataclass
from typing import Optional

from shared.clients.open_meteo.shared.enums import TimeTypeEnum
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
    time_type: TimeTypeEnum = TimeTypeEnum.DAILY
    url: Optional[str] = None
    metric_response_name: Optional[str] = None
    response: Optional[dict] = None
