# from django.test import TestCase
from django.test import TestCase
from event.models import Event
from organisation.models import Organisation
from user.models import User
from django.utils import timezone
from django.urls import reverse, reverse_lazy
import json
from event_manager.utils import TEST_USER_CREDENTIALS as test_user
from django.forms.models import model_to_dict

# Create your tests here.
MODEL_FIELDS = ['id', 'title', 'description']

class EventViewTest(TestCase):
    @classmethod
    def create_event(cls, title='test event', description='test desc'):
        usr = User.objects.create(
            username=test_user['username'], email=test_user['email'])
        usr.set_password(test_user['password'])
        usr.save()
        org = Organisation.objects.create(name='test', owner=usr)
        return Event.objects.create(title=title, description=description,
                                    start_datetime=timezone.now(), end_datetime=timezone.now(), organisation=org)

    def test_event_list_view(self):
        event_instance = self.create_event()
        url = reverse_lazy('event-list')
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, 200)
        json_resp = json.loads(resp.content)['results'].pop()
        self.assertDictContainsSubset(model_to_dict(event_instance, MODEL_FIELDS), json_resp)

    def test_event_detail_view(self):
        event_instance = self.create_event()
        url = reverse('event-detail', args=[event_instance.id])
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, 200)
        json_resp = json.loads(resp.content)
        self.assertDictContainsSubset(model_to_dict(event_instance, MODEL_FIELDS), json_resp)

    def test_event_create_view_without_token(self):
        event_instance = self.create_event()
        url = reverse('event-list')
        resp = self.client.post(url, {'title': 'new event', 'description': 'testing',
                                      'start_datetime': timezone.now(), 'end_datetime': timezone.now(), 'organisation': event_instance.organisation})
        # 401 status code will be sent by the backend for unauthorized requests
        self.assertEqual(resp.status_code, 401)

    def test_event_edit_view_without_token(self):
        event_instance = self.create_event()
        url = reverse('event-detail', args=[event_instance.id])
        data = json.dumps({'title': 'update event title'})
        resp = self.client.patch(
            url, data, content_type='application/json')
        # 401 status code will be sent by the backend for unauthorized requests
        self.assertEqual(resp.status_code, 401)

    def test_event_create_view_with_token(self):
        event_instance = self.create_event()
        login_resp = self.client.post(
            '/api/token', {'username': test_user['username'], 'password': test_user['password']})
        login_json_resp = json.loads(login_resp.content)
        self.assertEqual(login_resp.status_code, 200)
        url = reverse('event-list')
        token = login_json_resp['access']
        event_resp = self.client.post(url, {'title': 'new event', 'description': 'testing',
                                            'start_datetime': timezone.now(), 'end_datetime': timezone.now(), 'organisation': event_instance.organisation.id},
                                      HTTP_AUTHORIZATION='Bearer ' + token)
        self.assertEqual(event_resp.status_code, 201)

    def test_event_update_view_with_token(self):
        event_instance = self.create_event()
        login_resp = self.client.post(
            '/api/token', {'username': test_user['username'], 'password': test_user['password']})
        login_json_resp = json.loads(login_resp.content)
        self.assertEqual(login_resp.status_code, 200)
        url = reverse('event-detail', args=[event_instance.id])
        token = login_json_resp['access']
        data = json.dumps({'title': 'update event title'})
        event_resp = self.client.patch(url, data,
                                       content_type='application/json', HTTP_AUTHORIZATION='Bearer ' + token)
        self.assertEqual(event_resp.status_code, 200)
        event_json_resp = json.loads(event_resp.content)
        # Now the event is updated so its title will not match with the previously created event title
        self.assertNotEqual(event_instance.title, event_json_resp['title'])