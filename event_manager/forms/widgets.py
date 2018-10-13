import json

from django.forms.widgets import Textarea


class JSONSchemaWidget(Textarea):
    def __init__(self, schema_data, *args):
        self._schema_data = schema_data
        super().__init__(*args)

    def render(self, name, value, attrs=None):
        html = super().render(name, value, attrs)
        html += "<div>"\
            "<b>Schema: </b>"\
            "<pre>%s</pre></div>" % \
            json.dumps(self._schema_data,
                       indent=2, sort_keys=True)
        return html

    class Media:
        css = {
            'all': ('admin/core/css/jsonschema.css',)
        }
        js = ('admin/core/js/jsonschema_widget.js',)
