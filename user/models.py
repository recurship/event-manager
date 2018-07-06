import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from django_resized import ResizedImageField


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    enable_notifications = models.BooleanField(default=True)
    avatar = ResizedImageField(
        size=[300, 300], upload_to='user', blank=False, null=True)

    def __str__(self):
        return self.username
