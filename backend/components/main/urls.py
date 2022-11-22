from rest_framework.routers import DefaultRouter

from components.main.views.product_viewset import ProductViewSet

app_name = 'main'

router = DefaultRouter()
router.register(r'product', ProductViewSet, basename='product')

urlpatterns = router.urls
