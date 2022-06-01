'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product}) {
      // define association here
      this.belongsTo(Product, {foreignKey: 'product_id', as: 'product'})
    }
  }
  Image.init({
    path: DataTypes.STRING,
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    underscored: true,
    modelName: 'Image',
  });
  return Image;
};