import inspect
import json
import os.path

from django.core import exceptions
from django.contrib.postgres.fields import JSONField
from event_manager.forms.fields import JSONSchemaField as JSONSchemaFormField
from jsonschema import validate, exceptions as jsonschema_exceptions


class JSONSchemaField(JSONField):

    def __init__(self, *args, **kwargs):
        self.schema = kwargs.pop('schema', None)
        super().__init__(*args, **kwargs)

    @property
    def _schema_data(self):
        model_file = inspect.getfile(self.model)
        dirname = os.path.dirname(model_file)
        # schema file related to model.py path
        p = os.path.join(dirname, self.schema)
        with open(p, 'r') as file:
            return json.loads(file.read())

    def formfield(self, **kwargs):
        defaults = {
            'schema_data': self._schema_data,
            'form_class': JSONSchemaFormField
        }
        defaults.update(kwargs)
        return super().formfield(**defaults)

    def _validate_schema(self, value):
        """JSON schema validation."""

        # Disable schema validation in datamigrations
        # We can't get path to json schema via `inspect`
        if self.model.__module__ == '__fake__':
            return True
        try:
            status = validate(value, self._schema_data)
        except jsonschema_exceptions.ValidationError as e:
            raise exceptions.ValidationError(e.message)
        return status

    def validate(self, value, model_instance):
        # super().validate(value, model_instance)
        self._validate_schema(value)

    def pre_save(self, model_instance, add):
        value = super().pre_save(model_instance, add)
        if value and not self.null:
            self._validate_schema(value)
        return value

