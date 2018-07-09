from django.shortcuts import render
from rest_framework import viewsets
from .models import Organisation
from .serializer import OrganisationSerializer, OrganisationCreateSerializer
# Create your views here.


class OrganisationView(viewsets.ModelViewSet):

    queryset = Organisation.objects.all()
    serializer_class = OrganisationSerializer

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return OrganisationCreateSerializer
        return OrganisationSerializer
