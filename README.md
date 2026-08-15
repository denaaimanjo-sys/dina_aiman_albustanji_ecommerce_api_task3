# E-Commerce REST API - Web Security Fundamentals

## Student Information

- Student Name: Dina Aiman Albustanji
- Student ID: 120232211004

## Project Description

This project is a secured REST API for an e-commerce system developed using Node.js, Express.js, and Neon PostgreSQL.

The API manages products, categories, and users and includes authentication, authorization, validation, password hashing, security headers, CORS restrictions, rate limiting, centralized error handling, IDOR protection, and security event logging.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Neon PostgreSQL
- Postman
- pg
- dotenv
- bcrypt
- jsonwebtoken
- express-validator
- helmet
- cors
- express-rate-limit
- nodemon

## Project Structure

```text
src/
├── config/
│   └── database.js
├── controllers/
│   ├── authController.js
│   ├── productsController.js
│   ├── categoriesController.js
│   └── usersController.js
├── middleware/
│   ├── authenticate.js
│   ├── authorize.js
│   ├── authorizeUserAccess.js
│   ├── errorHandler.js
│   ├── rateLimiter.js
│   ├── securityLogger.js
│   └── validate.js
├── routes/
│   ├── authRoutes.js
│   ├── productsRoutes.js
│   ├── categoriesRoutes.js
│   └── usersRoutes.js
├── validators/
│   ├── authValidator.js
│   ├── productsValidator.js
│   ├── categoriesValidator.js
│   └── usersValidator.js
├── app.js
└── server.js
```

## Installation

Install the project dependencies:

```bash
npm install
```

On Windows PowerShell, if npm scripts are blocked, use:

```bash
npm.cmd install
```

## Environment Variables

Create a `.env` file in the project root.

Required variables:

```env
PORT=3000
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=1h
```

Real secrets must be stored only in `.env`.

The `.env` file is excluded from Git using `.gitignore`.

A safe template is provided in:

```text
.env.example
```

Do not commit database credentials, JWT secrets, passwords, or tokens to GitHub.

## Running the Project

Run normally:

```bash
npm start
```

On Windows PowerShell:

```bash
npm.cmd start
```

The server runs at:

```text
http://localhost:3000
```

## Authentication Endpoints

### Register

```text
POST /api/auth/register
```

Creates a new customer account.

Passwords are hashed using bcrypt before being stored in the database.

### Login

```text
POST /api/auth/login
```

Valid credentials return a JWT access token.

Invalid credentials return:

```text
401 Unauthorized
```

### Current User

```text
GET /api/auth/me
```

Requires a valid Bearer token.

The response does not expose `password_hash`.

## Products Endpoints

Public:

```text
GET /api/products
GET /api/products/:id
```

Admin only:

```text
POST /api/products
PUT /api/products/:id
PATCH /api/products/:id/deactivate
DELETE /api/products/:id
```

## Categories Endpoints

Public:

```text
GET /api/categories
GET /api/categories/:id
```

Admin only:

```text
POST /api/categories
PUT /api/categories/:id
DELETE /api/categories/:id
```

## Users Endpoints

Admin only:

```text
GET /api/users
POST /api/users
PATCH /api/users/:id/status
```

User ownership protection:

```text
GET /api/users/:id
```

A customer can access only their own user record.

An administrator can access other users.

Unauthorized ownership access returns:

```text
403 Forbidden
```

## Authentication and Authorization

JWT authentication is implemented using `jsonwebtoken`.

Protected routes require:

```text
Authorization: Bearer <token>
```

Two roles are supported:

- `customer`
- `admin`

Administrative operations are protected using role-based authorization middleware.

## Password Security

Passwords are never stored in plain text.

The application uses bcrypt with a cost factor of 12:

```text
bcrypt.hash()
bcrypt.compare()
```

The API never returns `password_hash` in normal user responses.

## Input Validation

Input validation is implemented using `express-validator`.

Validation includes:

- Required fields
- Valid email format
- Password length
- Positive IDs
- Positive product prices
- Non-negative stock quantities
- Allowed user roles
- Boolean status fields
- Maximum text lengths
- Required product and category data

Invalid input returns:

```text
400 Bad Request
```

## SQL Injection Protection

SQL queries that receive external values use PostgreSQL parameterized queries.

Example:

```text
SELECT * FROM products WHERE id = $1
```

Values are passed separately from the SQL statement.

This prevents user input from being directly concatenated into SQL queries.

## IDOR Protection

User-specific resources are protected using authenticated user IDs and role checks.

A customer cannot access another customer's user record by changing the ID in the URL.

Unauthorized access returns:

```text
403 Forbidden
```

## Security Headers

Helmet middleware is enabled globally.

Security headers include protections such as:

- Content Security Policy
- Strict Transport Security
- X-Content-Type-Options
- X-Frame-Options

## CORS Protection

CORS is restricted to the authorized local frontend origin:

```text
http://localhost:5173
```

Allowed methods:

```text
GET
POST
PUT
PATCH
DELETE
```

Allowed request headers:

```text
Content-Type
Authorization
```

Requests from another browser origin are not granted a matching `Access-Control-Allow-Origin` permission.

## Rate Limiting

A general rate limiter protects API routes.

General API limit:

```text
100 requests per 15 minutes
```

The login endpoint has a stricter limit:

```text
5 requests per 15 minutes
```

Exceeding the login limit returns:

```text
429 Too Many Requests
```

## Centralized Error Handling

The API uses centralized `notFound` and `errorHandler` middleware.

Unknown routes return:

```text
404 Not Found
```

Invalid JSON returns:

```text
400 Bad Request
```

Unexpected server errors return a generic response:

```text
500 Internal Server Error
```

Stack traces, database credentials, and internal error details are not returned to API clients.

## XSS Handling

The API does not render user input as HTML.

Data is returned as JSON, and Helmet provides additional browser security headers.

Any frontend consuming the API should safely encode user-controlled values when rendering them into HTML.

## Security Logging

The application records security-related events such as:

- Failed login attempts
- Invalid tokens
- Authentication failures
- Authorization failures
- Administrative actions

Security logs do not include passwords, JWT tokens, or database connection strings.

## HTTP Status Codes

- `200 OK` - Request completed successfully
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Missing or invalid authentication
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Route or resource not found
- `409 Conflict` - Duplicate resource
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Unexpected server error

## Security Testing

The API was tested using Postman for the required security scenarios, including:

1. Valid registration
2. Duplicate email
3. Successful login
4. Wrong password
5. Protected route without token
6. Invalid token
7. Customer attempting an admin action
8. Admin creating a product
9. Negative product price
10. Invalid email
11. IDOR access attempt
12. Login rate limiting
13. Unknown endpoint
14. Password hash exposure check
15. Helmet security headers

Additional tests were performed for:

- Allowed CORS origin
- Unauthorized CORS origin
- Security event logging

## Postman Collection

The exported Postman Collection is stored inside:

```text
postman/
```

## Screenshots

Security testing screenshots are stored inside:

```text
screenshots/task 3/
```

The screenshots document the request, status code, response, security headers, CORS behavior, rate limiting, authorization, IDOR protection, and security logging.

## Security Review

The security review is available in:

```text
SECURITY_REVIEW.md
```

It documents the identified risks, severity, remediation, and final status.

## Important Security Notes

- `.env` must never be committed.
- Database credentials must never appear in source code.
- JWT secrets must remain private.
- Passwords must never be logged.
- JWT tokens must never be included in security logs.
- SQL queries must use parameterized values.