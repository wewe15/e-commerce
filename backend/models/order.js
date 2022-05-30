'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    order_name: DataTypes.STRING,
    order_address: DataTypes.STRING,
    order_phone: DataTypes.STRING,
    order_city: DataTypes.STRING,
  }, {
    sequelize,
    underscored: true,
    modelName: 'Order',
  });
  return Order;
};