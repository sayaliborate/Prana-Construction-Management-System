from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import SiteDetail, Project, ProjectImage, SitePlan, SiteTracker
from .serializers import (
    SiteDetailSerializer, ProjectSerializer, ProjectImageSerializer, 
    SitePlanSerializer, SiteTrackerSerializer, SiteTrackerListSerializer
)
from users.views import IsAdmin, IsSupervisor, IsClient

class SiteDetailViewSet(viewsets.ModelViewSet):
    """
    Fully public: anyone can list, retrieve, create, update, delete
    """
    queryset = SiteDetail.objects.all()
    serializer_class = SiteDetailSerializer
    permission_classes = [permissions.AllowAny]  # ✅ fully public

from rest_framework import viewsets, permissions
from .models import Project
from .serializers import ProjectSerializer
from users.views import IsAdmin, IsSupervisor

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def get_permissions(self):
        # ✅ Allow anyone (no authentication needed)
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.AllowAny]
        else:
            # Only Admin and Supervisor can add, edit, delete
            permission_classes = [IsAdmin | IsSupervisor]
        return [permission() for permission in permission_classes]

class ProjectImageViewSet(viewsets.ModelViewSet):
    queryset = ProjectImage.objects.all()
    serializer_class = ProjectImageSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [IsAdmin | IsSupervisor]
        return [permission() for permission in permission_classes]

class SitePlanViewSet(viewsets.ModelViewSet):
    queryset = SitePlan.objects.all()
    serializer_class = SitePlanSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [IsAdmin | IsSupervisor]
        return [permission() for permission in permission_classes]

class SiteTrackerViewSet(viewsets.ModelViewSet):
    queryset = SiteTracker.objects.all()
    serializer_class = SiteTrackerSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [IsAdmin | IsSupervisor]
        return [permission() for permission in permission_classes]

    @action(detail=False, methods=['get'])
    def summary(self, request):
        """Get summary of site trackers"""
        queryset = self.get_queryset()
        serializer = SiteTrackerListSerializer(queryset, many=True)
        return Response(serializer.data)
