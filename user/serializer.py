from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate
from event_manager.settings import SIMPLE_JWT
import jwt
from event_manager.utils import generate_jwt_token
from event_manager.errors import ERORRS


class UserSerializer(serializers.ModelSerializer):
    """Handles serialization and deserialization of User objects."""

    # Passwords must be at least 8 characters, but no more than 128
    # characters. These values are the default provided by Django. We could
    # change them, but that would create extra work while introducing no real
    # benefit, so lets just stick with the defaults.
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name',
                  'enable_notifications', 'password', 'email', 'avatar')

    def update(self, instance, validated_data):
        """Performs an update on a User."""

        # Passwords should not be handled with `setattr`, unlike other fields.
        # Django provides a function that handles hashing and
        # salting passwords. That means
        # we need to remove the password field from the
        # `validated_data` dictionary before iterating over it.
        validated_data.pop('password', None)

        for (key, value) in validated_data.items():
            # For the keys remaining in `validated_data`, we will set them on
            # the current `User` instance one at a time.
            setattr(instance, key, value)

        # After everything has been updated we must explicitly save
        # the model. It's worth pointing out that `.set_password()` does not
        # save the model.
        instance.save()

        return instance


class RegistrationSerializer(serializers.ModelSerializer):
    """Serializers registration requests and creates a new user."""

    # Ensure passwords are at least 8 characters long, no longer than 128
    # characters, and can not be read by the client.
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )

    # The client should not be able to send a token along with a registration
    # request. Making `token` read-only handles that for us.
    # token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        # List all of the fields that could possibly be included in a request
        # or response, including fields specified explicitly above.
        fields = ["id", 'email', 'username', 'password']

    def create(self, validated_data):
        # Use the `create_user` method we wrote earlier to create a new user.
        return User.objects.create_user(**validated_data)


class PasswordResetSerializer(serializers.ModelSerializer):
    email = serializers.CharField(max_length=255)
    token = serializers.CharField(max_length=255, required=False)

    class Meta:
        model = User
        fields = ['email', 'token']

    def update(self, instance, validated_data):
        email = validated_data.get('email', None)
        try:
            user = User.objects.get(email=email)
        except:
            # user = None
            raise serializers.ValidationError(ERORRS['ERROR_USER_NOT_FOUND'])
        # if user is None:
        token = generate_jwt_token(1)
        user.token = token
        user.save()
        return user

class PasswordResetConfirmSerializer(serializers.ModelSerializer):
    email = serializers.CharField(max_length=255)
    token = serializers.CharField(max_length=255)
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )

    class Meta:
        model = User
        fields = ['email', 'token', 'password']

    def update(self, instance, validated_data):
        email = validated_data.get('email', None)
        password = validated_data.get('password', None)
        token = validated_data.get('token', None)

        # We are going to validate first if token, email and password
        # are present in then request and the user is currently active
        # or not
        if email is None:
            raise serializers.ValidationError(
                ERORRS['ERROR_REQUIRED']['EMAIL']
            )
        elif password is None:
            raise serializers.ValidationError(
                ERORRS['ERROR_REQUIRED']['PASSWORD']
            )
        elif token is None:
            raise serializers.ValidationError(
                ERORRS['ERROR_REQUIRED']['TOKEN']
            )

        # Now get the user by email provided
        try:
            user = User.objects.get(email=email)
        except:
            user = None
        if user is None:
            raise serializers.ValidationError(ERORRS['ERROR_USER_NOT_FOUND'])
        # If user is found but it is currently inactive
        elif not user.is_active:
            raise serializers.ValidationError(
                ERORRS['ERROR_DEACTIVATED_USER']
            )

        if user.token != token:
            raise serializers.ValidationError(
                ERORRS['ERROR_INVALID_TOKEN']
            )
        else:
            # jwt.decode will throw an exception if token is expired
            try:
                jwt.decode(token, SIMPLE_JWT['SIGNING_KEY'], algorithm='HS256')
            except:
                raise serializers.ValidationError(
                    ERORRS['ERROR_INVALID_EXPIRED']
                )

        # All the above validations are passed and we are good to update the password for user now
        user.set_password(password)
        # After saving password set user.token field to empty
        user.token = None
        user.save()
        return user
