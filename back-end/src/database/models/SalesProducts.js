const { Model, DataTypes } = require('sequelize');

class SalesProducts extends Model {
  static init(sequelize) {
    super.init({ quantity: DataTypes.INTEGER }, {
      underscored: true,
      timestamps: false,
      modelName: 'SalesProducts',
      sequelize
    });
  }
}

module.exports = SalesProducts;