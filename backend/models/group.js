// backend/models/group.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Group = sequelize.define('Group', {
<<<<<<< HEAD
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
    }
=======
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  owner: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  jitsiRoomId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
>>>>>>> ab7617cc7a846cd5bf26e7e2278ad7529c022dfe
});

module.exports = Group;