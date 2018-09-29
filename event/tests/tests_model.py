# from django.test import TestCase
from django.test import TestCase
from event.models import Event, EventLocation, EventSponser
from organisation.models import Organisation
from user.models import User
from django.utils import timezone
from .tests_config import TEST_USER_CREDENTIALS as test_user

# Create your tests here.

class EventSerializerTest(TestCase):
    @classmethod
    def create_user(cls):
        usr, created = User.objects.get_or_create(
            username=test_user['username'], email=test_user['email'])
        if created:
            usr.set_password(test_user['password'])
            usr.save()
        return usr

    @classmethod
    def create_organisation(cls):
        organisation = Organisation.objects.get_or_create(
            name='test', owner=cls.create_user())[0]
        return organisation

    @classmethod
    def create_event_location(cls, name='test location', address='test address'):
        return EventLocation.objects.create(name=name, address=address)

    @classmethod
    def create_event_sponser(cls, name='test sponser'):
        return EventSponser.objects.create(name=name)

    @classmethod
    def create_event(cls, title='test event', description='test desc'):
        event = Event.objects.create(title=title, description=description,
                                    start_datetime=timezone.now(), end_datetime=timezone.now(),
                                    organisation=cls.create_organisation(), location=cls.create_event_location())
        event.sponser.add(cls.create_event_sponser())
        event.save()
        return event

    def test_event_creation(self):
        event_instance = self.create_event()
        self.assertTrue(isinstance(event_instance, Event))
        self.assertEqual(str(event_instance), event_instance.title)

    def test_event_location_creation(self):
        event_location_instance = self.create_event_location()
        self.assertTrue(isinstance(event_location_instance, EventLocation))
        self.assertEqual(str(event_location_instance), event_location_instance.name)

    def test_event_sponser_creation(self):
        event_sponser_instance = self.create_event_sponser()
        self.assertTrue(isinstance(event_sponser_instance, EventSponser))
        self.assertEqual(str(event_sponser_instance), event_sponser_instance.name)