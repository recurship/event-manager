from django.shortcuts import render
from rest_framework import viewsets
from .models import Organisation
from .serializer import OrganisationSerializer
# Create your views here.

class OrganisationView(viewsets.ModelViewSet):

    queryset = Organisation.objects.all()
    serializer_class = OrganisationSerializer
