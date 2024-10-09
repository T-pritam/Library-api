# API Documentation

## Authentication APIs

> Each endpoint with `auth` middleware requires the user to have a valid token, or they will receive an "Invalid token" response.

### Auth Middleware
- **Description**: Validates the user using a JWT token.
- **Data**: Retrieved from headers.
- **Success**:
  - `200`: Success
- **Error**:
  - `403 Forbidden`: Invalid token.

### 1. Sign Up
- **Endpoint**: `POST /signup`
  - **Description**: Registers a new user.
  - **Request Body**:
    - `username` (String, required) - The username for the new user.
    - `password` (String, required) - The password for the new user.
    - `role` (String, required, options: `['LIBRARIAN', 'MEMBER']`) - User role.
  - **Success Response**:
    - **Status**: `201 Created`
    - **Body**: `{ message: "User created successfully" }`
  - **Errors**:
    - `400 Bad Request`: User already exists.
    - `500 Error`: Error registering user.

### 2. Login
- **Endpoint**: `POST /login`
  - **Description**: Authenticates a user and returns a JWT token.
  - **Request Body**:
    - `username` (String, required)
    - `password` (String, required)
  - **Success Response**:
    - **Status**: `200 OK`
    - **Body**: `{ token: "<JWT_token>", userId: "<user_id>" }`
  - **Errors**:
    - `500 Error`: Error logging in.
    - `401 Unauthorized`: Invalid username or password.

### 3. Get User by ID
- **Endpoint**: `GET /getUser/:id`
  - **Description**: Retrieves user details by ID.
  - **Parameters**:
    - `id` (String, required) - User ID.
  - **Success Response**:
    - **Status**: `200 OK`
    - **Body**: `{ username: "<username>", role: "<role>" }`
  - **Errors**:
    - `404 Not Found`: User not found.

### 4. Get All Users
- **Endpoint**: `GET /getAll`
  - **Description**: Returns a list of all users (Requires Authentication).
  - **Middleware**: `auth`
  - **Success Response**:
    - **Status**: `200 OK`
    - **Body**: `[{ userId: "<user_id>", username: "<username>", role: "<role>" }, ...]`
  - **Errors**:
    - `403 Forbidden`: Invalid token.

### 5. Delete User
- **Endpoint**: `DELETE /:id`
  - **Description**: Deletes a specific user by ID (Requires Authentication).
  - **Middleware**: `auth`
  - **Parameters**:
    - `id` (String, required) - User ID.
  - **Success Response**:
    - **Status**: `200 OK`
    - **Body**: `{ message: "User deleted successfully" }`
  - **Errors**:
    - `404 Not Found`: User not found.
    - `403 Forbidden`: Invalid token.

### 6. Delete User (Admin Only)
- **Endpoint**: `DELETE /admin/:id`
  - **Description**: Deletes a user with admin permissions only.
  - **Middleware**: `auth`
  - **Parameters**:
    - `id` (String, required) - User ID.
  - **Success Response**:
    - **Status**: `200 OK`
    - **Body**: `{ message: "User deleted by admin" }`
  - **Errors**:
    - `403 Forbidden`: Not authorized or invalid token.

### 7. Update User
- **Endpoint**: `PUT /:id`
  - **Description**: Updates user details by ID (Requires Authentication).
  - **Middleware**: `auth`
  - **Parameters**:
    - `id` (String, required) - User ID.
  - **Request Body**:
    - `{ "username" }`
  - **Success Response**:
    - **Status**: `200 OK`
    - **Body**: `{ message: "User updated successfully" }`
  - **Errors**:
    - `404 Not Found`: User not found.

---

## Book APIs

### 1. Get All Books
- **Endpoint**: `GET /`
  - **Description**: Retrieves a list of all books in the library (Requires Authentication).
  - **Middleware**: `auth`
  - **Success Response**:
    - **Status**: `200 OK`
    - **Body**: `[{ bookId: "<book_id>", title: "<title>", author: "<author>" }, ...]`
  - **Errors**:
    - `403 Forbidden`: Invalid token.
    - `400 Bad Request`: Book not found.

