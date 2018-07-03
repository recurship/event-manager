import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import FileExtensionValidator


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    enable_notifications = models.BooleanField(default=True)
    avatar = models.FileField(upload_to='user/', blank=False, null=True, validators=[FileExtensionValidator(allowed_extensions=['jpg', 'png'])])
    

    def __str__(self):
        return self.username
