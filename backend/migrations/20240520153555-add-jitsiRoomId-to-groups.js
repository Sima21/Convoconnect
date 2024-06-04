'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add altering commands here.
    // Example: adding a new column to the 'Groups' table
    await queryInterface.addColumn('Groups', 'jitsiRoomId', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    // Add reverting commands here.
    // Example: removing the column from the 'Groups' table
    await queryInterface.removeColumn('Groups', 'jitsiRoomId');
  }
};
