from django.db import models

from django.core.validators import FileExtensionValidator
# Create your models here.


class Location(models.Model):

    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    logo = models.FileField(upload_to='location/', blank=False, null=True,
                            validators=[FileExtensionValidator(allowed_extensions=['jpg', 'png'])])

    def __str__(self):
        return self.name
