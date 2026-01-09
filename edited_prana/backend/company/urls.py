from django.urls import path, include
from rest_framework import routers
from .views import (
    CompanyInfoViewSet, TeamMemberViewSet, ServiceViewSet, ContactMessageViewSet
)

router = routers.DefaultRouter()
router.register('info', CompanyInfoViewSet, basename='company-info')
router.register('team-members', TeamMemberViewSet, basename='team-member')
router.register('services', ServiceViewSet, basename='service')
router.register('contact-messages', ContactMessageViewSet, basename='contact-message')

urlpatterns = [
    path('', include(router.urls)),
]
