import os

from datetime import datetime, timedelta
import jwt
from event_manager.settings import SIMPLE_JWT


def generate_jwt_token(self, days=1):
    dt = datetime.now() + timedelta(days=days)
    token = jwt.encode({
        'exp': int(dt.strftime('%s')),
    }, SIMPLE_JWT['SIGNING_KEY'], algorithm='HS256')
    return token.decode('utf-8')


def get_help_schema():
    root = os.getcwd()
    path = os.path.join(root, 'event/schemas/form.fields.json')
    with open(path, 'r') as file:
        return str(file.read())