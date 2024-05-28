// backend/utils/logger.js

const { Log } = require('../models'); // Import the Log model

const logEvent = async (level, message, userId = null, eventType = null) => {
    try {
        await Log.create({
            level,
            message,
            userId,
            eventType
        });
    } catch (error) {
        console.error("Failed to write log to database:", error);
    }
};

module.exports = {
    logEvent
};