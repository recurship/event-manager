from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework import viewsets
from .models import Location
from .serializer import LocationSerializer
# Create your views here.


class LocationView(viewsets.ModelViewSet):

    queryset = Location.objects.all()
    serializer_class = LocationSerializer
