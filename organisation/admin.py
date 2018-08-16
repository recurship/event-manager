from django.contrib import admin

# Register your models here.
from organisation.models import Organisation
from user.models import User


class OrganisationAdmin(admin.ModelAdmin):

    def get_queryset(self, request):
        if request.user.is_superuser:
            return Organisation.objects.all()
        return Organisation.objects.filter(owner=request.user)

    # pylint: disable=W0222
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        # when we are creating or editing new event and the logged in user is not superuser
        # so we need to fetch only those organisations which owner is request.user
        if db_field.name == "owner" and not request.user.is_superuser:
            kwargs["queryset"] = User.objects.filter(id=request.user.id)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


admin.site.register(Organisation, OrganisationAdmin)