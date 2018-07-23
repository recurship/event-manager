from django.db import models

from django.core.validators import FileExtensionValidator
# Create your models here.


class Sponser(models.Model):

    name = models.CharField(max_length=255)
    logo = models.FileField(upload_to='sponser/', blank=False, null=True,
                            validators=[FileExtensionValidator(allowed_extensions=['jpg', 'png'])])

    def __str__(self):
        return self.name
