
# Build the frontend
FROM node:8.9.11
WORKDIR /client
COPY ./client/package.json package.json
COPY ./client/package-lock.json package-lock.json
RUN npm install
COPY ./client/public ./public
COPY ./client/src ./src
RUN npm run build

# Build the backend + plug in the dist
FROM python:3.6-slim
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/
COPY --from=0 /client/build /code/frontend
EXPOSE 8000
RUN python3 manage.py collectstatic && \
    python3 manage.py makemigrations && \
    python3 manage.py migrate
CMD python3 manage.py runserver 0.0.0.0:8000
