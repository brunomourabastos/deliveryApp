const { sequelize } = require(".");
const { Model, DataTypes } = require('sequelize');
// const db = require('./index');

// class Products extends Model {
//   static init(sequelize) {
//     super.init({
//       name: DataTypes.STRING,
//       price: DataTypes.DECIMAL(4, 2),
//       urlImage: DataTypes.STRING
//     }, {
//       underscored: true,
//       timestamps: false,
//       modelName: 'Products',
//       sequelize
//     });
//   }

//   static associate(db) {
//     this.belongsToMany(db.Sales, { foreignKey: 'product_id', through: 'sales_products', as: 'sales' });
//   }
// }

class Products extends Model {}

Products.init(
  {
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
    },
  },
  {
    timestamps: false,
    underscored: true,
    modelName: "Products",
    sequelize,
  }
);

module.exports = Products;