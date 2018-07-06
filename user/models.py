import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    enable_notifications = models.BooleanField(default=True)

    def __str__(self):
        return self.username
