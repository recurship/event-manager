
from rest_framework import serializers
from .models import Organisation

class OrganisationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Organisation
        fields = ('id', 'name', 'is_active', 'owner')

