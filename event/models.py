from django.db import models
from organisation.models import Organisation
from user.models import User
from django.core.validators import FileExtensionValidator


class EventLocation(models.Model):

    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    logo = models.FileField(upload_to='location/', blank=False, null=True,
                            validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png'])])

    def __str__(self):
        return self.name

class EventSponser(models.Model):

    name = models.CharField(max_length=255)
    logo = models.FileField(upload_to='sponser/', blank=False, null=True,
                            validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png'])])

    def __str__(self):
        return self.name

class EventComment(models.Model):

    comment = models.TextField()
    comment_datetime = models.DateTimeField()
    commented_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.comment

class EventTag(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Event(models.Model):

    title = models.CharField(max_length=255)
    description = models.TextField()
    registration_url = models.TextField(default=None, null=True)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    organisation = models.ForeignKey(Organisation, on_delete=models.CASCADE)
    location = models.ForeignKey(EventLocation, on_delete=models.SET_NULL, null=True)
    sponser = models.ManyToManyField(EventSponser, blank=True)
    comment = models.ManyToManyField(EventComment, blank=True)
    tag = models.ManyToManyField(EventTag, blank=True)
    cover = models.FileField(upload_to='events/', blank=False, null=True,
                            validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png'])])
    attendees = models.ManyToManyField(User, blank=True)

    def __str__(self):
        return self.title
