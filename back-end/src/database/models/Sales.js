const { Model, DataTypes } = require('sequelize');
const Users = require('./Users');
const { sequelize } = require('.');

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
  totalPrice: {
    type: DataTypes.DECIMAL(9, 2),
    defaultValue: 0
    },
  deliveryAddress: DataTypes.STRING(100),
  deliveryNumber: DataTypes.STRING(50),
  saleDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Pendente',
  } }, {
    underscored: true,
    timestamps: false,
    modelName: 'Sales',
    sequelize,
  });

Sales.belongsTo(Users, { foreignKey: "userId", as: "buyer" });
Users.hasMany(Sales, { foreignKey: "userId", as: "purchases" });

Sales.belongsTo(Users, { foreignKey: "sellerId", as: "seller" });
Users.hasMany(Sales, { foreignKey: "sellerId", as: "sales" });

module.exports = Sales;