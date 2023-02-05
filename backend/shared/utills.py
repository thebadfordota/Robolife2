from datetime import datetime

from shared.constants import BASE_DATE_FORMAT


def convert_from_string_to_date(date_time: str) -> datetime:
    return datetime.strptime(date_time, BASE_DATE_FORMAT)


def convert_from_date_to_string(date_time: datetime) -> str:
    return date_time.strftime(BASE_DATE_FORMAT)
