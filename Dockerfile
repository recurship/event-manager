
# Build the frontend
FROM node:8.11.3-alpine
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
ENV DEBUG False
RUN mkdir /code
WORKDIR /code
RUN mkdir /media
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/
COPY --from=0 /client/build /code/frontend
RUN python3 manage.py collectstatic 
CMD python3 manage.py migrate && \
    python3 manage.py runserver 0.0.0.0:$PORT
