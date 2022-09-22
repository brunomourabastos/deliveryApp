const { Model, DataTypes } = require('sequelize');
const Products = require('./Products');
const Sales = require('./Sales');
const { sequelize } = require('.');

class SalesProducts extends Model {}

SalesProducts.init({
  saleId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: Sales,
      key: "id",
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: Products,
      key: "id",
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  } }, {
    timestamps: false,
    underscored: true,
    modelName: "sales_products",
    tableName: "SalesProducts",
    sequelize,
  });

Products.belongsToMany(Sales, { through: SalesProducts, foreignKey: 'productId', as: "productsSales" });
Sales.belongsToMany(Products, { through: SalesProducts, foreignKey: 'saleId', as: "salesProducts" });

module.exports = SalesProducts;