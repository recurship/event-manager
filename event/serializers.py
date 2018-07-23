
from rest_framework import serializers
from organisation.serializer import OrganisationSerializer
from location.serializer import LocationSerializer
from sponser.serializer import SponserSerializer
from .models import Event

class EventCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = ('id', 'title', 'description', 'start_datetime', 'end_datetime', 'organisation', 'cover', 'location', 'registration_url', 'sponser')


class EventSerializer(serializers.ModelSerializer):

    organisation = OrganisationSerializer()
    location = LocationSerializer()
    sponser = SponserSerializer(many=True)

    class Meta:
        model = Event
        fields = ('id', 'title', 'description', 'start_datetime', 'end_datetime', 'organisation', 'cover', 'location', 'sponser')
