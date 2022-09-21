const { Model, DataTypes } = require('sequelize');
const { Users } = require('./Users');
const { Products } = require('./Products');
const { SalesProducts } = require('./SalesProducts');

// class Sales extends Model {
//   static init(sequelize) {
//     super.init({
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       userId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: User,
//           key: "id",
//         },
//       },
//       sellerId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: User,
//           key: "id",
//         },
//       },
//       totalPrice: DataTypes.DECIMAL(9, 2),
//       deliveryAddress: DataTypes.STRING(100),
//       deliveryNumber: DataTypes.STRING(50),
//       saleDate: { type: DataTypes.STRING, defaultValue: DataTypes.NOW },
//       status: DataTypes.STRING
//     }, {
//       underscored: true,
//       timestamps: false,
//       modelName: 'Sales',
//       sequelize,
//     });
//   }

class Sales extends Model {}
  Sales.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Users,
          key: "id",
        },
      },
      sellerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Users,
          key: "id",
        },
      },
      totalPrice: DataTypes.DECIMAL(9, 2),
      deliveryAddress: DataTypes.STRING(100),
      deliveryNumber: DataTypes.STRING(50),
      saleDate: { type: DataTypes.STRING, defaultValue: DataTypes.NOW },
      status: DataTypes.STRING
    }, {
      underscored: true,
      timestamps: false,
      modelName: 'Sales',
      sequelize,
    });

  // static associate(db) {
  //   this.belongsTo(db.User, { foreignKey: userId, as: 'user' });
  //   this.belongsTo(db.User, { foreignKey: sellerId, as: 'seller' });
  //   this.belongsToMany(db.Products, { foreignKey: 'sale_id', through: 'sales_products', as: 'products' });
  // }
belongsTo(Users, { foreignKey: "userId", as: "buyers" });
Users.hasMany(Sales, { foreignKey: "userId", as: "purchases" });

Sales.belongsTo(Users, { foreignKey: "sellerId", as: "sellers" });
Users.hasMany(Sales, { foreignKey: "sellerId", as: "sales" });

Products.belongsToMany(Sales, { through: SalesProducts, foreignKey: 'productId', as: "productsSales" });
Sales.belongsToMany(Products, { through: SalesProducts, foreignKey: 'saleId', as: "salesProducts" });


module.exports = Sales;