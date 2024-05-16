// backend/config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false, // disable SQL queries in logs
    dialectOptions: {
      connectTimeout: 60000 // Extend if i have a slow connection to your DB
    }
  }
);

module.exports = sequelize;
