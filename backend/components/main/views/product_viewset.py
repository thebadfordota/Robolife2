from rest_framework.viewsets import ModelViewSet

from components.main.models import ProductModel
from components.main.serializers.product_serializer import ProductSerializer


class ProductViewSet(ModelViewSet):
    """"""

    queryset = ProductModel.objects.all()
    serializer_class = ProductSerializer
    pagination_class = None
