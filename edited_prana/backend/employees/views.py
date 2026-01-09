from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Supervisor, Labour, SalarySlip
from .serializers import (
    SupervisorSerializer, SupervisorListSerializer, 
    LabourSerializer, LabourListSerializer, 
    SalarySlipSerializer, SalarySlipListSerializer
)
from users.views import IsAdmin, IsSupervisor, IsClient

class SupervisorViewSet(viewsets.ModelViewSet):
    queryset = Supervisor.objects.all()
    serializer_class = SupervisorSerializer
    permission_classes = [permissions.AllowAny]  # ✅ Allow anyone

    def get_serializer_class(self):
        if self.action == 'list':
            return SupervisorListSerializer
        return SupervisorSerializer

class LabourViewSet(viewsets.ModelViewSet):
    queryset = Labour.objects.all()
    serializer_class = LabourSerializer
    permission_classes = [permissions.AllowAny]

    def get_serializer_class(self):
        if self.action == 'list':
            return LabourListSerializer
        return LabourSerializer


class SalarySlipViewSet(viewsets.ModelViewSet):
    queryset = SalarySlip.objects.all()
    serializer_class = SalarySlipSerializer
    permission_classes = [permissions.AllowAny]  # ✅ Anyone can access

    def get_serializer_class(self):
        if self.action == 'list':
            return SalarySlipListSerializer
        return SalarySlipSerializer

    @action(detail=False, methods=['get'])
    def by_month(self, request):
        """Get salary slips by month and year"""
        month = request.query_params.get('month')
        year = request.query_params.get('year')

        if month and year:
            queryset = self.get_queryset().filter(month=month, year=year)
        else:
            queryset = self.get_queryset()

        serializer = SalarySlipListSerializer(queryset, many=True)
        return Response(serializer.data)
