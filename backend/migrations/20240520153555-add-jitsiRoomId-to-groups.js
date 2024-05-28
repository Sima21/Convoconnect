//backend\migrations\20240520153555-add-jitsiRoomId-to-groups.js
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
