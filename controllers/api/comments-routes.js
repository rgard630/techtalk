const express = require('express');
const router = express.Router();
const { Comment } = require('../models'); // Import the Comment model

// Route to create a new comment
router.post('/comments', async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      userId: req.user.id, // Assuming you have user authentication and req.user contains user information
      postId: req.body.postId // Assuming postId is sent in the request body
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
});

// Route to get comments for a specific post
router.get('/posts/:postId/comments', async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.findAll({
      where: { postId },
      // Include user information if needed
      include: [{ model: User, attributes: ['id', 'username'] }] // Assuming User model is imported and needed
    });

    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// Route to delete a comment
router.delete('/comments/:commentId', async (req, res) => {
  try {
    const commentId = req.params.commentId;
    await Comment.destroy({ where: { id: commentId } });

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

// Add other comment-related routes as needed

module.exports = router;
