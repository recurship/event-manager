## docker-django-base
=====================

This repo can be used to setup a Django project locally on your machine.

You can clone this repo, and if you have docker installed you just need to run

```
docker-compose run web django-admin.py startproject composeexample .

```

This will create the DJango project for you.

Running `docker-compose up` after this will start the project.

You can connect to your docker instance by looking up the container id using `docker ps` and then `docker exec -it <ID> sh`

This will allow you to run migrations eg. `python3 manage.py migrate`

Added support for Postgres DB as well. The follwing config can be used on the new project to get the connection rolling:

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'mydb',
        'USER': 'postgres',
        'PASSWORD': '123456',
        'HOST': 'postgres',
        'PORT': '5432',
    }
}
```


==================

Alternatively you can also use the cookie clutter project to get a Dockerized Django API ready to role:
```
http://agconti.github.io/cookiecutter-django-rest/
```
