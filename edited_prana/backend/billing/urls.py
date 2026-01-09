from django.urls import path, include
from rest_framework import routers
from .views import (
    ClientViewSet, InvoiceViewSet, BillingViewSet
)

router = routers.DefaultRouter()
router.register('clients', ClientViewSet, basename='client')
router.register('invoices', InvoiceViewSet, basename='invoice')
router.register('billings', BillingViewSet, basename='billing')

urlpatterns = [
    path('', include(router.urls)),
]
