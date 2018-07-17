# from django.test import TestCase
from django.test import TestCase
from event.models import Event
from organisation.models import Organisation
from user.models import User
from django.utils import timezone
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse, reverse_lazy
from event import views
import json
from event_manager.utils import TEST_USER_CREDENTIALS as test_user

# Create your tests here.


class OrganisationTest(TestCase):
    def create_organisation(self, name='test organisation'):
        usr = User.objects.create(
            username=test_user['username'], email=test_user['email'])
        usr.set_password(test_user['password'])
        usr.save()
        return Organisation.objects.create(name=name, owner=usr)

    def test_organisation_creation(self):
        a = self.create_organisation()
        self.assertTrue(isinstance(a, Organisation))

    def test_organisation_name(self):
        a = self.create_organisation()
        self.assertEqual(str(a), a.name)
        self.assertNotEqual(str(a), 'unmatched organisation name')

    def test_organisation_description(self):
        a = self.create_organisation()
        organisation = Organisation(owner=a.owner)
        self.assertEqual(a.owner, organisation.owner)
        self.assertNotEqual(a.owner, 'unmatched owner')

    def test_organisation_list_view(self):
        a = self.create_organisation()
        url = reverse_lazy('organisation-list')
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, 200)
        self.assertIn(a.name, resp.content.decode('utf_8'))

    def test_organisation_detail_view(self):
        a = self.create_organisation()
        url = reverse('organisation-detail', args=[a.id])
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, 200)
        json_resp = json.loads(resp.content)
        self.assertEqual(a.id, json_resp['id'])
        self.assertEqual(a.name, json_resp['name'])

    def test_organisation_create_view_without_token(self):
        a = self.create_organisation()
        url = reverse('organisation-list')
        resp = self.client.post(url, {'name': 'new organisation', 'owner': a.owner})
        # 401 status code will be sent by the backend for unauthorized requests
        self.assertEqual(resp.status_code, 401)

    def test_organisation_edit_view_without_token(self):
        a = self.create_organisation()
        url = reverse('organisation-detail', args=[a.id])
        data = json.dumps({'name': 'update organisation name'})
        resp = self.client.patch(
            url, data, content_type='application/json')
        # 401 status code will be sent by the backend for unauthorized requests
        self.assertEqual(resp.status_code, 401)

    def test_organisation_create_view_with_token(self):
        a = self.create_organisation()
        login_resp = self.client.post(
            '/api/token', {'username': test_user['username'], 'password': test_user['password']})
        login_json_resp = json.loads(login_resp.content)
        self.assertEqual(login_resp.status_code, 200)
        url = reverse('organisation-list')
        token = login_json_resp['access']
        organisation_resp = self.client.post(url, {'name': 'new organisation', 'owner': a.owner.id},
                                      HTTP_AUTHORIZATION='Bearer ' + token)
        self.assertEqual(organisation_resp.status_code, 201)

    def test_organisation_update_view_with_token(self):
        a = self.create_organisation()
        login_resp = self.client.post(
            '/api/token', {'username': test_user['username'], 'password': test_user['password']})
        login_json_resp = json.loads(login_resp.content)
        self.assertEqual(login_resp.status_code, 200)
        url = reverse('organisation-detail', args=[a.id])
        token = login_json_resp['access']
        data = json.dumps({'name': 'update organisation name'})
        organisation_resp = self.client.patch(url, data,
                                       content_type='application/json', HTTP_AUTHORIZATION='Bearer ' + token)
        self.assertEqual(organisation_resp.status_code, 200)
        organisation_json_resp = json.loads(organisation_resp.content)
        # Now the organisation is updated so its name will not match with the previously created organisation name
        self.assertNotEqual(a.name, organisation_json_resp['name'])