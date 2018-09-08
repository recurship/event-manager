
from rest_framework import serializers
from organisation.serializer import OrganisationSerializer
from user.serializer import UserSerializer
from .models import Event, EventLocation, EventSponser, EventComment, EventTag

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

class EventCommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = EventComment
        fields = ('id', 'comment', 'commented_by', 'comment_datetime')
class EventTagSerializer(serializers.ModelSerializer):

    class Meta:
        model = EventTag
        fields = ('id', 'name')

class EventCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = ('__all__')


class EventSerializer(serializers.ModelSerializer):

    organisation = OrganisationSerializer(read_only=True)
    location = EventLocationSerializer(read_only=True)
    sponsers = EventSponserSerializer(many=True, read_only=True)
    comments = EventCommentSerializer(many=True, read_only=True)
    tags = EventTagSerializer(many=True, read_only=True)
    attendees = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = ('id', 'title', 'description', 'start_datetime',
                  'end_datetime', 'organisation', 'cover', 'location', 'sponsers', 'attendees', 'tags', 'comments')

class EventUserAddSerializer(serializers.Serializer):
    userid = serializers.UUIDField()
    eventid = serializers.IntegerField()

    class Meta:
        model = Event
        fields = ['__all__']

    @classmethod
    def update(self, instance, validated_data):
        event = Event.objects.get(id=validated_data['eventid'])
        event.attendees.add(validated_data['userid'])
        event.save()
        return event

class EventCommentAddSerializer(serializers.Serializer):
    commentid = serializers.UUIDField()
    eventid = serializers.IntegerField()

    class Meta:
        model = Event
        fields = ['__all__']

    @classmethod
    def update(self, instance, validated_data):
        event = Event.objects.get(id=validated_data['eventid'])
        event.comments.add(validated_data['commentid'])
        event.save()
        return event