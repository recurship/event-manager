# from django.test import TestCase
from django.test import TestCase
from event.models import Event
from organisation.models import Organisation
from user.models import User
from django.utils import timezone
from event_manager.utils import TEST_USER_CREDENTIALS as test_user

# Create your tests here.

class EventSerializerTest(TestCase):
    @classmethod
    def create_event(cls, title='test event', description='test desc'):
        usr = User.objects.create(
            username=test_user['username'], email=test_user['email'])
        usr.set_password(test_user['password'])
        usr.save()
        org = Organisation.objects.create(name='test', owner=usr)
        return Event.objects.create(title=title, description=description,
                                    start_datetime=timezone.now(), end_datetime=timezone.now(), organisation=org)

    def test_event_creation(self):
        event_instance = self.create_event()
        self.assertTrue(isinstance(event_instance, Event))
        self.assertEqual(str(event_instance), event_instance.title)