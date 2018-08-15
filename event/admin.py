from django.contrib import admin

from event.models import Event, EventLocation, EventSponser, EventComment, EventTag

admin.site.register(EventLocation)
admin.site.register(Event)
admin.site.register(EventSponser)
admin.site.register(EventComment)
admin.site.register(EventTag)
