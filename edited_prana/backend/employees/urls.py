from django.urls import path, include
from rest_framework import routers
from .views import SupervisorViewSet, LabourViewSet, SalarySlipViewSet

router = routers.DefaultRouter()
router.register('supervisors', SupervisorViewSet, basename='supervisor')
router.register('labours', LabourViewSet, basename='labour')
router.register('salary-slips', SalarySlipViewSet, basename='salary-slip')

urlpatterns = [
    path('', include(router.urls)),
]
