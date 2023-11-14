const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');
const Comment = require('./Comment');

class Post extends Model {}

Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'post',
  }
);

// Define associations
Post.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
Post.hasMany(Comment, { foreignKey: 'postId', onDelete: 'CASCADE' });

module.exports = Post;
