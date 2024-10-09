# Library Management System - Mongoose Schemas

## Database Schema Visualization
You can view the database schema for this system [here](https://drawsql.app/teams/jarvis-10/diagrams/library-management-system).

## 1. Book Schema
### Fields:
- `title`: **(String, required)** - The title of the book.
- `author`: **(String, required)** - The author of the book.
- `coverURL`: **(String, with a default URL)** - The URL for the book's cover image. Defaults to a preset URL if one isn't provided.
- `description`: **(String)** - A brief description of the book.
- `available`: **(Boolean, default: true)** - Indicates if the book is currently available for borrowing.
- `borrowedBy`: **(String)** - The name or identifier of the user who borrowed the book.
- `borrowedById`: **(String)** - The ID of the user who borrowed the book.

### Options:
- `timestamps: true` - Automatically adds `createdAt` and `updatedAt` timestamps to each book document.

## 2. User Schema
### Fields:
- `username`: **(String, required, unique)** - The username for the library member or librarian.
- `password`: **(String, required)** - The password for the user.
- `isActive`: **(Boolean, default: true)** - Indicates if the user account is active.
- `role`: **(String, required, enum)** - The role of the user in the system, either `"LIBRARIAN"` or `"MEMBER"`.

### Options:
- `timestamps: true` - Automatically adds `createdAt` and `updatedAt` timestamps to each user document.

## 3. Borrow Record Schema
### Fields:
- `bookId`: **(ObjectId, ref: 'Book', required)** - The ID of the book being borrowed, referencing the `Book` schema.
- `memberId`: **(ObjectId, ref: 'User', required)** - The ID of the member borrowing the book, referencing the `User` schema.
- `borrowedAt`: **(Date, default: Date.now)** - The date and time when the book was borrowed.
- `returnedAt`: **(Date)** - The date and time when the book was returned (optional).

### Options:
- `timestamps: true` - Automatically adds `createdAt` and `updatedAt` timestamps to each borrow record.