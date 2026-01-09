from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Material, Supplier, PurchaseOrder, PurchaseOrderItem, StockTransaction
from .serializers import (
    MaterialSerializer, SupplierSerializer, PurchaseOrderSerializer, 
    PurchaseOrderItemSerializer, StockTransactionSerializer, 
    StockSummarySerializer
)
from users.views import IsAdmin, IsSupervisor, IsClient

class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [IsAdmin | IsSupervisor]
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        if self.action == 'list':
            return SupplierSerializer
        return SupplierSerializer

class MaterialViewSet(viewsets.ModelViewSet):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [IsAdmin | IsSupervisor]
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        if self.action == 'list':
            return MaterialSerializer
        return MaterialSerializer

class PurchaseOrderViewSet(viewsets.ModelViewSet):
    queryset = PurchaseOrder.objects.all()
    serializer_class = PurchaseOrderSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [IsAdmin | IsSupervisor]
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        if self.action == 'list':
            return PurchaseOrderSerializer
        return PurchaseOrderSerializer

    @action(detail=False, methods=['get'])
    def summary(self, request):
        """Get summary of purchase orders"""
        queryset = self.get_queryset()
        serializer = PurchaseOrderSerializer(queryset, many=True)
        return Response(serializer.data)

class StockTransactionViewSet(viewsets.ModelViewSet):
    queryset = StockTransaction.objects.all()
    serializer_class = StockTransactionSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [IsAdmin | IsSupervisor]
        return [permission() for permission in permission_classes]

    @action(detail=False, methods=['get'])
    def summary(self, request):
        """Get summary of stock transactions"""
        queryset = self.get_queryset()
        serializer = StockTransactionSerializer(queryset, many=True)
        return Response(serializer.data)
