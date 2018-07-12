"""event_manager URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from organisation.views import OrganisationView
from event.views import EventView
from user.views import UserView, RegistrationAPIView, UserRetrieveUpdateAPIView, ResetPasswordAPIView
from django.conf import settings
from django.conf.urls.static import static


router = DefaultRouter()
router.register('users', UserView)
router.register('organisations', OrganisationView)
router.register('events', EventView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/register/', RegistrationAPIView.as_view()),
    path('api/user/', UserRetrieveUpdateAPIView.as_view()),
    path('api/reset-password/', ResetPasswordAPIView.as_view()),
    path('api/token', TokenObtainPairView.as_view()),
    path('api/token/refresh', TokenRefreshView.as_view()),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path('.*',
                        TemplateView.as_view(template_name='index.html'))]
