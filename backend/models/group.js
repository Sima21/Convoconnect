// backend/models/group.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Group = sequelize.define('Group', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    owner: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    meetLink: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sharedWith: {
        type: DataTypes.ARRAY(DataTypes.INTEGER), // Store shared user IDs as an array
        allowNull: true,
        defaultValue: []
    }
});

module.exports = Group;
