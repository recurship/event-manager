## event-manager
=====================
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9f29bf9dc6dc4bb498b7ff21aca4a267)](https://www.codacy.com/app/mashhoodr/event-manager?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=recurship/event-manager&amp;utm_campaign=Badge_Grade)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This is a simple event manager app - built to learn Django REST and React.

### Setup

To run the backend simply have Docker installed on your machine and run `make up`

If you are running the first time you will need to run `make migrate && make loaddata` to run the migrations and load sample data

To run the frontend you can use:
- cd client
- npm install
- npm start

We will later move this into its own docker image.


### Scope

The scope of the application is very simple. We are looking to create a simple event management application, where our
local community leaders can manage their events, and notify anybody subscribed to an event or organisation with updates.
We will maintain tickets as issues

### Commit Message Format

We will need to do `npm run commit` and then will get the prompts needed to start a commit!

[![Add and commit with Commitizen](https://github.com/commitizen/cz-cli/raw/master/meta/screenshots/add-commit.png)](https://github.com/commitizen/cz-cli/raw/master/meta/screenshots/add-commit.png)


### Format Staging Files Code On Commit

```bash
Extend your vscode user settings with following settings to auto format code on save file.

{
"editor.formatOnSave": true,
"[javascript]": {
"editor.formatOnSave": false,
"eslint.autoFixOnSave": true,
"editor.tabSize": 2,
"editor.insertSpaces": false,
"editor.detectIndentation": false
},
"prettier.disableLanguages": [
"js"
],
"eslint.autoFixOnSave": true,
"eslint.alwaysShowStatus": true,
"editor.tabSize": 2
}
```


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
- https://www.youtube.com/watch?v=w0xgJ5C9Be8
- http://blog.kevinastone.com/getting-started-with-django-rest-framework-and-angularjs.html
- https://www.youtube.com/channel/UC-QDfvrRIDB6F0bIO4I4HkQ/videos
- https://teamtreehouse.com/library/django-rest-framework
- https://www.udemy.com/django-python/
- https://godjango.com/41-start-your-api-django-rest-framework-part-1/
- https://www.digitalocean.com/community/tutorials/how-to-scale-django-beyond-the-basics
- https://simpleisbetterthancomplex.com/tutorial/2018/02/03/how-to-use-restful-apis-with-django.html
- https://thinkster.io/topics/django
- https://realpython.com/django-rest-framework-quick-start/
- https://www.andreagrandi.it/2016/09/28/creating-production-ready-api-python-django-rest-framework-part-1/
- https://github.com/Brobin/drf-generators


#### React

- https://www.youtube.com/watch?v=MhkGQAoc7bc&list=PLoYCgNOIyGABj2GQSlDRjgvXtqfDxKm5b
- https://egghead.io/courses/the-beginner-s-guide-to-react
- https://egghead.io/courses/getting-started-with-redux
- https://redux.js.org/basics/usage-with-react
- https://github.com/enaqx/awesome-react
- https://www.udemy.com/react-redux-tutorial/
- https://learnreact.com/lessons/2018-the-context-api-overview
- https://www.educative.io/collection/5687753853370368/5707702298738688
- https://github.com/markerikson/react-redux-links
- https://camjackson.net/post/9-things-every-reactjs-beginner-should-know
- https://engineering.siftscience.com/best-practices-for-building-large-react-applications/
- https://www.youtube.com/watch?v=PF0Vi-iIyoo&index=28&t=0s&list=PLb0IAmt7-GS3fZ46IGFirdqKTIxlws7e0
- https://tylermcginnis.com/courses/react-fundamentals-udacity/
- https://www.youtube.com/watch?v=SuzutbwjUp8
- https://courses.totalreact.com/courses/250055/lectures/3897343
- https://github.com/kentcdodds/ama
- https://frontendmasters.com/courses/testing-react/
