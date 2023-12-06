# Building a Blog Post Application using Nodejs, Expressjs and MongoDB.

A simple blog post application built with Node.js, Express, and MongoDB.

## Installation

### 1. Check Node.js Version

Ensure that Node.js is installed on your machine. If not, download and install it from [https://nodejs.org/](https://nodejs.org/).

```
node -v
```

### 2. Initialize the Project

Initialize a new Node.js project using npm.

```
npm init -y
```

### 3. install dependencies

Install the required dependencies for the project.

```
npm install bcrypt connect-mongo cookie-parser dotenv ejs express express-ejs-layouts express-session jsonwebtoken method-override mongoose

```

This command will install all the necessary dependencies:

* `bcrypt`: for password hashing
* `connect-mongo`: for connecting Express session to MongoDB
* `cookie-parser`: for parsing cookies sent by the browser
* `dotenv`: for loading environment variables from a `.env` file
* `ejs`: for templating HTML views
* `express`: for building the web application framework
* `express-ejs-layouts`: for managing page layouts with EJS
* `express-session`: for managing user sessions
* `jsonwebtoken`: for generating and verifying JSON Web Tokens (JWT)
* `method-override`: for supporting HTTP methods like PUT and DELETE
* `mongoose`: for interacting with MongoDB databases


### basic server setup in `app.js`

```
require('dotenv').config();

const express = require('express');
const app = express();

const PORT = 5000 || process.env.PORT;

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})
```

### Explanation:

* require('dotenv').config();: Loads environment variables from a .env file (if present).
* const express = require('express');: Imports the Express.js framework for building web applications.
* const app = express();: Creates an instance of the Express application.
* const PORT = 5000 || process.env.PORT;: Sets the port for the server, either using a default of 5000 or reading a PORT variable from the environment.
* app.get('/', (req, res) => { ... });: Defines a route handler for the root path (/), which sends a "Hello world" response.
* app.listen(PORT, () => { ... });: Starts the server and listens on the specified port.


### static file serving

This line tells the app to serve static files like images, CSS, and JavaScript from the public directory. This is essential for displaying visual elements and interactive features on your website beyond just text.

```
app.use(express.static('public'));
```

#### What happen
* When the app receives a request for a static file (e.g., /images/logo.png), it automatically looks for the file in the public directory.
* If the file exists, it's sent directly to the browser.
* If the file isn't found, an error is returned.


### Layout management

These lines introduce EJS templates for layout management. This allows you to create reusable layouts for different pages, sharing common elements like headers, navigation, and footers.

```
app.use(expressLayout);
app.set('layout', './layouts/main');
```

#### Explaination

* app.use(expressLayout);: This enables using EJS layouts.
* app.set('layout', './layouts/main');: This defines the main layout file (./layouts/main) that holds the skeleton of your pages.


### Templating engine

This line specifies EJS as the templating engine for generating dynamic content. EJS allows you to embed data and logic within your HTML templates, making them more interactive and responsive.

```
app.set('view engine', 'ejs');
```

### main.ejs

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= locals.title %></title>
    <meta name="description" content="<%= locals.description %>">
    <link rel="stylesheet" href="/css/style.css">
    <script type="text/javascript" defer src="/js/script.js"></script>
</head>
<body>
    <div class="container">
        <%- include('../partials/header.ejs') %>
            <main class="main">
                <%- body %>
            </main>
        <%- include('../partials/footer.ejs') %>
    </div>
</body>
</html>
```

#### Explaination

* This is the main HTML template for your web application. It defines the basic structure of the page, including the <html>, <head>, and <body> tags. The <head> tag contains metadata about the page, such as the title and description, as well as links to CSS and JavaScript files. The <body> tag contains the main content of the page, which is wrapped in a <div> element with the class container.

* The ejs templating language is used to dynamically insert content into the template. The <%= syntax is used to evaluate an expression and output the result. For example, the line <title><%= locals.title %></title> sets the title of the page to the value of the title property of the locals object.

* The include directive is used to include other templates into the main template. For example, the line <%- include('../partials/header.ejs') %> includes the header.ejs template into the <head> of the main template.

* The body block is where you will insert the specific content of each page. For example, if you have a route for the /about page, you would create an about.ejs template that would be inserted into the body block of the main template.