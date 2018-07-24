
from rest_framework import serializers
from organisation.serializer import OrganisationSerializer
from .models import Event, EventLocation, EventSponser

# Event location Serializers
class EventLocationSerializer(serializers.ModelSerializer):

    class Meta:
        model = EventLocation
        fields = ('id', 'name', 'address', 'logo')

# Event sponsers serializers
class EventSponserSerializer(serializers.ModelSerializer):


    class Meta:
        model = EventSponser
        fields = ('id', 'name', 'logo')

class EventCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = ('id', 'title', 'description', 'start_datetime', 'end_datetime',
                  'organisation', 'cover', 'location', 'registration_url', 'sponser')


class EventSerializer(serializers.ModelSerializer):

    organisation = OrganisationSerializer()
    location = EventLocationSerializer()
    sponser = EventSponserSerializer(many=True)

    class Meta:
        model = Event
        fields = ('id', 'title', 'description', 'start_datetime',
                  'end_datetime', 'organisation', 'cover', 'location', 'sponser')
