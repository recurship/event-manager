from django.urls import path, include
from .views import OrganisationView
from rest_framework import routers


router = routers.DefaultRouter()
router.register('organisations', OrganisationView)

urlpatterns = [
    path('', include(router.urls))
]
