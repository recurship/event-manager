import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser, AbstractBaseUser, BaseUserManager, PermissionsMixin
from django_resized import ResizedImageField
from user.user_manager import UserManager
from datetime import datetime, timedelta
import jwt


class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(db_index=True, max_length=255, unique=True)
    email = models.EmailField(db_index=True, unique=True)
    enable_notifications = models.BooleanField(default=True)
    first_name = models.CharField(max_length=255, null=True)
    last_name = models.CharField(max_length=255, null=True)
    is_staff = models.BooleanField(default=False, blank=True)
    avatar = ResizedImageField(
        size=[300, 300], upload_to='user', blank=False, null=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    # Tells Django that the UserManager class defined should manage
    # objects of this type.
    objects = UserManager()

    def __str__(self):
        return self.email

    def get_full_name(self):
        return self.first_name + self.last_name

    def get_short_name(self):
        return self.first_name
