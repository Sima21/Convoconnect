// backend/models/user.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
<<<<<<< HEAD
        allowNull: true // Allow password to be null for OAuth users
=======
        allowNull: true // Allow password to be null
>>>>>>> ab7617cc7a846cd5bf26e7e2278ad7529c022dfe
    },
    googleId: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

<<<<<<< HEAD
module.exports = User;
=======
module.exports = User;
>>>>>>> ab7617cc7a846cd5bf26e7e2278ad7529c022dfe
