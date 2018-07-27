# from django.test import TestCase
from django.test import TestCase
from organisation.models import Organisation
from user.models import User
from django.urls import reverse, reverse_lazy
import json
from .tests_config import TEST_USER_CREDENTIALS as test_user
from django.forms.models import model_to_dict

MODEL_FIELDS = ['id', 'is_active', 'name']

# Create your tests here.


class OrganisationViewTest(TestCase):
    @classmethod
    def create_organisation(cls, name='test organisation'):
        usr = User.objects.create(
            username=test_user['username'], email=test_user['email'])
        usr.set_password(test_user['password'])
        usr.save()
        return Organisation.objects.create(name=name, owner=usr)

    def test_organisation_list_view(self):
        organisation_instance =  self.create_organisation()
        url = reverse_lazy('organisation-list')
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, 200)
        json_resp = json.loads(resp.content)['results'].pop()
        self.assertDictContainsSubset(model_to_dict(organisation_instance, MODEL_FIELDS), json_resp, 'it should list all organisations')

    def test_organisation_detail_view(self):
        organisation_instance =  self.create_organisation()
        url = reverse('organisation-detail', args=[organisation_instance.id])
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, 200)
        json_resp = json.loads(resp.content)
        self.assertDictContainsSubset(model_to_dict(organisation_instance, MODEL_FIELDS), json_resp, 'it should provide detail of organisation with id')
        # check events array should be added organisations/<id> response to get all respective events for organisation
        self.assertTrue('events' in json_resp)

    def test_organisation_create_view_with_token(self):
        organisation_instance =  self.create_organisation()
        login_resp = self.client.post(
            '/api/token', {'username': test_user['username'], 'password': test_user['password']})
        login_json_resp = json.loads(login_resp.content)
        self.assertEqual(login_resp.status_code, 200)
        url = reverse('organisation-list')
        token = login_json_resp['access']
        organisation_resp = self.client.post(url, {'name': 'new organisation', 'owner': organisation_instance.owner.id},
                                      HTTP_AUTHORIZATION='Bearer ' + token)
        self.assertEqual(organisation_resp.status_code, 201, 'it should create new organisation')

    def test_organisation_update_view_with_token(self):
        organisation_instance =  self.create_organisation()
        login_resp = self.client.post(
            '/api/token', {'username': test_user['username'], 'password': test_user['password']})
        login_json_resp = json.loads(login_resp.content)
        self.assertEqual(login_resp.status_code, 200)
        url = reverse('organisation-detail', args=[organisation_instance.id])
        token = login_json_resp['access']
        data = json.dumps({'name': 'update organisation name'})
        organisation_resp = self.client.patch(url, data,
                                       content_type='application/json', HTTP_AUTHORIZATION='Bearer ' + token)
        self.assertEqual(organisation_resp.status_code, 200)
        organisation_json_resp = json.loads(organisation_resp.content)
        # Now the organisation is updated so its name will not match with the previously created organisation name
        self.assertNotEqual(organisation_instance.name, organisation_json_resp['name'], 'it should update organisation')

    def test_organisation_permissions(self):
        # 401 status code will be sent by the backend for unauthorized requests
        organisation_instance =  self.create_organisation()
        url = reverse('organisation-list')
        resp = self.client.post(url, {'name': 'new organisation', 'owner': organisation_instance.owner})
        self.assertEqual(resp.status_code, 401, 'it should not create new organisation without token')
        url = reverse('organisation-detail', args=[organisation_instance.id])
        data = json.dumps({'name': 'update organisation name'})
        resp = self.client.patch(
            url, data, content_type='application/json')
        self.assertEqual(resp.status_code, 401, 'it should not edit organisation without token')