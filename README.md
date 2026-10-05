# E-commerce API

A REST API built with Node.js, Express 5, MongoDB, and Mongoose. It uses native ES modules, Zod request validation, and centralized error handling.

## Requirements

- Node.js 20 or newer
- npm
- A running MongoDB instance for local development and API tests
- Postman (optional, for manual API testing)

## Setup And Run

Install dependencies from the project directory:

```bash
npm install
```

Copy `.env.example` to `.env`, then set the database URLs:

```env
PORT=5000
NODE_ENV=development
MONGODB_URL=mongodb://127.0.0.1:27017/ecommerce_api
MONGODB_URL_TEST=mongodb://127.0.0.1:27017/ecommerce_api_test
```

Keep `.env` out of version control. Use a separate test database because the API test suite drops its database after running.

Start the server:

```bash
npm start
```

Start with automatic restarts while developing:

```bash
npm run dev
```

The server connects to MongoDB before listening. The default port is `5000`; set `PORT` to use another port. `GET http://localhost:5000/` is a plain-text health response. API routes are under `/api` and accept JSON with the `Content-Type: application/json` header.

### Email Utilities

Reusable email helpers are exported from `utils/email.js`: `sendEmail`, `sendVerificationCode`, `sendPasswordResetCode`, `generateVerificationCode`, `createVerificationCode`, `hashVerificationCode`, and `verifyVerificationCode`. Configure SMTP in `.env` using `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD`, and optionally `SMTP_FROM`. Set `EMAIL_VERIFICATION_SECRET` to a random secret of at least 32 characters; keep it private and do not commit it.

`createVerificationCode()` returns a six-digit code for immediate email delivery, an HMAC hash suitable for storing instead of the raw code, and a default ten-minute expiry. Persist the hash and expiry alongside the account/verification record, send the raw code with `sendVerificationCode({ to, code })`, and verify user input with `verifyVerificationCode({ code, codeHash, expiresAt })`. The authentication routes use these helpers, clear the stored code after successful verification, and rate-limit auth requests.


## Postman Quick Start

1. Start MongoDB and run the API with `npm run dev`.
2. In Postman, create an environment and set `baseUrl` to `http://localhost:5000/api`.
3. Send requests to `{{baseUrl}}/...`; choose **Body > raw > JSON** for requests with a body.
4. Create a category first, then use its returned `_id` when creating a product. Create a product before adding it to a cart or writing a review.
5. Register and verify an account, then log in. Save `accessToken` from the login response as a Postman environment variable and add `Authorization: Bearer {{accessToken}}` to protected requests. Order/review ownership comes from the token; cart `userId` must match the authenticated account.
6. Copy `_id` values from create responses into `categoryId`, `productId`, `orderId`, `reviewId`, and `cartItemId` as needed.

Protected routes require a verified active account. Product/category writes require an admin role; order access and cart access are owner-scoped; review writes are limited to the review owner or an admin. Public GET requests remain available for catalog and review reads. Bootstrap the first admin through a trusted database/seed process; public registration and admin-created accounts always receive the `user` role.

### Authentication

Authentication routes are prefixed with `/api/auth`:

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Create an unverified account and send a verification code |
| `POST` | `/api/auth/verify-email` | Verify email with the six-digit code |
| `POST` | `/api/auth/resend-verification` | Resend a code without revealing whether an account exists |
| `POST` | `/api/auth/login` | Sign in and receive a short-lived JWT |
| `GET` | `/api/auth/me` | Return the authenticated account |
| `POST` | `/api/auth/forgot-password` | Request password reset instructions |
| `POST` | `/api/auth/reset-password` | Set a new password using the emailed six-digit code |
| `PATCH` | `/api/auth/change-password` | Change password while signed in |

Registration body: `{"name":"Sam Example","email":"sam@example.com","password":"a-long-password-123"}`. Verification body: `{"email":"sam@example.com","code":"123456"}`. Login body: `{"email":"sam@example.com","password":"a-long-password-123"}`. Use the returned access token on the profile route as `Authorization: Bearer <accessToken>`.

Request reset body: `{"email":"sam@example.com"}`. Complete reset body: `{"email":"sam@example.com","code":"123456","password":"a-new-long-password-456"}`. To change a password while signed in, send `PATCH /api/auth/change-password` with `{"currentPassword":"the-current-password","newPassword":"a-new-long-password-456"}` and the bearer token.

