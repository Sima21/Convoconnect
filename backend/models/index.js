const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Group = require('./group');
const UserGroup = require('./userGroup');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = User;
db.Group = Group;
db.UserGroup = UserGroup;

// Define associations
User.hasMany(Group, { foreignKey: 'owner', as: 'groups' });
Group.belongsTo(User, { foreignKey: 'owner', as: 'ownerDetails' });

User.belongsToMany(Group, { through: UserGroup, foreignKey: 'userId', as: 'joinedGroups' });
Group.belongsToMany(User, { through: UserGroup, foreignKey: 'groupId', as: 'members' });

module.exports = db;
