
from rest_framework import serializers
from organisation.serializer import OrganisationSerializer
from .models import Event

class EventCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = ('id', 'title', 'description', 'startDateTime', 'endDateTime', 'organisation')


class EventSerializer(serializers.ModelSerializer):

    organisation = OrganisationSerializer()

    class Meta:
        model = Event
        fields = ('id', 'title', 'description', 'startDateTime', 'endDateTime', 'organisation')
