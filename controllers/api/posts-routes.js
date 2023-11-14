const express = require('express');
const router = express.Router();
const { Post, Comment, User } = require('../models'); // Import required models

// Route to create a new post
router.post('/posts', async (req, res) => {
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

// Route to get all posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ['id', 'username'] }, { model: Comment }]
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Route to get a specific post by ID
router.get('/posts/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findByPk(postId, {
      include: [{ model: User, attributes: ['id', 'username'] }, { model: Comment, include: User }]
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// Route to delete a post
router.delete('/posts/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    await Post.destroy({ where: { id: postId } });

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// Add other post-related routes as needed

module.exports = router;
