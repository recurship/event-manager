from rest_framework import status
from rest_framework import viewsets
from rest_framework.generics import RetrieveUpdateAPIView, get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.views.generic import TemplateView
from django.core.mail import EmailMessage

from .models import User
from .serializer import UserSerializer, RegistrationSerializer, PasswordResetSerializer, PasswordResetConfirmSerializer


class UserView(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


class RegistrationAPIView(APIView):
    # Allow any user (authenticated or not) to hit this endpoint.
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer

    def post(self, request):
        user = request.data

        # The create serializer, validate serializer, save serializer pattern
        # below is common and you will see it a lot throughout this course and
        # your own work later on. Get familiar with it.
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserRetrieveUpdateAPIView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def retrieve(self, request, *args, **kwargs):
        # There is nothing to validate or save here. Instead, we just want the
        # serializer to handle turning our `User` object into something that
        # can be JSONified and sent to the client.
        serializer = self.serializer_class(request.user)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        serializer_data = request.data

        # Here is that serialize, validate, save pattern we talked about
        # before.
        serializer = self.serializer_class(
            request.user, data=serializer_data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

class ResetPasswordAPIView(APIView):
    permission_classes = (AllowAny,)
    serializer_class = PasswordResetSerializer

    def post(self, request, *args, **kwargs):
        serializer_data = request.data
        serializer = self.serializer_class(
            {}, data=serializer_data
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data = serializer.data
        # If user is found and token is generated and save in user model now
        # its time to send user an email with the password reset email
        recipient_email = data['email']
        email = EmailMessage('Reset Password request for Event Manager', request.build_absolute_uri()
                             + '?token=' + data['token'] + '&email=' + recipient_email, to=[recipient_email])
        email.send()

        return Response('Successfully sent reset password link to email: ' + data['email'], status=status.HTTP_200_OK)


class ResetPasswordConfirmAPIView(APIView):
    permission_classes = (AllowAny,)
    serializer_class = PasswordResetConfirmSerializer

    def post(self, request, *args, **kwargs):
        serializer_data = request.data
        serializer = self.serializer_class(
            {}, data=serializer_data
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response('Password has been successfully reset', status=status.HTTP_200_OK)
