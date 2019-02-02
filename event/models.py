from django.db import models
from organisation.models import Organisation
from user.models import User
from django.core.validators import FileExtensionValidator
from django.contrib.postgres.fields import JSONField
from event_manager.fields import JSONSchemaField


class EventLocation(models.Model):

    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    latitute = models.DecimalField(max_digits=9, decimal_places=6, default=24.926294)
    longitute = models.DecimalField(max_digits=9, decimal_places=6, default=67.022095)
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
    sponsers = models.ManyToManyField(EventSponser, blank=True)
    comments = models.ManyToManyField(EventComment, blank=True)
    tags = models.ManyToManyField(EventTag, blank=True)
    cover = models.FileField(upload_to='events/', blank=False, null=True,
                            validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png'])])
    attendees = models.ManyToManyField(User, blank=True)

    def __str__(self):
        return self.title


# todo: Figure out if schema is final, run migrations (make upnew) and continue work
class FormType(models.Model):
    code = models.CharField(max_length=128)
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name


class Form(models.Model):
    title = models.CharField(max_length=128)
    type = models.ForeignKey(FormType, on_delete=models.CASCADE)
    fields = JSONSchemaField(schema='schemas/form.fields.json', default=list, blank=True)
    event = models.ForeignKey(Event, null=True, blank=True, related_name='forms', on_delete=models.CASCADE)


class Submission(models.Model):
    user = models.ForeignKey(User, null=True, blank=True, related_name='forms', on_delete=models.CASCADE)
    form = models.ForeignKey(Form, related_name='user_submissions', on_delete=models.CASCADE)
    submission = JSONField()
