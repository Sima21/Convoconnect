// backend/models/userGroup.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Group = require('./group');

const UserGroup = sequelize.define('UserGroup', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        }
    },
    groupId: {
        type: DataTypes.INTEGER,
        references: {
            model: Group,
            key: 'id',
        }
    }
}, {
    timestamps: false,
});

User.belongsToMany(Group, { through: UserGroup, foreignKey: 'userId', as: 'userGroups' });
Group.belongsToMany(User, { through: UserGroup, foreignKey: 'groupId', as: 'groupUsers' });

module.exports = UserGroup;
