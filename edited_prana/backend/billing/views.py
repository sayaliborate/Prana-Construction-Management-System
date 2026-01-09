from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Client, Invoice, Billing, BillingItem
from .serializers import (
    ClientSerializer, InvoiceSerializer, BillingSerializer, 
    ClientListSerializer, InvoiceListSerializer, BillingListSerializer
)
from users.views import IsAdmin, IsSupervisor, IsClient

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [permissions.AllowAny]  # ✅ Allow everyone (no token required)

    def get_serializer_class(self):
        if self.action == 'list':
            return ClientListSerializer
        return ClientSerializer

class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [IsAdmin | IsSupervisor]
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        if self.action == 'list':
            return InvoiceListSerializer
        return InvoiceSerializer

class BillingViewSet(viewsets.ModelViewSet):
    queryset = Billing.objects.all()
    serializer_class = BillingSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [IsAdmin | IsSupervisor]
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        if self.action == 'list':
            return BillingListSerializer
        return BillingSerializer

    @action(detail=False, methods=['get'])
    def by_client(self, request):
        """Get billings by client"""
        client_id = request.query_params.get('client_id')
        if client_id:
            queryset = self.get_queryset().filter(client_id=client_id)
        else:
            queryset = self.get_queryset()
            
        serializer = BillingListSerializer(queryset, many=True)
        return Response(serializer.data)
