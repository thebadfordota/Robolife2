from rest_framework.routers import DefaultRouter

# from components.my_comp.views.my_comp_viewset import MyCompViewSet

app_name = 'accounts'


router = DefaultRouter()
# router.register(r'product', MyCompViewSet, basename='product')

urlpatterns = router.urls

