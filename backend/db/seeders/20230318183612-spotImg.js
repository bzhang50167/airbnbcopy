'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'SpotImages';

const generateSeedData = () => {
  const seedData = [];

  for (let i = 1; i <= 100; i++) {
    seedData.push({
      spotId: i,
      url: `https://generatorfun.com/code/uploads/Random-House-image-${i % 19 === 0 ? 1 : i % 19}.jpg`,
      preview: true
    });

    for (let j = 0; j < 4; j++) {
      seedData.push({
        spotId: i,
        url: `https://generatorfun.com/code/uploads/Random-House-image-${(i+5)%19 === 0 ? 1 : (i+5)%19}.jpg`,
        preview: false
      });
    }
  }

  return seedData;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, generateSeedData());
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, null, {});
  }
};
