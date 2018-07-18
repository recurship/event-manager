# from django.test import TestCase
from django.test import TestCase
from user.models import User
from django.urls import reverse, reverse_lazy
import json
from event_manager.utils import TEST_USER_CREDENTIALS as test_user

# Create your tests here.


class UserModelTest(TestCase):
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
        # This str function will going to call the __str__() method defined in User model
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