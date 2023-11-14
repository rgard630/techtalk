const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');
const Post = require('./Post');

class Comment extends Model {}

Comment.init(
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'comment',
  }
);

// Define associations
Comment.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
Comment.belongsTo(Post, { foreignKey: 'postId', onDelete: 'CASCADE' });

module.exports = Comment;
