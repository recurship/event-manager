from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import User
from .serializer import UserSerializer

class UserView(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)