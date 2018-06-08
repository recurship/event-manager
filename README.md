## event-manager
=====================

This is a simple event manager app - built to learn Django REST and React. 


### Setup

To run the backend simply have Docker installed on your machine and run `make up`

If you are running the first time you will need to run `make migrate` to run the migrations

To run the frontend you can use:
- cd client
- npm install
- npm start

We will later move this into its own docker image.


### Scope

The scope of the application is very simple. We are looking to create a simple event management application, where our 
local community leaders can manage their events, and notify anybody subscribed to an event or organisation with updates.
We will maintain tickets as issues


### Resources

Since we are all learning - it will be best to have a single place to document all the resources. I will add the initial 
ones here, but we should update them as we learn new things and find additional resources.

#### Django

So a few things to know before diving in - we are mostly focused on Django REST API - not the standard Django framework 
which normally does server side rendering. So the focus of learning should be how to create the models, and their 
relationships. After that is all the API stuff like serialization, views, urls, authentication, permissions and migrations.

Another thing to note here is that many articles and tutorials are seriously dated, the video below is the only resource
I have found which is using the latest ViewSets available. Im not sure of the backward compatibility as yet so dont know
how well the old code works. This is Django2 with Django REST framework 3.8 and Python 3.6.
  
- http://www.django-rest-framework.org/tutorial/quickstart/
- https://www.youtube.com/channel/UC-QDfvrRIDB6F0bIO4I4HkQ/videos
- https://www.udemy.com/django-python/
- https://godjango.com/41-start-your-api-django-rest-framework-part-1/

#### React

- https://www.youtube.com/watch?v=MhkGQAoc7bc&list=PLoYCgNOIyGABj2GQSlDRjgvXtqfDxKm5b
- https://egghead.io/courses/the-beginner-s-guide-to-react
- https://egghead.io/courses/getting-started-with-redux
- https://github.com/enaqx/awesome-react