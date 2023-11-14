const express = require('express');
const session = require('express-session');
const passport = require('passport');
const exphbs = require('express-handlebars');

module.exports = (app) => {
  // Body Parser Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Static Files Middleware
  app.use(express.static('public'));

  // Handlebars Middleware
  app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
  app.set('view engine', 'handlebars');

  // Session Middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'your-secret-key',
      resave: false,
      saveUninitialized: true,
    })
  );

  // Passport Middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // Custom Middleware (Example: Logging User Info)
  app.use((req, res, next) => {
    console.log('Logged In User:', req.user);
    next();
  });

  // Error Handling Middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
};
