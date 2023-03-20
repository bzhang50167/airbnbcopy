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
        review: 'Great view',
        stars: 5,
      },
      {
        userId: 1,
        spotId: 1,
        review: '10/10 GREAT',
        stars: 5,
      },
      {
        userId: 1,
        spotId: 1,
        review: 'Good food',
        stars: 5,
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options, {
      review: { [Op.in]: ['Good food','10/10 GREAT','Great view'] }
    }, {});
  }
};
