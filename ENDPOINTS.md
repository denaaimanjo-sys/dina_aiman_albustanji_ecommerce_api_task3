# API Endpoints

## Base URL

```text
http://localhost:3000
```

## Products

### Get All Products

```http
GET /api/products
```

Expected status:

```text
200 OK
```

### Get Product by ID

```http
GET /api/products/:id
```

Expected statuses:

```text
200 OK
400 Bad Request
404 Not Found
```

### Create Product

```http
POST /api/products
```

Request body:

```json
{
  "category_id": 1,
  "name": "Laptop Stand",
  "description": "Adjustable laptop stand",
  "price": 49.99,
  "stock_quantity": 10,
  "sku": "PRODUCT-001"
}
```

Expected statuses:

```text
201 Created
400 Bad Request
409 Conflict
500 Internal Server Error
```

### Update Product

```http
PUT /api/products/:id
```

Request body:

```json
{
  "category_id": 1,
  "name": "Updated Laptop Stand",
  "description": "Updated adjustable laptop stand",
  "price": 55.99,
  "stock_quantity": 15,
  "sku": "PRODUCT-001",
  "is_active": true
}
```

Expected statuses:

```text
200 OK
400 Bad Request
404 Not Found
409 Conflict
500 Internal Server Error
```

### Deactivate Product

```http
PATCH /api/products/:id/deactivate
```

No request body is required.

Expected statuses:

```text
200 OK
400 Bad Request
404 Not Found
500 Internal Server Error
```

### Delete Product

```http
DELETE /api/products/:id
```

Expected statuses:

```text
200 OK
400 Bad Request
404 Not Found
409 Conflict
500 Internal Server Error
```

## Categories

### Get All Categories

```http
GET /api/categories
```

Expected status:

```text
200 OK
```

### Get Category by ID

```http
GET /api/categories/:id
```

Expected statuses:

```text
200 OK
400 Bad Request
404 Not Found
```

### Create Category

```http
POST /api/categories
```

Request body:

```json
{
  "name": "Electronics",
  "description": "Electronic products"
}
```

Expected statuses:

```text
201 Created
400 Bad Request
409 Conflict
500 Internal Server Error
```

### Update Category

```http
PUT /api/categories/:id
```

Request body:

```json
{
  "name": "Updated Electronics",
  "description": "Updated category description",
  "is_active": true
}
```

Expected statuses:

```text
200 OK
400 Bad Request
404 Not Found
409 Conflict
500 Internal Server Error
```

### Delete Category

```http
DELETE /api/categories/:id
```

Expected statuses:

```text
200 OK
400 Bad Request
404 Not Found
409 Conflict
500 Internal Server Error
```

## Users

### Get All Users

```http
GET /api/users
```

Expected status:

```text
200 OK
```

### Get User by ID

```http
GET /api/users/:id
```

Expected statuses:

```text
200 OK
400 Bad Request
404 Not Found
```

### Create User

```http
POST /api/users
```

Request body:

```json
{
  "full_name": "Dina Aiman",
  "email": "dina@example.com",
  "phone": "0791234567",
  "role": "customer"
}
```

Expected statuses:

```text
201 Created
400 Bad Request
409 Conflict
500 Internal Server Error
```

### Update User Status

```http
PATCH /api/users/:id/status
```

Request body:

```json
{
  "is_active": false
}
```

Expected statuses:

```text
200 OK
400 Bad Request
404 Not Found
500 Internal Server Error
```

## Error Routes

### Invalid JSON Body

Sending invalid JSON to an endpoint that accepts a request body returns:

```text
400 Bad Request
```

Example response:

```json
{
  "success": false,
  "message": "Invalid JSON body"
}
```

### Unknown Route

```http
GET /api/unknown
```

Expected status:

```text
404 Not Found
```

Example response:

```json
{
  "success": false,
  "message": "Route not found"
}
```

## HTTP Status Codes

```text
200 OK
201 Created
400 Bad Request
404 Not Found
409 Conflict
500 Internal Server Error
```