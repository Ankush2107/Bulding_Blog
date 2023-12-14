# Building Blog
Building Blog is a Node.js application for creating and managing a simple blog. It uses Express.js for the server, MongoDB for data storage, and various npm packages for additional functionality.

## Getting Started

### Prerequisites
Make sure you have the following installed on your machine:

- Node.js
- MongoDB

## Installation

1. Clone the repository:

```
git clone https://github.com/Ankush2107/Building_Blog.git
```

2. Navigate to the project directory:

```
cd building_blog
```

3. Install dependencies:

```
npm install
```

## Usage
### Run the Development Server

```
npm run dev
```

### Access the Application
Open your browser and navigate to [http://localhost:3000].

## Features

## User Authentication
Secure user authentication using bcrypt for password hashing.
JSON Web Token (JWT) for user session management.

## Session Management
Express sessions with Connect MongoDB for session storage.
Cookie parsing using cookie-parser.

## Post Management
CRUD operations for managing blog posts.
EJS for rendering dynamic views.

## File Structure

- `app.js`: Express application setup.
- `views/`: EJS templates for rendering HTML.
  - `layouts/`: Layout templates for different sections of the application.
  - `partials/`: Partial templates for reusable components.
- `public/`: Static files (CSS, JS).
- `server/`: Server-side code.
  - `config/`: Configuration files.
  - `routes/`: Contains route handlers for different parts of the application.
  - `models/`: Data models for MongoDB.


## Dependencies

- express: Web framework for Node.js.
- mongoose: MongoDB object modeling for Node.js.
- bcrypt: Password hashing library.
- jsonwebtoken: JSON Web Token (JWT) authentication.
- express-ejs-layouts: Layout support for EJS templates.
- express-session: Session middleware for Express.
- cookie-parser: Parse Cookie header.
- connect-mongo: MongoDB session store for Express.
- nodemon: Development server auto-reloading.

## Contributing
Feel free to contribute to the project by opening issues or pull requests.