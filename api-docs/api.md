### Authentication

#### `/api/token/`

##### `POST`
This api is used for logging in user


# Request
{
    "username": string,
    "password": string,
}

### Users

#### `/api/users/`

##### `GET`
To create new user
##### `POST`
To list all users

# Request
{
    "username": string,
    "password": string,
    "is_active": Boolean,
    "first_name": string,
    "last_name": string,
    "enable_notifications": Boolean,
    "is_staff": Boolean
}

### Organisations

#### `/api/organisations/`
##### `GET`
##### `POST`

To list all organisations
To create new organisation

# Request
{
    "name": String
    "owner": String (User Id)
}

#### `/api/organisations/<organisation_id>`

##### `PATCH`
To update organisation

# Request
{
    "name": String
}
Just need to provide only those properties which needed to be updated

### Events

#### `/api/events/`
##### `GET`
##### `POST`

To list all organisations
To create new event

# Request
{
    "title": String,
    "description": String
    "start_datetime": String
    "end_datetime": String
    "organisation": Number (organisation Id)
}

#### `/api/events/<event_id>`

##### `PATCH`
To update event

# Request
{
    "title": String
}
Just need to provide only those properties which needed to be updated


##### Postman collection for these apis are in ./api-docs/postman-collection

