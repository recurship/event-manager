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

- http://www.django-rest-framework.org/tutorial/quickstart/
- https://www.youtube.com/channel/UC-QDfvrRIDB6F0bIO4I4HkQ/videos
- https://www.udemy.com/django-python/

#### React

- https://egghead.io/courses/the-beginner-s-guide-to-react
- https://egghead.io/courses/getting-started-with-redux