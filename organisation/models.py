from django.db import models

# Create your models here.

class Organisation(models.Model):

    name = models.CharField(max_length=255)

    is_active = models.BooleanField(default=True)
