# Postman Test Report

## Student Information

- Student Name: Dina Aiman Albustanji
- Student ID: 120232211004
- Project: E-Commerce REST API
- Base URL: `http://localhost:3000`

## Mandatory Test Results

### Test 1: Get All Products

- Method: `GET`
- Route: `/api/products`
- Request Body: None
- Actual Status: `200 OK`
- Response: Product array returned successfully.
- Result: The actual result matches the expected result.

### Test 2: Get an Existing Product

- Method: `GET`
- Route: `/api/products/1`
- Path Parameter: `id = 1`
- Request Body: None
- Actual Status: `200 OK`
- Response: Product data returned successfully.
- Result: The actual result matches the expected result.

### Test 3: Get a Non-Existing Product

- Method: `GET`
- Route: `/api/products/9999`
- Path Parameter: `id = 9999`
- Request Body: None
- Actual Status: `404 Not Found`
- Response:

```json
{
  "success": false,
  "message": "Product not found"
}
```

- Result: The actual result matches the expected result.

### Test 4: Create a Valid Product

- Method: `POST`
- Route: `/api/products`
- Request Body:

```json
{
  "category_id": 1,
  "name": "Laptop Stand",
  "description": "Adjustable laptop stand",
  "price": 49.99,
  "stock_quantity": 10,
  "sku": "API-TEST-005"
}
```

- Actual Status: `201 Created`
- Response: Product created successfully.
- Result: The actual result matches the expected result.

### Test 5: Create a Product with Missing Data

- Method: `POST`
- Route: `/api/products`
- Request Body:

```json
{
  "category_id": 1,
  "name": "",
  "stock_quantity": 10,
  "sku": "API-TEST-002"
}
```

- Actual Status: `400 Bad Request`
- Response:

```json
{
  "success": false,
  "message": "Category, name, price, stock quantity, and SKU are required"
}
```

- Result: The actual result matches the expected result.

### Test 6: Create a Product with a Negative Price

- Method: `POST`
- Route: `/api/products`
- Request Body:

```json
{
  "category_id": 1,
  "name": "Invalid Price Product",
  "description": "Product used for validation test",
  "price": -10,
  "stock_quantity": 5,
  "sku": "API-TEST-003"
}
```

- Actual Status: `400 Bad Request`
- Response:

```json
{
  "success": false,
  "message": "Price must be greater than zero"
}
```

- Result: The actual result matches the expected result.

### Test 7: Create a Product with Negative Stock

- Method: `POST`
- Route: `/api/products`
- Request Body:

```json
{
  "category_id": 1,
  "name": "Invalid Stock Product",
  "description": "Negative stock test",
  "price": 20,
  "stock_quantity": -5,
  "sku": "API-TEST-004"
}
```

- Actual Status: `400 Bad Request`
- Response:

```json
{
  "success": false,
  "message": "Stock quantity cannot be negative"
}
```

- Result: The actual result matches the expected result.

### Test 8: Create a Product with a Duplicate SKU

- Method: `POST`
- Route: `/api/products`
- Request Body:

```json
{
  "category_id": 1,
  "name": "Duplicate SKU Product",
  "description": "Product used to test duplicate SKU",
  "price": 25,
  "stock_quantity": 4,
  "sku": "API-TEST-001"
}
```

- Actual Status: `409 Conflict`
- Response:

```json
{
  "success": false,
  "message": "SKU already exists"
}
```

- Result: The actual result matches the expected result.

### Test 9: Update an Existing Product

- Method: `PUT`
- Route: `/api/products/23`
- Path Parameter: `id = 23`
- Request Body:

```json
{
  "category_id": 1,
  "name": "Updated Laptop Stand",
  "description": "Updated adjustable laptop stand",
  "price": 55.99,
  "stock_quantity": 15,
  "sku": "API-TEST-001",
  "is_active": true
}
```

