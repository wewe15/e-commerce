'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    firstname: DataTypes.STRING,
    description: DataTypes.STRING,
    images: DataTypes.STRING,
    price: {
      type: DataTypes.DECIMAL,
      validate: {
        isDecimal: true
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories',
        key: 'id',
      }
    }
  }, {
    sequelize,
    underscored: true,
    modelName: 'Product',
  });
  return Product;
};