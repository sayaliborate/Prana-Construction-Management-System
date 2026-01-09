from django.urls import path, include
from rest_framework import routers
from .views import (
    SupplierViewSet, MaterialViewSet, PurchaseOrderViewSet, 
    StockTransactionViewSet
)

router = routers.DefaultRouter()
router.register('suppliers', SupplierViewSet, basename='supplier')
router.register('materials', MaterialViewSet, basename='material')
router.register('purchase-orders', PurchaseOrderViewSet, basename='purchase-order')
router.register('stock-transactions', StockTransactionViewSet, basename='stock-transaction')

urlpatterns = [
    path('', include(router.urls)),
]
