from datetime import datetime

from config.constants import (
    BASE_DATE_TIME_FORMAT,
    BASE_OPEN_METEO_DATE_TIME_FORMAT,
    BASE_DATE_FORMAT,
)


def convert_to_base_date_time_format(date_time: int) -> str:
    return datetime.utcfromtimestamp(date_time).strftime(BASE_DATE_TIME_FORMAT)


def convert_to_base_date_format(date_time: int) -> str:
    return datetime.utcfromtimestamp(date_time).strftime(BASE_DATE_FORMAT)


def convert_from_string_to_datetime(date_time: str) -> datetime:
    return datetime.strptime(date_time, BASE_DATE_TIME_FORMAT)


def convert_from_datetime_to_string(date_and_time: datetime) -> str:
    return date_and_time.strftime(BASE_DATE_TIME_FORMAT)


def convert_from_string_to_date(date_time: str) -> datetime:
    return datetime.strptime(date_time, BASE_DATE_FORMAT)


# def convert_from_datetime_to_string(date_time: datetime) -> str:
#     return date_time.strftime(BASE_OPEN_METEO_DATE_TIME_FORMAT)


def convert_from_date_to_string(date_time: datetime) -> str:
    return date_time.strftime(BASE_DATE_FORMAT)

# def convert_from_string_to_date(date_time: datetime) -> str:
#     return date_time.strftime(BASE_DATE_FORMAT)
