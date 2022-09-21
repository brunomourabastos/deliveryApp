const { Model, DataTypes } = require('sequelize');

class Sales extends Model {
  static init(sequelize) {
    super.init({
      totalPrice: DataTypes.DECIMAL(9, 2),
      deliveryAddress: DataTypes.STRING,
      deliveryNumber: DataTypes.STRING,
      status: DataTypes.STRING
    }, {
      underscored: true,
      timestamps: true,
      modelName: 'Sales',
      sequelize,
    });
  }

  static associate(db) {
    this.belongsTo(db.User, { foreignKey: userId, as: 'user' });
    this.belongsTo(db.User, { foreignKey: sellerId, as: 'seller' });
    this.belongsToMany(db.Products, { foreignKey: 'sale_id', through: 'sales_products', as: 'products' });
  }
}

module.exports = Sales;