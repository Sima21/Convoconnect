//backend\models\index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user');
const Group = require('./group');
const Log = require('./Log')(sequelize, Sequelize.DataTypes);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = User;
db.Group = Group;
db.Log = Log;

// Define associations
User.hasMany(Group, { foreignKey: 'owner', as: 'groups' });
Group.belongsTo(User, { foreignKey: 'owner', as: 'user' });

module.exports = db;
