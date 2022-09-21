const { Model, DataTypes } = require('sequelize');
const Products = require('./Products');
const Sales = require('./Sales');

// class SalesProducts extends Model {
//   static init(sequelize) {
//     super.init({ quantity: DataTypes.INTEGER }, {
//       underscored: true,
//       timestamps: false,
//       modelName: 'SalesProducts',
//       sequelize
//     });
//   }
// }
class SalesProducts extends Model {}

SalesProducts.init(
  {
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
    },
  },
  {
    timestamps: false,
    underscored: true,
    modelName: "sales_products",
    tableName: "SalesProducts",
    sequelize,
  }
);

module.exports = SalesProducts;