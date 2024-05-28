<<<<<<< HEAD
//backend\migrations\20240524204236-add-google-id-to-users.js
=======
>>>>>>> ab7617cc7a846cd5bf26e7e2278ad7529c022dfe
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};
