const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

// Set Handlebars as the template engine
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    extname: '.handlebars', // optional, specify the extension for handlebars files
    layoutsDir: path.join(__dirname, 'views/layouts'), // optional, specify the layouts directory
    partialsDir: path.join(__dirname, 'views/partials'), // optional, specify the partials directory
  })
);
app.set('view engine', 'handlebars');

// Static files middleware (if you have a 'public' directory for static files)
app.use(express.static(path.join(__dirname, 'public')));

// Example route - renders 'home' view
app.get('/', (req, res) => {
  res.render('home', { title: 'Home Page' });
});

// Define other routes here

// Example error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
