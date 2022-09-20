const { Model, DataTypes } = require('sequelize');
const db = require('./index');

class Products extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL(4, 2),
      urlImage: DataTypes.STRING
    }, {
      underscored: true,
      timestamps: false,
      modelName: 'Products',
      sequelize
    });
  }

  static associate(db) {
    this.belongsToMany(db.Sales, { foreignKey: 'product_id', through: 'sales_products', as: 'sales' });
  }
}

module.exports = Products;