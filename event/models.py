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
    sponsers = models.ManyToManyField(EventSponser, blank=True)
    comments = models.ManyToManyField(EventComment, blank=True)
    tags = models.ManyToManyField(EventTag, blank=True)
    cover = models.FileField(upload_to='events/', blank=False, null=True,
                            validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png'])])
    attendees = models.ManyToManyField(User, blank=True)

    def __str__(self):
        return self.title

class EventForm(models.Model):
    """
    This Model creates relationship of Form with Event. his making it possible
    for us to create a form when required for an event.

    There is a field of form_required. This field is for event organizers to make
    this form to be filled by all the attendees.

    form_id is the primary_key for this table.
    form_required is boolean object used to determine if form to be filled necessarily
    event_id is foreign_key object used to relate the form to Event
    """
    form_id = models.IntegerField(auto_created=True)
    form_required = models.BooleanField(default=True)
    event_id = models.ForeignKey(Event, on_delete=models.CASCADE)


class HtmlTags(models.Model):
    """
    In this model we are storing form related html tags. This table completely
    replaces the column table. because the name of the column in FormColumn
    table can also be the 'name' of that column here
    """
    name_of_html_Tag = models.CharField(max_length=255) # e.g: input, textfield, h3, etc...
    id_of_html_tag = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    placeholder = models.CharField(max_length=255)
    value = models.CharField(max_length=255)
    required = models.BooleanField()
    label = models.CharField(max_length=511)


class FormDetails(models.Model):
    """
    Here we connect the html-tags with the forms. this way we can easily determine the
    forms we need to generate.
    """
    form_id = models.ForeignKey(EventForm, on_delete=models.CASCADE)
    tag_id = models.ForeignKey(HtmlTags, on_delete=models.CASCADE)


class FormUsers(models.Model):
    """
    This table relates the attendee to the form thus making it easier to find the
    attendee and its data that it provided.

    form_id comes from EventForm Model as ForeignKey.
    attendee_id comes from User Model as ForeignKey
    """
    form_id = models.ForeignKey(EventForm, on_delete=models.CASCADE)
    attendee_id = models.ForeignKey(User, on_delete=models.CASCADE)


class FormFilled(models.Model):
    """
    This model is a bit challenging to implement if developer is new to this concept.
    Here we are storing straight forward a dictionary/JSON into database and
    querying it only against the attendee.

    attendee_id comes from User Model as ForeignKey
    form_data is data that attendee filled when subscribing to event and is in JSON
    
    """
    attendee_id = models.ForeignKey(User, on_delete=models.CASCADE)
    form_data = models.TextField()

