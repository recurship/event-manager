from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Sponser
from .serializer import SponserSerializer
# Create your views here.


class SponserView(viewsets.ModelViewSet):

    queryset = Sponser.objects.all()
    serializer_class = SponserSerializer