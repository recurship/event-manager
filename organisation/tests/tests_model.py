# from django.test import TestCase
from django.test import TestCase
from organisation.models import Organisation
from user.models import User
from .tests_config import TEST_USER_CREDENTIALS as test_user

# Create your tests here.


class OrganisationModelTest(TestCase):
    @classmethod
    def create_organisation(cls, name='test organisation'):
        usr = User.objects.create(
            username=test_user['username'], email=test_user['email'])
        usr.set_password(test_user['password'])
        usr.save()
        return Organisation.objects.create(name=name, owner=usr)

    def test_organisation_creation(self):
        organisation_instance = self.create_organisation()
        self.assertTrue(isinstance(organisation_instance, Organisation))