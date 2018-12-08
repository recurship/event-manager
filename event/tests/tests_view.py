# from django.test import TestCase
from django.test import TestCase
from event.models import Event, EventLocation, EventSponser
from organisation.models import Organisation
from user.models import User
from django.utils import timezone
from django.urls import reverse, reverse_lazy
import json
from .tests_config import TEST_USER_CREDENTIALS as test_user
from django.forms.models import model_to_dict

# Create your tests here.
MODEL_EVENT_FIELDS = ['id', 'title', 'description']
MODEL_EVENT_LOCATION_FIELDS = ['id', 'name', 'address']
MODEL_EVENT_SPONSER_FIELDS = ['id', 'name']


class EventViewTest(TestCase):
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
        event.sponsers.add(cls.create_event_sponser())
        event.save()
        return event

    def test_event_list_view(self):
        event_instance = self.create_event()
        url = reverse_lazy('event-list')
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, 200)
        json_resp = json.loads(resp.content).pop()
        self.assertDictContainsSubset(model_to_dict(
            event_instance, MODEL_EVENT_FIELDS), json_resp)

    def test_event_location_list_view(self):
        event_location_instance = self.create_event_location()
        resp = self.client.get('/api/locations/')
        self.assertEqual(resp.status_code, 200)
        json_resp = json.loads(resp.content)['results'].pop()
        self.assertDictContainsSubset(model_to_dict(
            event_location_instance, MODEL_EVENT_LOCATION_FIELDS), json_resp)

    def test_event_sponser_list_view(self):
        event_sponser_instance = self.create_event_sponser()
        resp = self.client.get('/api/sponsers/')
        self.assertEqual(resp.status_code, 200)
        json_resp = json.loads(resp.content)['results'].pop()
        self.assertDictContainsSubset(model_to_dict(
            event_sponser_instance, MODEL_EVENT_SPONSER_FIELDS), json_resp)

    def test_event_detail_view(self):
        event_instance = self.create_event()
        url = reverse('event-detail', args=[event_instance.id])
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, 200)
        json_resp = json.loads(resp.content)
        self.assertDictContainsSubset(model_to_dict(
            event_instance, MODEL_EVENT_FIELDS), json_resp)

    def test_event_location_detail_view(self):
        event_location_instance = self.create_event_location()
        resp = self.client.get('/api/locations/' + str(event_location_instance.id) + '/')
        self.assertEqual(resp.status_code, 200)
        json_resp = json.loads(resp.content)
        self.assertDictContainsSubset(model_to_dict(
            event_location_instance, MODEL_EVENT_LOCATION_FIELDS), json_resp)

    def test_event_sponser_detail_view(self):
        event_sponser_instance = self.create_event_sponser()
        resp = self.client.get('/api/sponsers/' + str(event_sponser_instance.id) + '/')
        self.assertEqual(resp.status_code, 200)
        json_resp = json.loads(resp.content)
        self.assertDictContainsSubset(model_to_dict(
            event_sponser_instance, MODEL_EVENT_SPONSER_FIELDS), json_resp)

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

    def test_event_location_create_view_with_token(self):
        self.create_user()
        login_resp = self.client.post(
            '/api/token', {'username': test_user['username'], 'password': test_user['password']})
        login_json_resp = json.loads(login_resp.content)
        self.assertEqual(login_resp.status_code, 200)
        token = login_json_resp['access']
        event_resp = self.client.post('/api/locations/', {'name': 'new location', 'address': 'new address'},
                                      HTTP_AUTHORIZATION='Bearer ' + token)
        self.assertEqual(event_resp.status_code, 201)

    def test_event_sponser_create_view_with_token(self):
        self.create_user()
        self.create_event_sponser()
        login_resp = self.client.post(
            '/api/token', {'username': test_user['username'], 'password': test_user['password']})
        login_json_resp = json.loads(login_resp.content)
        self.assertEqual(login_resp.status_code, 200)
        token = login_json_resp['access']
        event_resp = self.client.post('/api/sponsers/', {'name': 'new location'},
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

    def test_event_location_update_view_with_token(self):
        self.create_user()
        event_location_instance = self.create_event_location()
        login_resp = self.client.post(
            '/api/token', {'username': test_user['username'], 'password': test_user['password']})
        login_json_resp = json.loads(login_resp.content)
        self.assertEqual(login_resp.status_code, 200)
        url = '/api/locations/' + str(event_location_instance.id) + '/'
        token = login_json_resp['access']
        data = json.dumps({'name': 'update location name'})
        event_location_resp = self.client.patch(url, data,
                                       content_type='application/json', HTTP_AUTHORIZATION='Bearer ' + token)
        self.assertEqual(event_location_resp.status_code, 200)
        event_location_json_resp = json.loads(event_location_resp.content)
        # Now the event location is updated so its name will not match with the previously created event name
        self.assertNotEqual(event_location_instance.name, event_location_json_resp['name'])

    def test_event_sponser_update_view_with_token(self):
        self.create_user()
        event_sponser_instance = self.create_event_sponser()
        login_resp = self.client.post(
            '/api/token', {'username': test_user['username'], 'password': test_user['password']})
        login_json_resp = json.loads(login_resp.content)
        self.assertEqual(login_resp.status_code, 200)
        url = '/api/sponsers/' + str(event_sponser_instance.id) + '/'
        token = login_json_resp['access']
        data = json.dumps({'name': 'update location name'})
        event_sponser_resp = self.client.patch(url, data,
                                       content_type='application/json', HTTP_AUTHORIZATION='Bearer ' + token)
        self.assertEqual(event_sponser_resp.status_code, 200)
        event_sponser_json_resp = json.loads(event_sponser_resp.content)
        # Now the event sponser is updated so its name will not match with the previously created event sponser name
        self.assertNotEqual(event_sponser_instance.name, event_sponser_json_resp['name'])

    def test_event_attendee_add_view_with_token(self):
        user = self.create_user()
        event_instance = self.create_event()
        login_resp = self.client.post(
            '/api/token', {'username': test_user['username'], 'password': test_user['password']})
        login_json_resp = json.loads(login_resp.content)
        self.assertEqual(login_resp.status_code, 200)
        token = login_json_resp['access']
        url = '/api/events/' + str(event_instance.id) + '/attendee/'
        event_resp = self.client.post(url, {},
                                      HTTP_AUTHORIZATION='Bearer ' + token)
        result = json.loads(event_resp.content)
        self.assertEqual(event_resp.status_code, 200)
        self.assertDictContainsSubset(model_to_dict(
            user, ['id', 'username', 'email']), result['attendees'][0])

    def test_event_permissions(self):
        # 401 status code will be sent by the backend for unauthorized requests
        event_instance = self.create_event()
        url = reverse('event-list')
        resp = self.client.post(url, {'title': 'new event', 'description': 'testing',
                                      'start_datetime': timezone.now(), 'end_datetime': timezone.now(), 'organisation': event_instance.organisation})
        self.assertEqual(resp.status_code, 401)
        url = reverse('event-detail', args=[event_instance.id])
        data = json.dumps({'title': 'update event title'})
        resp = self.client.patch(
            url, data, content_type='application/json')
        self.assertEqual(resp.status_code, 401)
        # event location will not be created and update without providing valid token
        url = '/api/locations/'
        resp = self.client.post(url, {'name': 'test location name', 'address': 'test location address'})
        self.assertEqual(resp.status_code, 401)
        event_location_instance = self.create_event_location()
        url = '/api/locations/' + str(event_location_instance.id) + '/'
        data = json.dumps({'name': 'update location name'})
        resp = self.client.patch(
            url, data, content_type='application/json')
        self.assertEqual(resp.status_code, 401)
        # event sponser will not be created and update without providing valid token
        url = '/api/sponsers/'
        resp = self.client.post(url, {'name': 'test event sponser name'})
        self.assertEqual(resp.status_code, 401)
        event_sponser_instance = self.create_event_location()
        url = '/api/sponsers/' + str(event_sponser_instance.id) + '/'
        data = json.dumps({'name': 'update event sponser name'})
        resp = self.client.patch(
            url, data, content_type='application/json')
        self.assertEqual(resp.status_code, 401)
        # attendee will not be added to the event without providing valid token
        url = '/api/events/' + str(event_instance.id) + '/attendee/'
        resp = self.client.post(url, {})
        self.assertEqual(resp.status_code, 401)
