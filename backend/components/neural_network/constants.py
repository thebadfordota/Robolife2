import os

from config.settings import BASE_DIR

DATASETS_PATH = os.path.join(BASE_DIR, 'datasets')

PLANTS_PATH = os.path.join(DATASETS_PATH, 'plants')

TENSORS_NAMES = {
    "Corn": (
        'cercospora',
        'common_rust',
        'healthy',
        'northern_leaf_blight'
    ),
    "Sunflower": (
        'Downy_mildew',
        'Gray_mold',
        'Healthy',
        'Leaf_scars'
    ),
    "Soy": (
        'Caterpillar',
        'Diabrotica_speciosa',
        'Healthy'
    ),
    "Wheat": (
        "Healthy",
        "septoria",
        "stripe_rust"
    ),
}
