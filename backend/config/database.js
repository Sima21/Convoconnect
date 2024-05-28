<<<<<<< HEAD
//backend\config\database.js
=======
>>>>>>> ab7617cc7a846cd5bf26e7e2278ad7529c022dfe
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
    logging: false,
    dialectOptions: {
      connectTimeout: 60000,
    },
  }
);

module.exports = sequelize;
