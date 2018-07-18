# from django.test import TestCase
from django.test import TestCase
from user.models import User
from django.urls import reverse, reverse_lazy
import json
from event_manager.utils import TEST_USER_CREDENTIALS as test_user
from django.forms.models import model_to_dict

MODEL_FIELDS = ['id', 'username', 'email', 'enable_notifications', 'first_name', 'last_name']

# Create your tests here.


class UserViewTest(TestCase):
    @classmethod
    def create_user(cls, username=test_user['username'],
                    email=test_user['email'], first_name='event',
                    password=test_user['password'], last_name='manager'):
        user = User.objects.create(
            username=username, email=email, first_name=first_name, last_name=last_name)
        user.set_password(password)
        user.save()
        return user

    def test_user_list_view(self):
        a = self.create_user()
        url = reverse_lazy('user-list')
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, 200)
        json_resp = json.loads(resp.content)['results'].pop()
        self.assertDictContainsSubset(model_to_dict(a, MODEL_FIELDS), json_resp, 'it should list all users')

    def test_user_detail_view(self):
        a = self.create_user()
        url = reverse('user-detail', args=[a.id])
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, 200)
        json_resp = json.loads(resp.content)
        self.assertDictContainsSubset(model_to_dict(a, MODEL_FIELDS), json_resp, 'it should give detail for the user asked with id')

    def test_user_login(self):
        self.create_user()
        login_resp = self.client.post(
            '/api/token', {'username': test_user['username'], 'password': test_user['password']})
        self.assertEqual(login_resp.status_code, 200, 'it should login')

    def test_loggedin_user_detail_view_without_token(self):
        resp = self.client.get('/api/user/')
        self.assertEqual(resp.status_code, 401, 'it should not give any detail of user')

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
        self.assertDictContainsSubset(model_to_dict(a, MODEL_FIELDS), json_resp, 'it should give detail for logged in user')

    def test_user_register_view(self):
        a = self.create_user()
        resp = self.client.post('/api/register/',
                                {'username': 'admin', 'password': '12345678', 'email': 'admin@test.com'})
        json_resp = json.loads(resp.content)
        self.assertEqual(resp.status_code, 201)
        self.assertNotEqual(str(a.id), json_resp['id'], 'it should register new user')

    def test_user_update_view_without_token(self):
        a = self.create_user()
        data = json.dumps({'first_name': 'update first name'})
        resp = self.client.patch(
            '/api/user/', data, content_type='application/json')
        # 401 status code will be sent by the backend for unauthorized requests
        self.assertEqual(resp.status_code, 401, 'it should not allow user to update its content without token')

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
        self.assertNotEqual(a.first_name, user_json_resp['first_name'], 'it should change user firstname')

    def test_user_reset_password_view(self):
        a = self.create_user()
        resp = self.client.post('/api/reset-password/',
                                {'email': a.email})
        self.assertEqual(resp.status_code, 200, 'it should sent reset password link to user email')

    def test_user_reset_password_confirm_view(self):
        a = self.create_user()
        resp_email = self.client.post('/api/reset-password/',
                                {'email': a.email})
        self.assertEqual(resp_email.status_code, 200, 'it should sent reset password link to user email')
        user = User.objects.get(email=a.email)
        resp_reset_password = self.client.post('/api/reset-password-confirm/',
                                {'email': a.email, 'token': str(user.token), 'password': 'new password'})
        self.assertEqual(resp_reset_password.status_code, 200)
        login_resp_old_password = self.client.post(
            '/api/token', {'username': test_user['username'], 'password': test_user['password']})
        self.assertEqual(login_resp_old_password.status_code, 400, 'it should not allow user to login with the old password')
        login_resp_new_password = self.client.post(
            '/api/token', {'username': test_user['username'], 'password': 'new password'})
        self.assertEqual(login_resp_new_password.status_code, 200, 'it should allow user to log in with new password')
