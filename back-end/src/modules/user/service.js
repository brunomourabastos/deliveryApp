const { UsersImplementation } = require('./implementation');
const { token } = require('../../../utils/token/Token');
const { CustomError } = require('../../../utils/CustomError');
const { hashGenerator } = require('../../../utils/hashGenerator');

class UsersService {
  constructor(userImplementation = new UsersImplementation()) {
      this.userImplementation = userImplementation;
  }

  async loginUser(userInfo) {
      const hashedUser = generateHash(userInfo);

      const foundUser = await this.userImplementation.loginUser(hashedUser);

      if (!foundUser) {
          throw new CustomError(404, 'User not found');
      }

      const { name, email, role, id } = foundUser;

      const userToken = token.generate(hashedUser);

      return {
          id,
          name,
          email,
          role,
          token: userToken,
      };
  }

  async registerCommonUser(userRegistrationInfo) {
      const hashedUser = generateHash(userRegistrationInfo);

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
      const hashedUser = generateHash(userRegistrationInfo);

      const createdUser = await this
        .userImplementation.registerAdminUser(hashedUser);

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