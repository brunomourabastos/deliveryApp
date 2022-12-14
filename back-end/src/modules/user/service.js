const { StatusCodes } = require('http-status-codes');
const { UsersImplementation } = require('./implementation');
const { token } = require('../../../utils/Token');
const { CustomError } = require('../../../utils/CustomError');
const { hashGenerator } = require('../../../utils/hashGenerator');

class UsersService {
  constructor(userImplementation = new UsersImplementation()) {
      this.userImplementation = userImplementation;
  }

  async loginUser(userInfo) {
      const hashedUser = hashGenerator(userInfo);

      const foundUser = await this.userImplementation.loginUser(hashedUser);

      if (!foundUser) {
          throw new CustomError(404, 'User not found');
      }

      const { name, email, role, id } = foundUser;

      const userToken = token.generate({ id, role });

      return {
          id,
          name,
          email,
          role,
          token: userToken,
      };
  }

  async registerCommonUser(userRegistrationInfo) {
      const hashedUser = hashGenerator(userRegistrationInfo);

      hashedUser.role = 'customer';

      const createdUser = await this
        .userImplementation.registerCommonUser(hashedUser);

      const commonUserToken = token.generate(hashedUser);

      return {
          id: createdUser.id,
          name: createdUser.name,
          email: createdUser.email,
          role: createdUser.role,
          token: commonUserToken,
      };
  }

  async registerAdminUser(userRegistrationInfo) {
      const hashedUser = hashGenerator(userRegistrationInfo);

      await this.userImplementation.findUserByEmail(userRegistrationInfo.email).then((user) => {
        if (user) throw new CustomError(StatusCodes.CONFLICT, 'User already exists');
      });

      const createdUser = await this.userImplementation.registerAdminUser(hashedUser);

      const adminUserToken = token.generate(hashedUser);

      return {
          id: createdUser.id,
          name: createdUser.name,
          email: createdUser.email,
          role: createdUser.role,
          token: adminUserToken,
      };
  }

  async getAllCommonUsers() {
      const allCommonUsers = await this.userImplementation.getAllCommonUsers();

      return allCommonUsers;
  }

  async getAllSellers() {
    return this.userImplementation.getAllRole('seller').then((sellers) => sellers);
  }

  async deleteUser(userId) {
      const foundUser = await this.userImplementation.findUserById(userId);

      if (!foundUser) {
          throw new CustomError(404, 'User not found');
      }

      await this.userImplementation.deleteUser(userId);
  }
}

module.exports = {
  UsersService,
};