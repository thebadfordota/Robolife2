import os

from config.settings import BASE_DIR

DATASETS_PATH = os.path.join(BASE_DIR, 'datasets')

PLANTS_PATH = os.path.join(DATASETS_PATH, 'plants')

tensors_name = {
    "corn": (
        'cercospora',
        'common_rust',
        'healthy',
        'northern_leaf_blight'
    ),
    "sunflower": (
        'Downy_mildew',
        'Gray_mold',
        'Healthy',
        'Leaf_scars'
    ),
    "soy": (
        'Caterpillar',
        'Diabrotica_speciosa',
        'Healthy'
    ),
    "wheat": (
        "Healthy",
        "septoria",
        "stripe_rust"
    ),
}
