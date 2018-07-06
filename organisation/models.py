from user.models import User
from django.db import models


class Organisation(models.Model):

    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
