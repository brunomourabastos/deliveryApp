const { Model, DataTypes } = require('sequelize');

// class Users extends Model {
//   static init(sequelize) {
//     super.init({
//       name: DataTypes.STRING,
//       email: DataTypes.STRING,
//       password: DataTypes.STRING,
//       role: DataTypes.STRING
//     }, {
//       underscored: true,
//       timestamps: false,
//       modelName: 'Users',
//       sequelize
//     });
//   }
// }

class Users extends Model {}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    underscored: true,
    modelName: "Users",
    sequelize,
  }
);

module.exports = Users;