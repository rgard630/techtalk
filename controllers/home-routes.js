const express = require('express');
const router = express.Router();
const { Post } = require('../models'); // Import the Post model

// Route for the homepage
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ['id', 'username'] }]
    });

    res.render('homepage', { posts }); // Assuming you're using handlebars and rendering a 'homepage' view
  } catch (error) {
    console.error('Error fetching posts for homepage:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Other routes for navigation or additional functionalities can be added here

module.exports = router;