### 2. Get Book by ID
- **Endpoint**: `GET /:id`
  - **Description**: Retrieves a book by its ID (Requires Authentication).
  - **Middleware**: `auth`
  - **Parameters**:
    - `id` (String, required) - Book ID.
  - **Success Response**:
    - **Status**: `200 OK`
    - **Body**: `{ title: "<title>", author: "<author>", ... }`
  - **Errors**:
    - `404 Not Found`: Book not found.
    - `403 Forbidden`: Invalid token.

### 3. Add a Book
- **Endpoint**: `POST /`
  - **Description**: Adds a new book to the library (Requires Authentication).
  - **Middleware**: `auth`
  - **Request Body**:
    - `{ title: "<title>", author: "<author>", ... }`
  - **Success Response**:
    - **Status**: `201 Created`
    - **Body**: `{ message: "Book added successfully", bookId: "<book_id>" }`
  - **Errors**:
    - `403 Forbidden`: Invalid token.

### 4. Update Book by ID
- **Endpoint**: `PUT /:id`
  - **Description**: Updates a book's details (Requires Authentication).
  - **Middleware**: `auth`
  - **Parameters**:
    - `id` (String, required) - Book ID.
  - **Request Body**:
    - `{ title: "<new_title>", ... }`
  - **Success Response**:
    - **Status**: `200 OK`
    - **Body**: `{ message: "Book updated successfully" }`

### 5. Search Books by Name
- **Endpoint**: `GET /search/:name`
  - **Description**: Searches for books by title or author, case-insensitive.
  - **Parameters**:
    - `name` (String, required) - Search term for the title or author.
  - **Success Response**:
    - **Status**: `200 OK`
    - **Body**: `[{ bookId: "<book_id>", title: "<title>", author: "<author>" }, ...]`

### 6. Delete Book by ID
- **Endpoint**: `DELETE /:id`
  - **Description**: Deletes a specific book by ID (Requires Authentication).
  - **Middleware**: `auth`
  - **Parameters**:
    - `id` (String, required) - Book ID.
  - **Success Response**:
    - **Status**: `200 OK`
    - **Body**: `{ message: "Book deleted successfully" }`
  - **Errors**:
    - `404 Not Found`: Book not found.
    - `403 Forbidden`: Invalid token.

---

## Borrow APIs

### 1. Borrow Book
- **Endpoint**: `POST /borrow`
  - **Description**: Allows a user to borrow a book (Requires Authentication).
  - **Middleware**: `auth`
  - **Request Body**:
    - `{ bookId: "<book_id>", memberId: "<member_id>" }`
  - **Success Response**:
    - **Status**: `201 Created`
    - **Body**: `{ message: "Book borrowed successfully" }`
  - **Errors**:
    - `400 Bad Request`: Book not available.
    - `403 Forbidden`: Invalid token.

### 2. Return Book
- **Endpoint**: `POST /return`
  - **Description**: Allows a user to return a book (Requires Authentication).
  - **Middleware**: `auth`
  - **Request Body**:
    - `{ bookId: "<book_id>", memberId: "<member_id>" }`
  - **Success Response**:
    - **Status**: `200 OK`
    - **Body**: `{ message: "Book returned successfully" }`
  - **Errors**:
    - `404 Not Found`: Borrow record not found.
    - `403 Forbidden`: Invalid token.

### 3. Get Borrow Records by User ID
- **Endpoint**: `GET /getByUserId/:id`
  - **Description**: Retrieves borrow records for a specific user (Requires Authentication).
  - **Middleware**: `auth`
  - **Parameters**:
    - `id` (String, required) - User ID.
  - **Success Response**:
    - **Status**: `200 OK`
    - **Body**: `[{ bookId: "<book_id>", borrowedAt: "<date>" }, ...]`
  - **Errors**:
    - `404 Not Found`: User not found.
    - `403 Forbidden`: Invalid token.

---

Each endpoint with `auth` middleware requires the user to have a valid token, or they will receive an "Invalid token" response.
