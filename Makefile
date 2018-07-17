.PHONY: up

APPS = event_manager organisation event user
NEWAPP = new_app

up:
	docker-compose up

upnew:
	docker-compose up --build

test:
	docker-compose run web python manage.py test

migrate:
	docker-compose run web python manage.py makemigrations
	docker-compose run web python manage.py migrate

loaddata:
	docker-compose run web python manage.py loaddata db.json

dumpdata:
	docker-compose run web python manage.py dumpdata > db.json

shell:
	docker-compose run web python manage.py shell

superuser:
	docker-compose run web python manage.py createsuperuser

newapp:
	echo "Set $NEWAPP ENV as the name: make newapp NEWAPP=<NAME>"
	docker-compose run web python manage.py startapp $(NEWAPP)