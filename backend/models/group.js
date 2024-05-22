const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Group = sequelize.define('Group', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  owner: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  jitsiRoomId: { // New field for storing Jitsi room ID
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  // additional options
});

module.exports = Group;
