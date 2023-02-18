from __future__ import annotations

from django.db.models import TextChoices


class AgricultureDatasetEnum(TextChoices):
    """Enum датасетов для агрокультур"""

    CORN = 'corn_diseases.pkl'
    SOY = 'soy_diseases.pkl'
    SUNFLOWER = 'sunflower_diseases.pkl'
    WHEAT = 'wheat_diseases.pkl'

    @classmethod
    def get_enum_by_label_name(cls, name: str) -> AgricultureDatasetEnum:
        for agriculture in cls:
            if agriculture.label == name:
                return agriculture
        raise StopIteration()
