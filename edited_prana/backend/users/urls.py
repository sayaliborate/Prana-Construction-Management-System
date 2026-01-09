from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet, me, simple_login

router = routers.DefaultRouter()
router.register('', UserViewSet, basename='user')

urlpatterns = [
    path('me/', me, name='me'),
    path('', include(router.urls)),
    path('login/', simple_login, name='simple-login'),

]
