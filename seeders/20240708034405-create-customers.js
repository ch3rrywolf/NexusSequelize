'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Customers", [
      {
        username: "user1",
        createdAt: new Date(),
        updateAt: new Date()
      },
      {
        username: "user2",
        createdAt: new Date(),
        updateAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete("Customers", null, {});
  }
};

// sequelize db:seed:all
// sequelize db:seed:undo