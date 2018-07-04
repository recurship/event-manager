from user.models import User
from django.db import models
from django.core.validators import FileExtensionValidator


class Organisation(models.Model):

    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    logo = models.FileField(upload_to='organisation/', blank=False, null=True,
                             validators=[FileExtensionValidator(allowed_extensions=['jpg', 'png'])])

    def __str__(self):
        return self.name
