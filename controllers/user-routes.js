const express = require('express');
const router = express.Router();
const { User } = require('../models'); // Import the User model
const bcrypt = require('bcrypt');
const session = require('express-session');

// Route for user sign-up
router.post('/signup', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hashing user password

    const newUser = await User.create({
      username: req.body.username,
      password: hashedPassword
    });

    req.session.save(() => {
      req.session.userId = newUser.id; // Saving user ID in the session for authentication
      res.status(201).json(newUser);
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Route for user login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    req.session.save(() => {
      req.session.userId = user.id; // Saving user ID in the session for authentication
      res.status(200).json({ message: 'Login successful', user });
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to log in' });
  }
});

// Route for user logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({ message: 'Logout successful' });
  });
});

// Add other user-related routes as needed

module.exports = router;
