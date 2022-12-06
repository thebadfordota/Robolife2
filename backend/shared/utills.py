from datetime import datetime

from config.constants import BASE_DATE_TIME_FORMAT


def convert_to_base_date_time_format(time: int) -> str:
    return datetime.utcfromtimestamp(time).strftime(BASE_DATE_TIME_FORMAT)
