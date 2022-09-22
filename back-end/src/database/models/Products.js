const { sequelize } = require('.');
const { Model, DataTypes } = require('sequelize');

class Products extends Model {}

Products.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: false,
  },
  urlImage: {
    type: DataTypes.STRING(200),
    allowNull: false,
  } }, {
    timestamps: false,
    underscored: true,
    modelName: "Products",
    sequelize,
  });

module.exports = Products;