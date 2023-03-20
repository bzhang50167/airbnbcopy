'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User,{
        foreignKey: 'ownerId'
      })
      Spot.belongsToMany(models.User,{
        through: models.Booking,
        foreignKey:'spotId',
        otherKey: 'userId'
      })
      Spot.belongsToMany(models.User,{
        through: models.Review,
        foreignKey:'spotId',
        otherKey: 'userId'
      })
      Spot.hasMany(models.Booking,{
        foreignKey: 'spotId'
      })
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
    },
    address: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING,
      validate:{
        isAlpha: true
      }
    },
    state: {
      type: DataTypes.STRING,
      validate:{
        isAlpha: true
      }
    },
    country: {
      type: DataTypes.STRING,
      validate:{
        isAlpha: true
      }
    },
    lat: {
      type: DataTypes.DECIMAL
    },
    lng: {
      type: DataTypes.DECIMAL
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.DECIMAL
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
