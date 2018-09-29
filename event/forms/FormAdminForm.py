from django import forms
from django_json_widget.widgets import JSONEditorWidget
from event_manager.utils import get_help_schema


class FormAdminForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(FormAdminForm, self).__init__(*args, **kwargs)
        self.fields['fields'].widget = JSONEditorWidget()

    class Meta:
        help_texts = {
            'fields': get_help_schema(),
        }
