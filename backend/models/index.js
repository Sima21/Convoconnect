//backend\models\index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database');
<<<<<<< HEAD

const User = require('./user');
const Group = require('./group');
const Log = require('./Log')(sequelize, Sequelize.DataTypes);
=======
const User = require('./user');
const Group = require('./group');
>>>>>>> ab7617cc7a846cd5bf26e7e2278ad7529c022dfe

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = User;
db.Group = Group;
<<<<<<< HEAD
db.Log = Log;
=======
>>>>>>> ab7617cc7a846cd5bf26e7e2278ad7529c022dfe

// Define associations
User.hasMany(Group, { foreignKey: 'owner', as: 'groups' });
Group.belongsTo(User, { foreignKey: 'owner', as: 'user' });

module.exports = db;
