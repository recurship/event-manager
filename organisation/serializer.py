
from rest_framework import serializers
from .models import Organisation
from user.serializer import UserSerializer


class OrganisationCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Organisation
        fields = ('id', 'name', 'is_active', 'owner', 'logo', 'description')


class OrganisationSerializer(serializers.ModelSerializer):

    owner = UserSerializer()

    class Meta:
        model = Organisation
        fields = ('id', 'name', 'is_active', 'owner', 'logo', 'description')