Configure `JWT_SECRET` with a random secret of at least 32 bytes and set `JWT_EXPIRES_IN` (default `15m`). Password reset codes are six-digit values, stored only as HMAC hashes, expire after ten minutes, and are locked after five failed attempts. A successful reset or password change revokes existing access tokens. Passwords must be at least 8 characters and no more than 72 UTF-8 bytes. Password hashes and reset/verification secrets are excluded from normal model reads. Authentication endpoints are rate-limited. The default rate limiter uses in-memory storage; use a shared store when deploying multiple server instances.

## API Routes

All ID path parameters must be 24-character MongoDB ObjectId strings. `PATCH` bodies can contain one or more supported fields, but cannot be empty or include unknown fields.

### Users

All user-management routes require an active admin bearer token. Admin-created accounts are regular, unverified users; they must complete email verification before sign-in. Role or active-status changes revoke that account's existing tokens. Deletion is a soft deactivation, preserving linked orders and reviews. An admin cannot remove their own access, and the last active admin cannot be demoted or deactivated.

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/users?page=1&limit=20&role=user&active=true` | List users with pagination and optional filters |
| `POST` | `/users` | Create a regular unverified user |
| `GET` | `/users/:id` | Get one user |
| `PATCH` | `/users/:id` | Change `role` and/or `active` |
| `DELETE` | `/users/:id` | Deactivate a user |

Create body: `{"name":"Sam Example","email":"sam@example.com","password":"a-long-password-123"}`. Update body: `{"role":"admin","active":true}`. The create endpoint does not accept a role; provision the first admin through a trusted seed/database process.

### Categories

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/categories` | List categories |
| `GET` | `/categories/:id` | Get one category |
| `POST` | `/categories` | Create a category (returns `201`) |
| `PATCH` | `/categories/:id` | Update category fields |
| `DELETE` | `/categories/:id` | Delete a category |

Create body:

```json
{
	"name": "Accessories"
}
```

`name` is trimmed and must contain 1 to 120 characters.

### Products

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/products` | List products |
| `GET` | `/products/:id` | Get one product |
| `POST` | `/products` | Create a product (returns `201`) |
| `PATCH` | `/products/:id` | Update product fields |
| `DELETE` | `/products/:id` | Delete a product |

Create body (`category` is optional):

```json
{
	"name": "Keyboard",
	"price": 1500,
	"stock": 20,
	"category": "507f1f77bcf86cd799439011"
}
```

`name` is trimmed and must contain 1 to 120 characters, `price` must be a positive number, `stock` a non-negative integer, and `category` (when supplied) a MongoDB ObjectId.

### Orders

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/orders` | List orders |
| `GET` | `/orders/:id` | Get one order |
| `POST` | `/orders` | Create an order (returns `201`) |
| `PATCH` | `/orders/:id` | Update order fields |
| `DELETE` | `/orders/:id` | Delete an order |

Create body (status starts as `pending`):

```json
{
	"items": [
		{
			"productId": "507f1f77bcf86cd799439012",
			"quantity": 2,
			"color": "Black",
			"size": "Full"
		}
	]
}
```

`items` must contain at least one entry. Each entry requires a product ObjectId and positive integer quantity; `color` and `size` are optional. The authenticated account owns the order. The API checks stock, records purchase-time prices, stores the calculated total, and returns `items` and `totalItems`. Users can access their own orders; admins can access all orders.

Update an order's status with `PATCH /orders/:id`:

```json
{
	"status": "confirmed"
}
```

Allowed transitions are `pending` to `confirmed` or `cancelled`, `confirmed` to `shipped` or `cancelled`, and `shipped` to `delivered`. Delivered and cancelled orders are terminal. Cancelling an unshipped order returns its reserved quantities to stock. Deleting an order is allowed only while pending or cancelled; deleting a pending order first restores its reserved stock and removes its line items.

