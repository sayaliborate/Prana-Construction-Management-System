from django.urls import path, include
from rest_framework import routers
from .views import (
    SiteDetailViewSet, ProjectViewSet, ProjectImageViewSet, 
    SitePlanViewSet, SiteTrackerViewSet
)

router = routers.DefaultRouter()
router.register('sites', SiteDetailViewSet, basename='sites')
router.register('projects', ProjectViewSet, basename='project')
router.register('project-images', ProjectImageViewSet, basename='project-image')
router.register('site-plans', SitePlanViewSet, basename='site-plan')
router.register('site-trackers', SiteTrackerViewSet, basename='site-tracker')

urlpatterns = [
    path('', include(router.urls)),
]
