# User Registration API Documentation

## Endpoint

**POST** `/users/register`

---

## Description

Registers a new user by accepting their first name, last name, email, and password. Returns a JWT token and the created user object on success.

---

## Request Body

Send a JSON object in the following format:

```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "yourPassword123"
}

```

### Field Requirements

- `firstname` (string, required): Minimum 2 characters.
- `lastname` (string, required): Minimum 2 characters.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

---

## Responses

### Success Response

**Status:** `201 Created`

**Example:**
```json
{
  "token": "<jwt_token>",
  "user": {
    "_id": "60f7c2b5e1d2c80017e4a123",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketID": null
  }
}

```

---

### Error Response

**Status:** `400 Bad Request`

**Example:**
```json
{
  "errors": [
    {
      "msg": "First name must be at least 2 characters long",
      "param": "firstname",
      "location": "body"
    }
  ]
}

```

---

## Status Codes

- `201 Created` – User successfully registered.
- `400 Bad Request` – Invalid or missing input data.

---

## Notes

- Passwords are securely hashed before storage.
- The returned `token` is a JWT for authentication in future



### User Login

**POST** `/users/login`

Authenticates a user using their email and password. Returns a JWT token and the user object on success.

#### Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "yourPassword123"
}
```

**Field Requirements:**
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

#### Success Response

**Status:** `200 OK`

```json
{
  "token": "<jwt_token>",
  "user": {
    "_id": "60f7c2b5e1d2c80017e4a123",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketID": null
  }
}
```

#### Error Response

**Status:** `400 Bad Request` (Validation error)

```json
{
  "errors": [
    {
      "msg": "Please enter a valid email address",
      "param": "email",
      "location": "body"
    }
  ]
}
```

**Status:** `401 Unauthorized` (Invalid credentials)

```json
{
  "error": "Invalid email or password"
}
```

---

## Status Codes

- `201 Created` – User successfully registered.
- `200 OK` – User successfully logged in.
- `400 Bad Request` – Invalid or missing input data.
- `401 Unauthorized` – Invalid email or password.

---

## Notes

- Passwords are securely hashed before storage.
- The returned `token` is a JWT for authentication in future requests.


---

### Get User Profile

**GET** `/users/profile`

Returns the authenticated user's profile information. Requires a valid JWT token in the `Authorization` header or as a cookie.

#### Headers

```
Authorization: Bearer <jwt_token>
```

#### Success Response

**Status:** `200 OK`

```json
{
  "_id": "60f7c2b5e1d2c80017e4a123",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "socketID": null
}
```

#### Error Response

**Status:** `401 Unauthorized`

```json
{
  "message": "Unauthorized"
}
```

---

### Logout User

**GET** `/users/logout`

Logs out the authenticated user by blacklisting the JWT token. Requires a valid JWT token in the `Authorization` header or as a cookie.

#### Headers

```
Authorization: Bearer <jwt_token>
```

#### Success Response

**Status:** `200 OK`

```json
{
  "message": "Logout successful"
}
```

#### Error Response

**Status:** `401 Unauthorized`

```json
{
  "message": "Unauthorized"
}
```

---

## Status Codes

- `201 Created` – User successfully registered.
- `200 OK` – Request successful.
- `400 Bad Request` – Invalid or missing input data.
- `401 Unauthorized` – Invalid or missing authentication.

---

## Notes

- Passwords are securely hashed before storage.
- The returned `token` is a JWT for authentication in future requests.
- Protected endpoints require a valid JWT token.

---

# Captain Registration API Documentation

## Endpoint

**POST** `/captain/register`

---

## Description

Registers a new captain (driver) with their personal and vehicle details. Returns the created captain object on success.

---

## Request Body

Send a JSON object in the following format:

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "yourPassword123",
  "vehicle": {
    "vehicleType": "car",
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4
  }
}
```

### Field Requirements

- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, optional): Minimum 3 characters if provided.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.
- `vehicle.vehicleType` (string, required): Must be one of: `car`, `motorcycle`, `auto`.
- `vehicle.color` (string, required): Minimum 3 characters.
- `vehicle.plate` (string, required): Minimum 3 characters.
- `vehicle.capacity` (integer, required): Minimum value 1.

---

## Responses

### Success Response

**Status:** `201 Created`

**Example:**
```json
{
  "_id": "60f7c2b5e1d2c80017e4a456",
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "vehicle": {
    "vehicleType": "car",
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4
  }
}
```

---

### Error Response

**Status:** `400 Bad Request`

**Example:**
```json
{
  "errors": [
    {
      "msg": "Firstname must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

---

## Status Codes

- `201 Created` – Captain successfully registered.
- `400 Bad Request` – Invalid or missing input data.

---

## Notes

- Passwords are securely hashed before storage.
- All fields are required unless marked as optional.