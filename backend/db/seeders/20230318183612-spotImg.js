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
      url: 'https://a0.muscache.com/im/pictures/7123986c-4f7d-4945-8e5c-eb6bbabb6456.jpg?im_w=960',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/7ef420b6-4c3e-463f-825f-3f59e252d369.jpg?im_w=960',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-51411041/original/d1f938ec-f517-4e5d-a84e-0cc51e48357a.jpeg?im_w=960',
      preview: true
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, null, {});
  }
};
