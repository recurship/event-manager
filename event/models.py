from django.db import models
from organisation.models import Organisation

class Event(models.Model):

    title = models.CharField(max_length=255)
    description = models.TextField()
    startDateTime = models.DateTimeField()
    endDateTime = models.DateTimeField()
    organisation = models.ForeignKey(Organisation, on_delete=models.CASCADE)

    def __str__(self):
        return self.title