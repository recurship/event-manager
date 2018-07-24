from django.shortcuts import render
from rest_framework import viewsets, status
from .models import Organisation
from event.models import Event
from .serializer import OrganisationSerializer, OrganisationCreateSerializer
# Create your views here.
from rest_framework.response import Response
from django.http import Http404

class OrganisationView(viewsets.ModelViewSet):

    queryset = Organisation.objects.all()
    serializer_class = OrganisationSerializer

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return OrganisationCreateSerializer
        return OrganisationSerializer

    @classmethod
    def retrieve(self,request,pk=None):
        try:
            queryset_organisation = Organisation.objects.get(pk=pk)
        except Organisation.DoesNotExist:
            raise Http404
        queryset_event = Event.objects.filter(organisation=pk).values()
        serialized_data_organisation = OrganisationSerializer(queryset_organisation)
        data = { **serialized_data_organisation.data }
        data['events'] = queryset_event

        return Response(data, status=status.HTTP_200_OK)
