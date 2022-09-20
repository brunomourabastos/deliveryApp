const { Model, DataTypes } = require('sequelize');

class Users extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING
    }, {
      underscored: true,
      timestamps: false,
      modelName: 'Users',
      sequelize
    });
  }
}

module.exports = Users;