from django.db.models import TextChoices


class AgricultureDatasetEnum(TextChoices):
    CORN = 'corn_diseases.pkl'
    SOY = 'soy_diseases.pkl'
    SUNFLOWER = 'sunflower_diseases.pkl'
    WHEAT = 'wheat_diseases.pkl'

