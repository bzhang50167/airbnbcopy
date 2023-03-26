'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'ReviewImages'

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert(options,[
    {
      reviewId: 1,
      url: 'img url1'
    },
    {
      reviewId: 2,
      url: 'img url2'
    },
    {
      reviewId: 3,
      url: 'img url3'
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, null, {});
  }
};
