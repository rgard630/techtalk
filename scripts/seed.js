const sequelize = require('./config/sequelize'); // Assuming your Sequelize configuration is in a file named sequelize.js
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

const seedDatabase = async () => {
  try {
    // Sync all models to the database
    await sequelize.sync({ force: true });

    // Seed Users
    const users = await User.bulkCreate([
      { username: 'user1', password: 'password1' },
      { username: 'user2', password: 'password2' },
      // Add more users as needed
    ]);

    // Seed Posts
    const posts = await Post.bulkCreate([
      { title: 'First Post', content: 'Content of first post', userId: users[0].id },
      { title: 'Second Post', content: 'Content of second post', userId: users[1].id },
      // Add more posts as needed
    ]);

    // Seed Comments
    await Comment.bulkCreate([
      { content: 'Comment 1 for post 1', userId: users[1].id, postId: posts[0].id },
      { content: 'Comment 2 for post 2', userId: users[0].id, postId: posts[1].id },
      // Add more comments as needed
    ]);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the database connection after seeding
    await sequelize.close();
  }
};

seedDatabase();
