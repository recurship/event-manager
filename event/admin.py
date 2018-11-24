from django.contrib import admin
from django.contrib.postgres import fields
from django_json_widget.widgets import JSONEditorWidget

from event.forms.FormAdminForm import FormAdminForm
from event.models import Event, EventLocation, EventSponser, EventComment, EventTag, FormType, Form, Submission

from organisation.models import Organisation

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    exclude = ['comments']

    def get_queryset(self, request):
        if request.user.is_superuser:
            return Event.objects.all()
        org = Organisation.objects.filter(owner=request.user)
        return Event.objects.filter(organisation__in=org)

    # pylint: disable=W0222
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        # when we are creating or editing new event and the logged in user is not superuser
        # so we need to fetch only those organisations which owner is request.user
        if db_field.name == "organisation" and not request.user.is_superuser:
            org = Organisation.objects.filter(owner=request.user)
            kwargs["queryset"] = Organisation.objects.filter(id__in=org)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


@admin.register(Form)
class FormAdmin(admin.ModelAdmin):
    form = FormAdminForm
    list_display = ('id', 'type', 'event',)
    formfield_overrides = {
        fields.JSONField: {'widget': JSONEditorWidget}
    }

admin.site.register(EventLocation)
admin.site.register(EventSponser)
admin.site.register(EventComment)
admin.site.register(EventTag)
admin.site.register(FormType)
admin.site.register(Submission)
