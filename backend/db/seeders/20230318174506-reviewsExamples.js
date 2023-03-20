'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Reviews'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options,[
      {
        userId: 1,
        spotId: 1,
        review: 'This was an awesome spot!',
        stars: 5,
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options)
  }
};
