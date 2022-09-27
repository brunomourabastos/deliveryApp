const { Op } = require('sequelize');
const Users = require('../../database/models/Users');
const { CustomError } = require('../../../utils/CustomError');

class UsersImplementation {
  constructor(sequelizeUserModel = Users) {
      this.sequelizeUserModel = sequelizeUserModel;
  }

  async loginUser(userInfo) {
      const { email, password } = userInfo;

      const findUser = await this.sequelizeUserModel.findOne({ where: { email, password } });

      return findUser;
  }

  async registerCommonUser(userRegistrationInfo) {
      const alreadyExists = await this.sequelizeUserModel.findOne({
          where: {
              [Op.or]: [
                  { email: userRegistrationInfo.email },
                  { name: userRegistrationInfo.name },
              ],
          } });

      if (alreadyExists) throw new CustomError(409, 'User already exists');

      const createdUser = await this.sequelizeUserModel.create(userRegistrationInfo);

      return createdUser;
  }

  async registerAdminUser(userRegistrationInfo) {
      const createdAdminUser = await this.sequelizeUserModel.create(userRegistrationInfo);
      return createdAdminUser;
  }

  async getAllCommonUsers() {
      const usersList = await this.sequelizeUserModel.findAll();

      return usersList;
  }

  async deleteUser(userId) {
      await this.sequelizeUserModel.destroy({ where: { id: userId } });
  }

  async findUserById(userId) {
      const foundUser = await this.sequelizeUserModel.findByPk(userId);

      return foundUser;
  }

  async findUserByEmail(email) {
    return this.sequelizeUserModel.findOne({ where: { email } }).then((user) => user);
  }
}

module.exports = {
  UsersImplementation,
};