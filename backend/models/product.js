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
    static associate({ Image, Category, Review }) {
      // define association here
      this.hasMany(Image, {foreignKey: 'product_id', as: 'images'})
      this.hasMany(Review, {foreignKey: 'product_id', as: 'reviews'})
      this.belongsTo(Category, {foreignKey: 'category_id', as: 'category'})
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      validate: {
        isDecimal: true
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
      validate: {
        isNumeric: true
      }
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
      validate: {
        min: 0,
        max: 5
      }
    },
    num_reviews: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
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