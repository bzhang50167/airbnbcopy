'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Bookings'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options,[
      {
        spotId: 1,
        userId: 1,
        startDate: new Date('2022-06-12'),
        endDate: new Date('2022-08-12')
      },
      {
        spotId: 1,
        userId: 1,
        startDate: new Date('2022-06-22'),
        endDate: new Date('2022-08-12')
      },
      {
        spotId: 1,
        userId: 1,
        startDate: new Date('2022-06-16'),
        endDate: new Date('2022-08-12')
      },

    ])
  },

  async down (queryInterface, Sequelize) {

    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, null, {});
  }
};