- Actual Status: `200 OK`
- Response: Product updated successfully.
- Result: The actual result matches the expected result.

### Test 10: Update a Non-Existing Product

- Method: `PUT`
- Route: `/api/products/9999`
- Path Parameter: `id = 9999`
- Request Body:

```json
{
  "category_id": 1,
  "name": "Updated Product",
  "description": "Testing a nonexistent product",
  "price": 55.99,
  "stock_quantity": 15,
  "sku": "API-TEST-9999",
  "is_active": true
}
```

- Actual Status: `404 Not Found`
- Response:

```json
{
  "success": false,
  "message": "Product not found"
}
```

- Result: The actual result matches the expected result.

### Test 11: Deactivate a Product

- Method: `PATCH`
- Route: `/api/products/1/deactivate`
- Path Parameter: `id = 1`
- Request Body: None
- Actual Status: `200 OK`
- Response: Product deactivated successfully and `is_active` became `false`.
- Result: The actual result matches the expected result.

### Test 12: Create a Valid Category

- Method: `POST`
- Route: `/api/categories`
- Request Body:

```json
{
  "name": "API Test Category",
  "description": "Category created through the REST API"
}
```

- Actual Status: `201 Created`
- Response: Category created successfully.
- Result: The actual result matches the expected result.

### Test 13: Create a Valid User

- Method: `POST`
- Route: `/api/users`
- Request Body:

```json
{
  "full_name": "Dina Aiman",
  "email": "dina.api.test@example.com",
  "phone": "0791234567",
  "role": "customer"
}
```

- Actual Status: `201 Created`
- Response: User created successfully.
- Result: The actual result matches the expected result.

### Test 14: Create a User with a Duplicate Email

- Method: `POST`
- Route: `/api/users`
- Request Body:

```json
{
  "full_name": "Another User",
  "email": "dina.api.test@example.com",
  "phone": "0799999999",
  "role": "customer"
}
```

- Actual Status: `409 Conflict`
- Response:

```json
{
  "success": false,
  "message": "Email already exists"
}
```

- Result: The actual result matches the expected result.

### Test 15: Send Invalid JSON

- Method: `POST`
- Route: `/api/users`
- Request Body:

```text
{
  "full_name": "Broken User",
  "email": "broken@example.com",
}
```

- Actual Status: `400 Bad Request`
- Response:

```json
{
  "success": false,
  "message": "Invalid JSON body"
}
```

- Result: The actual result matches the expected result.

### Test 16: Request an Unknown API Route

- Method: `GET`
- Route: `/api/unknown`
- Request Body: None
- Actual Status: `404 Not Found`
- Response:

```json
{
  "success": false,
  "message": "Route not found"
}
```

- Result: The actual result matches the expected result.

## Additional Endpoint Tests

The following additional requests were tested and saved inside the Postman Collection:

- `DELETE /api/products/:id`
- `GET /api/categories`
- `GET /api/categories/:id`
- `PUT /api/categories/:id`
- `DELETE /api/categories/:id`
- `GET /api/users`
- `GET /api/users/:id`
- `PATCH /api/users/:id/status`

### Delete Product Test

- Method: `DELETE`
- Route: `/api/products/26`
- Path Parameter: `id = 26`
- Request Body: None
- Actual Status: `200 OK`
- Response:

```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

- Result: The actual result matches the expected result.

## Final Test Summary

- All 16 mandatory Postman tests were completed.
- All required product, category, and user endpoints were saved in the Postman Collection.
- Successful requests returned the correct `200 OK` or `201 Created` status.
- Invalid or incomplete data returned `400 Bad Request`.
- Missing records and unknown routes returned `404 Not Found`.
- Duplicate SKU and email values returned `409 Conflict`.
- Responses were returned in a consistent JSON format.
- The API was connected to the Neon PostgreSQL database.
- Parameterized SQL queries were used for external values.
- The actual results matched the expected results.