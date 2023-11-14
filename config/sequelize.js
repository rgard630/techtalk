const { Sequelize } = require('sequelize');

// Load environment variables from .env file if using dotenv package
require('dotenv').config();

// Set up Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME || 'your_database_name',
  process.env.DB_USER || 'your_database_user',
  process.env.DB_PASSWORD || 'your_database_password',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql', // or any other supported dialect
    port: process.env.DB_PORT || 3306, // Default MySQL port
    logging: false, // Disable logging SQL queries to the console
  }
);

module.exports = sequelize;