### Reviews

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/reviews` | List reviews |
| `GET` | `/reviews/:id` | Get one review |
| `POST` | `/reviews` | Create a review (returns `201`) |
| `PATCH` | `/reviews/:id` | Update review fields |
| `DELETE` | `/reviews/:id` | Delete a review |
| `GET` | `/reviews/product/:productId` | List reviews for a product |
| `GET` | `/reviews/user/:userId` | List reviews by a user |

Create body:

```json
{
	"productId": "507f1f77bcf86cd799439012",
	"rating": 5,
	"comment": "Works as expected"
}
```

`productId` must be a MongoDB ObjectId, `rating` must be between 1 and 5, and the optional `comment` may contain up to 200 characters. The authenticated account is the review author; only that author or an admin can edit or delete it.

### Carts

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/carts/:userId` | Get or create a user's cart |
| `POST` | `/carts/:userId/items` | Add a product to the cart |
| `PATCH` | `/carts/:userId/items/:itemId` | Set a cart item's quantity |
| `DELETE` | `/carts/:userId/items/:itemId` | Remove one cart item |
| `DELETE` | `/carts/:userId/items` | Remove all items from the cart |

Add-item body (`quantity` is optional and defaults to `1`):

```json
{
	"productId": "507f1f77bcf86cd799439012",
	"quantity": 2
}
```

Set-quantity body:

```json
{
	"quantity": 3
}
```

All cart routes require a bearer token. Users can access only their own cart unless they are admins. Quantities must be positive integers. The add-item route returns `404` if the product does not exist. Cart responses contain `cart`, `items`, `totalItems`, and `totalPrice`; each item includes its populated product summary.

### Postman Request Examples

Use the environment variable `baseUrl` defined above:

| Action | Method and URL | Body |
| --- | --- | --- |
| Create category | `POST {{baseUrl}}/categories` | `{"name":"Accessories"}` |
| Create product | `POST {{baseUrl}}/products` | `{"name":"Keyboard","price":1500,"stock":20,"category":"{{categoryId}}"}` |
| Update product stock | `PATCH {{baseUrl}}/products/{{productId}}` | `{"stock":15}` |
| Request reset code | `POST {{baseUrl}}/auth/forgot-password` | `{"email":"sam@example.com"}` |
| Reset password | `POST {{baseUrl}}/auth/reset-password` | `{"email":"sam@example.com","code":"123456","password":"a-new-long-password-456"}` |
| Change password | `PATCH {{baseUrl}}/auth/change-password` | `{"currentPassword":"current-password","newPassword":"a-new-long-password-456"}` |
| Create order | `POST {{baseUrl}}/orders` | `{"items":[{"productId":"{{productId}}","quantity":2}]}` |
| Change order status | `PATCH {{baseUrl}}/orders/{{orderId}}` | `{"status":"confirmed"}` |
| Create review | `POST {{baseUrl}}/reviews` | `{"productId":"{{productId}}","rating":5,"comment":"Works as expected"}` |
| Add cart item | `POST {{baseUrl}}/carts/{{userId}}/items` | `{"productId":"{{productId}}","quantity":2}` |
| View cart | `GET {{baseUrl}}/carts/{{userId}}` | No body |

For the other CRUD operations, use the corresponding route tables above. Use **Params** or replace `:id`, `:userId`, `:productId`, and `:itemId` with values returned by earlier requests.

## Validation And Errors

Routes validate request bodies and path parameters with the Zod schemas in `validations/`. The API returns `400` for invalid request data and `404` when a requested product, category, order, review, cart item, or cart product cannot be found.

Example error response:

```json
{
	"success": false,
	"message": "Request validation failed",
	"details": [
		{
			"path": "price",
			"message": "Too small: expected number to be >0"
		}
	]
}
```

`details` is present when available. Internal errors return status `500`; stack traces are included only outside production.

## Tests

Set `MONGODB_URL_TEST` in `.env` to a disposable test-only database, then run:

```bash
npm test
```

The current API test creates and removes product records, then drops the test database after the suite. Do not point `MONGODB_URL_TEST` at a database containing data you need to keep. This test suite is separate from manual Postman requests, which use `MONGODB_URL`.

## Project Structure

```text
config/       Database connection
controllers/  HTTP request and response handling
errors/       Application error type
middleware/   Request validation and global error handling
models/       Mongoose schemas and models
routes/       Express route registration
services/     Database and business operations
tests/        API tests
validations/  Shared Zod schemas
app.js        Express application configuration
server.js     Environment loading, database connection, and startup
```

Keep HTTP concerns in controllers and routes, data operations in services, and request validation in route schemas. Use explicit `.js` extensions for relative ES module imports.
