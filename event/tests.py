# from django.test import TestCase
from django.test import TestCase
from event.models import Event
from organisation.models import Organisation
from user.models import User
from django.utils import timezone
from django.urls import reverse, reverse_lazy
import json
from event_manager.utils import TEST_USER_CREDENTIALS as test_user

# Create your tests here.


class EventTest(TestCase):
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
        a = self.create_event()
        self.assertTrue(isinstance(a, Event))
        self.assertEqual(str(a), a.title)

    def test_event_title(self):
        a = self.create_event()
        self.assertEqual(str(a), a.title)
        self.assertNotEqual(str(a), 'unmatched event title')

    def test_event_description(self):
        a = self.create_event()
        event = Event(description=a.description)
        self.assertEqual(a.description, event.description)
        self.assertNotEqual(a.description, 'unmatched description')

    def test_event_organisation(self):
        a = self.create_event()
        event = Event(organisation=a.organisation)
        self.assertEqual(a.organisation, event.organisation)
        self.assertNotEqual(a.organisation, 'unmatched organisation')

    def test_event_list_view(self):
        a = self.create_event()
        url = reverse_lazy('event-list')
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, 200)
        self.assertIn(a.title, resp.content.decode('utf_8'))

    def test_event_detail_view(self):
        a = self.create_event()
        url = reverse('event-detail', args=[a.id])
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, 200)
        json_resp = json.loads(resp.content)
        self.assertEqual(a.id, json_resp['id'])
        self.assertEqual(a.title, json_resp['title'])

    def test_event_create_view_without_token(self):
        a = self.create_event()
        url = reverse('event-list')
        resp = self.client.post(url, {'title': 'new event', 'description': 'testing',
                                      'start_datetime': timezone.now(), 'end_datetime': timezone.now(), 'organisation': a.organisation})
        # 401 status code will be sent by the backend for unauthorized requests
        self.assertEqual(resp.status_code, 401)

    def test_event_edit_view_without_token(self):
        a = self.create_event()
        url = reverse('event-detail', args=[a.id])
        data = json.dumps({'title': 'update event title'})
        resp = self.client.patch(
            url, data, content_type='application/json')
        # 401 status code will be sent by the backend for unauthorized requests
        self.assertEqual(resp.status_code, 401)

    def test_event_create_view_with_token(self):
        a = self.create_event()
        login_resp = self.client.post(
            '/api/token', {'username': test_user['username'], 'password': test_user['password']})
        login_json_resp = json.loads(login_resp.content)
        self.assertEqual(login_resp.status_code, 200)
        url = reverse('event-list')
        token = login_json_resp['access']
        event_resp = self.client.post(url, {'title': 'new event', 'description': 'testing',
                                            'start_datetime': timezone.now(), 'end_datetime': timezone.now(), 'organisation': a.organisation.id},
                                      HTTP_AUTHORIZATION='Bearer ' + token)
        self.assertEqual(event_resp.status_code, 201)

    def test_event_update_view_with_token(self):
        a = self.create_event()
        login_resp = self.client.post(
            '/api/token', {'username': test_user['username'], 'password': test_user['password']})
        login_json_resp = json.loads(login_resp.content)
        self.assertEqual(login_resp.status_code, 200)
        url = reverse('event-detail', args=[a.id])
        token = login_json_resp['access']
        data = json.dumps({'title': 'update event title'})
        event_resp = self.client.patch(url, data,
                                       content_type='application/json', HTTP_AUTHORIZATION='Bearer ' + token)
        self.assertEqual(event_resp.status_code, 200)
        event_json_resp = json.loads(event_resp.content)
        # Now the event is updated so its title will not match with the previously created event title
        self.assertNotEqual(a.title, event_json_resp['title'])