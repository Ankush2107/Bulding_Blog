require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

// Creating express application
const app = express();

// Port
const PORT = 5000 || process.env.PORT;

// Middleware
app.use(express.static('public'));


// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');



app.use('/', require('./server/routes/main'));


app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}...`);
}) 