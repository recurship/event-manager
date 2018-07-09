from celery import Celery

app = Celery('tasks', broker='redis://redis:6379/2')

@app.task
def add(x, y):
    return x + y