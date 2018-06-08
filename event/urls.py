from django.urls import path, include
from .views import EventView
from rest_framework import routers


router = routers.DefaultRouter()
router.register('events', EventView)

urlpatterns = [
    path('', include(router.urls))
]
