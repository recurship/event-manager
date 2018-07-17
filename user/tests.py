# from django.test import TestCase
from django.test import TestCase
from user.models import User
from django.urls import reverse, reverse_lazy
import json
from event_manager.utils import TEST_USER_CREDENTIALS as test_user

# Create your tests here.


class UserTest(TestCase):
    @classmethod
    def create_user(cls, username=test_user['username'],
                    email=test_user['email'], first_name='event',
                    password=test_user['password'], last_name='manager'):
        user = User.objects.create(
            username=username, email=email, first_name=first_name, last_name=last_name)
        user.set_password(password)
        user.save()
        return user

    def test_user_creation(self):
        a = self.create_user()
        self.assertTrue(isinstance(a, User))

    def test_user_email(self):
        a = self.create_user()
        self.assertEqual(str(a), a.email)
        self.assertNotEqual(str(a), 'email@email.com')

    def test_user_fullname(self):
        a = self.create_user()
        self.assertEqual(a.get_full_name(), a.first_name + a.last_name)
        self.assertNotEqual(a.get_full_name(),
                            'invalid user first and last name')

    def test_user_shortname(self):
        a = self.create_user()
        self.assertEqual(a.get_short_name(), a.first_name)
        self.assertNotEqual(a.get_short_name(), 'invalid user first name')

    def test_user_username(self):
        a = self.create_user()
        user = User(username=a.username)
        self.assertEqual(a.username, user.username)
        self.assertNotEqual(a.username, 'unmatched username')

    def test_user_list_view(self):
        a = self.create_user()
        url = reverse_lazy('user-list')
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, 200)
        self.assertIn(a.username, resp.content.decode('utf_8'))
        self.assertIn(a.email, resp.content.decode('utf_8'))

    def test_user_detail_view(self):
        a = self.create_user()
        url = reverse('user-detail', args=[a.id])
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, 200)
        json_resp = json.loads(resp.content)
        self.assertEqual(str(a.id), json_resp['id'])
        self.assertEqual(a.username, json_resp['username'])

    def test_user_login(self):
        self.create_user()
        login_resp = self.client.post(
            '/api/token', {'username': test_user['username'], 'password': test_user['password']})
        self.assertEqual(login_resp.status_code, 200)

    def test_loggedin_user_detail_view_without_token(self):
        resp = self.client.get('/api/user/')
        self.assertEqual(resp.status_code, 401)

    def test_loggedin_user_detail_view(self):
        a = self.create_user()
        login_resp = self.client.post(
            '/api/token', {'username': test_user['username'], 'password': test_user['password']})
        login_json_resp = json.loads(login_resp.content)
        token = login_json_resp['access']
        resp = self.client.get(
            '/api/user/', HTTP_AUTHORIZATION='Bearer ' + token)
        self.assertEqual(resp.status_code, 200)
        json_resp = json.loads(resp.content)
        self.assertEqual(str(a.id), json_resp['id'])
        self.assertEqual(a.username, json_resp['username'])

    def test_user_register_view(self):
        a = self.create_user()
        resp = self.client.post('/api/register/',
                                {'username': 'admin', 'password': '12345678', 'email': 'admin@test.com'})
        json_resp = json.loads(resp.content)
        self.assertEqual(resp.status_code, 201)
        self.assertNotEqual(str(a.id), json_resp['id'])

    def test_user_update_view_without_token(self):
        a = self.create_user()
        data = json.dumps({'first_name': 'update first name'})
        resp = self.client.patch(
            '/api/user/', data, content_type='application/json')
        # 401 status code will be sent by the backend for unauthorized requests
        self.assertEqual(resp.status_code, 401)

    def test_user_update_view_with_token(self):
        a = self.create_user()
        login_resp = self.client.post(
            '/api/token', {'username': test_user['username'], 'password': test_user['password']})
        self.assertEqual(login_resp.status_code, 200)
        login_json_resp = json.loads(login_resp.content)
        token = login_json_resp['access']
        data = json.dumps({'first_name': 'update first name'})
        user_resp = self.client.patch('/api/user/', data,
                                      content_type='application/json', HTTP_AUTHORIZATION='Bearer ' + token)
        self.assertEqual(user_resp.status_code, 200)
        user_json_resp = json.loads(user_resp.content)
        # Now the user first name is updated so it will not match with the previously created user first name
        self.assertNotEqual(a.first_name, user_json_resp['first_name'])
