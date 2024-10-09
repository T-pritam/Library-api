# Library Management System - Frontend and Flow Documentation

## Overview
The Library Management System is designed to manage book borrowing and user accounts. The frontend is built with HTML, CSS, and JavaScript, providing users with an interface to access and manage library resources. There are two main roles in the system:
1. **Members** - Regular users who can browse, borrow, and return books.
2. **Librarians** - Administrative users who manage books, users, and borrowing records.

The software’s frontend communicates with the backend via a set of API endpoints to perform operations such as user authentication, book management, and borrowing operations.

## Flow of the Software

### 1. **Login Page**
   - **Purpose**: Allows both Members and Librarians to log into the system.
   - **Process**:
     - Users enter their username and password, which are sent to the backend for verification.
     - On successful login, a JSON Web Token (JWT) is received and stored locally for authorization in further requests.
     - The system checks the user’s role and redirects them to the appropriate dashboard.
       - **Librarians** are redirected to the **Admin Dashboard**.
       - **Members** are redirected to the **Member Dashboard**.
   - **API Used**: `POST /login`
   - **Frontend Components**: Login form, error handling for invalid credentials.

### 2. **Sign Up Page**
   - **Purpose**: Provides new users with the ability to create an account.
   - **Process**:
     - Users fill in their details, including their role. By default, users are registered as Members.
     - The signup details are sent to the backend to create a new user account.
     - After successful signup, users are redirected to the **Login Page** to access their new account.
   - **API Used**: `POST /signup`
   - **Frontend Components**: Registration form, error notifications for duplicate usernames or invalid entries.

### 3. **Member Dashboard**
   - **Purpose**: The main interface for Members, allowing them to browse and manage their book borrowing activities.
   - **Process**:
     - Members are presented with a searchable list of available books. Each book displays details such as title, author, availability status, and cover image.
     - Members can search for books by title or author using the search functionality.
     - By selecting a book, Members can view detailed information and choose to borrow it, if available.
     - When borrowing a book, the system updates its status and creates a borrow record associated with the user’s account.
     - Members can view their borrow history on a separate page, where they also have the option to return books.
   - **API Used**: 
     - `GET /` - To fetch all books.
     - `GET /:id` - To fetch details of a selected book.
     - `POST /borrow` - To borrow a book.
     - `POST /return` - To return a book.
     - `GET /getByUserId/:id` - To view borrow history.
   - **Frontend Components**: Book list, search functionality, borrowing history, borrow and return buttons.

### 4. **Admin Dashboard**
   - **Purpose**: Provides Librarians with tools to manage the library’s resources, including book inventory and user accounts.
   - **Process**:
     - Librarians can view and manage the list of all books, with the ability to add, update, or delete entries.
     - The dashboard allows Librarians to add new books by filling out details such as title, author, and cover URL.
     - Librarians can edit existing book information, such as updating the title or author details, and they can also remove books from the library.
     - In addition to managing books, Librarians can view a list of all users, including Members and other Librarians.
     - Librarians have access to detailed borrow records, which help track the status of each book and who currently has it borrowed.
   - **API Used**: 
     - `POST /` - To add a new book.
     - `PUT /:id` - To update a book's details.
     - `DELETE /:id` - To delete a book.
     - `GET /getAll` - To fetch all user accounts.
     - `DELETE /admin/:id` - To delete a user as an admin.
   - **Frontend Components**: Book management interface, user management interface, borrowing records viewer, add/update/delete book buttons.

### 5. **Search Functionality**
   - **Purpose**: Allows users to search for books by title or author.
   - **Process**:
     - Users enter a search term, and the frontend sends this term to the backend.
     - The backend returns a list of books that match the search criteria.
   - **API Used**: `GET /search/:name`
   - **Frontend Components**: Search bar, filtered book list.

### 6. **Logout Functionality**
   - **Purpose**: Allows users to securely log out of the system.
   - **Process**:
     - Users click the "Logout" button, which clears their JWT token from local storage.
     - The user is then redirected back to the **Login Page**.
   - **Frontend Components**: Logout button.

## Summary of User Flow
The software provides an intuitive user experience by tailoring the interface to the user’s role. Upon login, users are presented with their respective dashboards, which offer functionalities specific to their role. Members have easy access to search, borrow, and return books, along with a borrowing history. Librarians are given tools for managing both the library inventory and user accounts, with access to detailed borrowing records. By communicating with the backend API, the frontend handles user authentication, book management, and borrowing activities while ensuring that users only have access to features appropriate to their role.

The Library Management System, as designed, offers a complete and interactive user experience for both Members and Librarians, facilitating efficient library resource management and enhancing accessibility for users.