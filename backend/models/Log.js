// backend/models/Log.js
module.exports = (sequelize, DataTypes) => {
    const Log = sequelize.define('Log', {
        level: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        eventType: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,  // Allow null temporarily
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,  // Allow null temporarily
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: true
    });

    return Log;
};
