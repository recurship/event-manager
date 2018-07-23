from django.shortcuts import render
from rest_framework import viewsets
from .models import Event
from .serializers import EventSerializer, EventCreateSerializer
from rest_framework.response import Response
from datetime import datetime

class EventView(viewsets.ModelViewSet):

    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return EventCreateSerializer
        return EventSerializer

# The following method will only gets called when we hit /events/ on GET request
# It wil apply filter if we provide any filters in query params if not then all events will be returned
    def list(self, request):
        filter_date_from = request.GET.get('filter_date_from', '')
        filter_date_to = request.GET.get('filter_date_to', '')
        filter_organisation = request.GET.get('filter_organisation', '')
        filter_data = {}
        if filter_date_from:
            filter_data['start_datetime__gte'] = datetime.strptime(filter_date_from, "%Y-%m-%d")
        if filter_date_to:
            filter_data['end_datetime__lte'] = datetime.strptime(filter_date_to, "%Y-%m-%d")
        if filter_organisation:
            filter_data['organisation__in'] = filter_organisation.split(',')
        queryset = Event.objects.filter(**filter_data)
        serialized_data = EventSerializer(queryset, many=True)
        print(serialized_data.data)
        return Response(serialized_data.data)