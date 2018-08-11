from django.contrib import admin

from event.models import Event, EventLocation, EventSponser, EventTag

admin.site.register(EventLocation)
admin.site.register(Event)
admin.site.register(EventSponser)
admin.site.register(EventTag)