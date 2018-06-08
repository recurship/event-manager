.PHONY: up

APPS = event_manager organisation event

up:
        docker-compose up

upnew:
        docker-compose up --build

migrate:
    docker-compose run web python manage.py makemigrations
    docker-compose run web python manage.py migrate

shell:
    docker-compose run web python manage.py shell
