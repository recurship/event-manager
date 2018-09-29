from django.contrib.postgres import forms
from .widgets import JSONSchemaWidget


class JSONSchemaField(forms.JSONField):
    def __init__(self, *args, **kwargs):
        self._schema_data = kwargs.pop('schema_data', None)
        kwargs['widget'] = JSONSchemaWidget(self._schema_data)
        super().__init__(*args, **kwargs)