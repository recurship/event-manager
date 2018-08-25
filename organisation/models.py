from user.models import User
from django.db import models
from django.core.validators import FileExtensionValidator


class Organisation(models.Model):

    name = models.CharField(max_length=255)
    description = models.TextField(null=True)
    is_active = models.BooleanField(default=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    email = models.EmailField(db_index=True, unique=False, blank=True, null=True)
    contact_number = models.CharField(max_length=11, blank=True)
    facebook = models.URLField(max_length=255, blank=True)
    twitter = models.URLField(max_length=255, blank=True)
    logo = models.FileField(upload_to='organisation/', blank=False, null=True,
                             validators=[FileExtensionValidator(allowed_extensions=['jpg', 'png', 'jpeg'])])

    def __str__(self):
        return self.name
