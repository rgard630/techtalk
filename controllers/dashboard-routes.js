const express = require('express');
const router = express.Router();
const { Post } = require('../models'); // Import the Post model

// Route to get all posts created by the logged-in user
router.get('/dashboard', async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have user authentication and req.user contains user information
    const userPosts = await Post.findAll({ where: { userId } });

    res.status(200).json(userPosts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ error: 'Failed to fetch user posts' });
  }
});

// Route to create a new post by the logged-in user
router.post('/dashboard/posts', async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.user.id // Assuming you have user authentication and req.user contains user information
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Route to update a post by the logged-in user
router.put('/dashboard/posts/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id; // Assuming you have user authentication and req.user contains user information

    const [updatedRows] = await Post.update(
      { title: req.body.title, content: req.body.content },
      { where: { id: postId, userId } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Post not found or unauthorized' });
    }

    res.status(200).json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// Route to delete a post by the logged-in user
router.delete('/dashboard/posts/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id; // Assuming you have user authentication and req.user contains user information

    const deletedRows = await Post.destroy({ where: { id: postId, userId } });

    if (deletedRows === 0) {
      return res.status(404).json({ error: 'Post not found or unauthorized' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// Add other dashboard-related routes as needed

module.exports = router;
