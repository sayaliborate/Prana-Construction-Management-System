from rest_framework import serializers
from .models import SiteDetail, Project, ProjectImage, SitePlan, SiteTracker
from users.models import User
from employees.models import Supervisor

class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ['id', 'image', 'caption', 'is_before', 'is_after', 'order']

class SiteDetailSerializer(serializers.ModelSerializer):
    team_leader_name = serializers.CharField(source='team_leader.get_full_name', read_only=True)
    
    class Meta:
        model = SiteDetail
        fields = ['id', 'title', 'region', 'category', 'description', 
                 'team_leader', 'team_leader_name', 'created_at']

class ProjectSerializer(serializers.ModelSerializer):
    images = ProjectImageSerializer(many=True, read_only=True)
    client_name = serializers.CharField(source='client.get_full_name', read_only=True)
    site_title = serializers.CharField(source='site.title', read_only=True)
    
    class Meta:
        model = Project
        fields = ['id', 'name', 'slug', 'description', 'start_date', 'estimated_completion', 
                 'actual_completion', 'budget', 'progress', 'status', 'featured', 
                 'client', 'client_name', 'site', 'site_title', 'images', 'created_at']

class SitePlanSerializer(serializers.ModelSerializer):
    site_name = serializers.CharField(source='site.title', read_only=True)
    
    class Meta:
        model = SitePlan
        fields = ['id', 'site', 'site_name', 'plan_name', 'plan_type', 'file', 
                 'description', 'version', 'is_current', 'uploaded_at']

class SiteTrackerSerializer(serializers.ModelSerializer):
    site_name = serializers.CharField(source='site.title', read_only=True)
    supervisor_name = serializers.CharField(source='supervisor.name', read_only=True)
    
    class Meta:
        model = SiteTracker
        fields = ['id', 'site', 'site_name', 'supervisor', 'supervisor_name', 
                 'date', 'work_description', 'progress_percentage', 
                 'expenses', 'labour_count', 'notes', 'created_at']

class SiteTrackerListSerializer(serializers.ModelSerializer):
    site_name = serializers.CharField(source='site.title', read_only=True)
    
    class Meta:
        model = SiteTracker
        fields = ['id', 'site_name', 'date', 'progress_percentage', 
                 'expenses', 'labour_count', 'work_description']
