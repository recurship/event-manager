from django.contrib import admin

from event.models import Event, EventLocation, EventSponser, EventComment, EventTag

from organisation.models import Organisation

class EventAdmin(admin.ModelAdmin):

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

admin.site.register(Event, EventAdmin)
admin.site.register(EventLocation)
admin.site.register(EventSponser)
admin.site.register(EventComment)
admin.site.register(EventTag)