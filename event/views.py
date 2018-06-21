from django.shortcuts import render
from rest_framework import viewsets
from .models import Event
from .serializers import EventSerializer, EventCreateSerializer

class EventView(viewsets.ModelViewSet):

    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return EventCreateSerializer
        return EventSerializer

