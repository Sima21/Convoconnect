'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable('Groups');
    if (!tableInfo.jitsiRoomId) {
      await queryInterface.addColumn('Groups', 'jitsiRoomId', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable('Groups');
    if (tableInfo.jitsiRoomId) {
      await queryInterface.removeColumn('Groups', 'jitsiRoomId');
    }
  },
};
