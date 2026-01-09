from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import CompanyInfo, TeamMember, Service, ContactMessage
from .serializers import (
    CompanyInfoSerializer, TeamMemberSerializer, ServiceSerializer, 
    ContactMessageSerializer, TeamMemberListSerializer, ServiceListSerializer,
    ContactMessageListSerializer
)
from users.views import IsAdmin, IsSupervisor, IsClient

class CompanyInfoViewSet(viewsets.ModelViewSet):
    queryset = CompanyInfo.objects.all()
    serializer_class = CompanyInfoSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [IsAdmin]
        return [permission() for permission in permission_classes]

class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer

    def get_permissions(self):
        # Allow anyone (even unauthenticated users) to list, view, or create team members
        if self.action in ['list', 'retrieve', 'create']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [IsAdmin]
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        if self.action == 'list':
            return TeamMemberListSerializer
        return TeamMemberSerializer


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [IsAdmin]
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        if self.action == 'list':
            return ServiceListSerializer
        return ServiceSerializer

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def get_permissions(self):
        if self.action in ['create', 'list', 'retrieve']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [IsAdmin]
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        if self.action == 'list':
            return ContactMessageListSerializer
        return ContactMessageSerializer

    @action(detail=False, methods=['get'])
    def unread(self, request):
        """Get unread contact messages"""
        queryset = self.get_queryset().filter(is_read=False)
        serializer = ContactMessageListSerializer(queryset, many=True)
        return Response(serializer.data)
