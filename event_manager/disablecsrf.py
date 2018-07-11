from django.utils.deprecation import MiddlewareMixin

# Disabling CSRF Token Authentication
class DisableCSRF(MiddlewareMixin):
    def process_request(self, request):
        setattr(request, '_dont_enforce_csrf_checks', True)