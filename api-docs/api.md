### Authentication

#### `/api/token/`

##### `POST`
This api is used for logging in user


# Request
{
    "username": string,
    "password": string,
}
#### `/api/register/`

##### `POST`
This api is used for creating user


# Request
{
    "username": string,
    "password": string,
    "email": string
}
#### `/api/reset-password/`

##### `POST`
This api is used for sending user an email for reset password


# Request
{
    "email": string
}
#### `/api/reset-password-confirm/`

##### `POST`
This api is used for sending user new password after recieving and email for reset password


# Request
{
    "email": string
    "token": string
    "password": string
}

### Users

#### `/api/users/`

##### `GET`
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
#### `/api/user/`

#### `HEADER`: `Bearer <Token>`
##### `GET`
To list loggedin user
##### `POST`
To update loggedin user

# Request
{
    "username": string,
    "password": string,
    "is_active": Boolean,
    "first_name": string,
    "last_name": string,
    "enable_notifications": Boolean,
    "is_staff": Boolean,
    "email": string
}

### Organisations

#### `/api/organisations/`
#### `HEADER`: `Bearer <Token>`
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
#### `HEADER`: `Bearer <Token>`
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

