
from rest_framework import serializers
from organisation.serializer import OrganisationSerializer
from .models import Event

class EventSerializer(serializers.ModelSerializer):

    organisation = OrganisationSerializer()

    class Meta:
        model = Event
        fields = ('id', 'title', 'description', 'start_datetime', 'end_datetime', 'organisation')