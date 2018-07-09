from django.db import models
from organisation.models import Organisation
from django.core.validators import FileExtensionValidator


class Event(models.Model):

    title = models.CharField(max_length=255)
    description = models.TextField()
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    organisation = models.ForeignKey(Organisation, on_delete=models.CASCADE)
    cover = models.FileField(upload_to='events/', blank=False, null=True,
                            validators=[FileExtensionValidator(allowed_extensions=['jpg', 'png'])])

    def __str__(self):
        return self.title
