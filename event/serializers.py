
from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):

    class Meta:

        model = Event
        fields = ('id', 'title', 'description', 'start_datetime', 'end_datetime', 'organisation')