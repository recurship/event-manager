from django.shortcuts import render
from rest_framework import viewsets
from .models import Event
from .serializers import EventSerializer

class EventView(viewsets.ModelViewSet):

    queryset = Event.objects.all()
    serializer_class = EventSerializer
