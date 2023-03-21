'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'SpotImages'

module.exports = {
  async up (queryInterface, Sequelize) {

   await queryInterface.bulkInsert(options,[
    {
      spotId: 1,
      url: 'image url1',
      preview: true
    },
    {
      spotId: 2,
      url: 'image url2',
      preview: true
    },
    {
      spotId: 3,
      url: 'image url3',
      preview: true
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['image url1','image url2','image url3'] }
    }, {});
  }
};
