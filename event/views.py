from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Event, EventLocation, EventSponser, EventTag, EventComment, Submission, Form
from .serializers import EventSerializer, EventCreateSerializer, EventLocationSerializer, EventSponserSerializer, \
    EventTagSerializer, EventUserAddSerializer, EventCommentSerializer, EventCommentAddSerializer, SubmissionSerializer,\
    FormSerializer
from rest_framework.response import Response
from django.db.models import Q
from datetime import datetime
from django.utils import timezone
from rest_framework_extensions.mixins import NestedViewSetMixin


class EventView(viewsets.ModelViewSet):

    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return EventCreateSerializer
        return EventSerializer

    # The following method will only gets called when we hit /events/ on GET request
    # It wil apply filter if we provide any filters in query params if not then all events will be returned
    @classmethod
    def list(self, request):
        filter_date_from = request.GET.get('filter_date_from', '')
        filter_date_to = request.GET.get('filter_date_to', '')
        filter_organisation = request.GET.get('filter_organisation', '')
        filter_location = request.GET.get('filter_location', '')
        filter_keywords = request.GET.get('filter_keywords', '')
        filter_sponsers = request.GET.get('filter_sponsers', '')
        filter_tags = request.GET.get('filter_tags', '')
        # if no value provided for sort then it will be set to startdate as default
        sort_by = request.GET.get('sort_by', 'start_datetime')
        filter_data = {}
        if filter_date_from:
            filter_data['start_datetime__gte'] = datetime.strptime(
                filter_date_from, "%Y-%m-%d")
        if filter_date_to:
            filter_data['end_datetime__lte'] = datetime.strptime(
                filter_date_to + 'T23:59:59Z', "%Y-%m-%dT%H:%M:%SZ")
        if filter_organisation:
            filter_data['organisation__in'] = filter_organisation.split(',')
        if filter_location:
            filter_data['location__in'] = filter_location.split(',')
        if filter_sponsers:
            filter_data['sponsers__in'] = filter_sponsers.split(',')
        if filter_tags:
            filter_data['tags__in'] = filter_tags.split(',')
        queryset = Event.objects.filter(
            Q(title__contains=filter_keywords) |
            Q(description__contains=filter_keywords)).filter(**filter_data).order_by(sort_by)
        serialized_data = EventSerializer(queryset, many=True)
        return Response(serialized_data.data)


class EventLocationView(viewsets.ModelViewSet):

    queryset = EventLocation.objects.all()
    serializer_class = EventLocationSerializer


class EventSponserView(viewsets.ModelViewSet):

    queryset = EventSponser.objects.all()
    serializer_class = EventSponserSerializer


class EventTagView(viewsets.ModelViewSet):

    queryset = EventTag.objects.all()
    serializer_class = EventTagSerializer


class EventUserAddAPIView(UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = EventUserAddSerializer

    def post(self, request, eventid, *args, **kwargs):
        serializer_data = { 'userid': request.user.id, 'eventid': eventid}
        serializer = self.serializer_class(
            request.user, data=serializer_data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        data = serializer.save()
        serialized_data = EventSerializer(data)

        return Response(serialized_data.data, status=status.HTTP_200_OK)


class EventCommentView(viewsets.ModelViewSet):
    queryset = EventComment.objects.all()
    serializer_class = EventCommentSerializer


class EventCommentAddAPIView(UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = EventCommentAddSerializer

    def post(self, request, eventid, *args, **kwargs):
        data = EventComment.objects.create(comment=request.data['comment'], commented_by=request.user, comment_datetime=timezone.now())
        serializer_data = { 'commentid': data.id, 'eventid': eventid}
        serializer = self.serializer_class(
            request.user, data=serializer_data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        data = serializer.save()
        serialized_data = EventSerializer(data)

        return Response(serialized_data.data, status=status.HTTP_200_OK)


class SubmissionViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = SubmissionSerializer

    def get_queryset(self):
        queryset = Submission.objects.filter(user=self.request.user)
        return self.filter_queryset_by_parents_lookups(queryset)

    def create(self, request, *args, **kwargs):
        data = request.data
        data['form'] = self.kwargs.get('parent_lookup_form')
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=self.request.user)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class FormViewSet(NestedViewSetMixin, viewsets.ReadOnlyModelViewSet):
    serializer_class = FormSerializer
    queryset = Form.objects.all()
