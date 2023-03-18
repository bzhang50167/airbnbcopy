'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'SpotImage'

module.exports = {
  async up (queryInterface, Sequelize) {

   await queryInterface.bulkInsert(options,[
    {
      spotId: 1,
      url: 'image url',
      preview: false
    }
   ])
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete(options)
  }
};
