# Security Review

## 1. Missing Authentication and Authorization

- **Location:** `src/routes/productsRoutes.js`, `src/routes/categoriesRoutes.js`, `src/routes/usersRoutes.js`
- **Risk:** Sensitive API routes could be accessed without verifying the user's identity or permissions.
- **Severity:** High
- **Remediation:** Implement JWT authentication and role-based authorization for `customer` and `admin`.
- **Status:** Fixed

## 2. Unrestricted CORS Configuration

- **Location:** `src/app.js`
- **Risk:** Allowing requests from any origin could allow unauthorized websites to communicate with the API.
- **Severity:** Medium
- **Remediation:** Restrict CORS to authorized origins, methods, and headers.
- **Status:** Fixed

## 3. Missing Password Protection

- **Location:** `src/controllers/authController.js`
- **Risk:** Storing or processing passwords without secure hashing could expose user credentials if the database is compromised.
- **Severity:** High
- **Remediation:** Hash passwords using bcrypt and verify them using `bcrypt.compare`.
- **Status:** Fixed

## 4. Insufficient Input Validation

- **Location:** `src/validators`, `src/routes`, and controllers
- **Risk:** Invalid or malicious input could cause unexpected behavior or security vulnerabilities.
- **Severity:** Medium
- **Remediation:** Use `express-validator` to validate emails, IDs, prices, stock quantities, roles, required fields, and text lengths.
- **Status:** Fixed

## 5. Missing Security Headers

- **Location:** `src/app.js`
- **Risk:** Missing HTTP security headers increases exposure to common browser-based attacks.
- **Severity:** Medium
- **Remediation:** Add Helmet middleware to configure appropriate HTTP security headers.
- **Status:** Fixed

## 6. Missing Rate Limiting

- **Location:** Authentication routes and API routes
- **Risk:** Attackers could repeatedly attempt login requests or send excessive API requests.
- **Severity:** High
- **Remediation:** Apply a strict rate limiter to the login endpoint and a general limiter to API routes.
- **Status:** Fixed

## 7. Insufficient Security Event Logging

- **Location:** Authentication and authorization middleware
- **Risk:** Failed login attempts and unauthorized access attempts may not be visible for security monitoring.
- **Severity:** Medium
- **Remediation:** Log security events such as failed logins, invalid tokens, denied authorization, and administrative actions without logging passwords or tokens.
- **Status:** Fixed