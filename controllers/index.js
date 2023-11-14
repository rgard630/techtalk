const express = require('express');
const session = require('express-session');
const path = require('path');
const routes = require('./routes'); // Assuming you have route files like home-routes.js, post-routes.js, etc.
const sequelize = require('./config/sequelize'); // Assuming your Sequelize configuration is in a file named sequelize.js
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Routes
app.use('/', routes.home); // Assuming 'home' is exported from home-routes.js
app.use('/dashboard', routes.dashboard); // Assuming 'dashboard' is exported from dashboard-routes.js
app.use('/posts', routes.posts); // Assuming 'posts' is exported from post-routes.js
// Add other routes as needed

// Start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Error starting server:', error);
});
