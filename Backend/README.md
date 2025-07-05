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